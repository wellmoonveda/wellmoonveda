import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // 1. Handle CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }

  try {
    // Initialize Supabase with Service Role (to allow admin actions like creating users)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 2. Extract and Validate Token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No auth header" }), { status: 401, headers: corsHeaders });
    }

    const token = authHeader.replace("Bearer ", "");
    
    // Use the admin client to verify the user's token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid user session" }), { status: 401, headers: corsHeaders });
    }

    // 3. Check if the logged-in user is an ADMIN
    const { data: roleData } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (roleData?.role !== "admin") {
      return new Response(JSON.stringify({ error: "Unauthorized: Admin access required" }), { status: 403, headers: corsHeaders });
    }

    // 4. Parse Request Body
    const { name, email, tempPassword } = await req.json();

    if (!email || !tempPassword) {
      return new Response(JSON.stringify({ error: "Email and password required" }), { status: 400, headers: corsHeaders });
    }

    // 5. Create Auth User (Using admin powers)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
    });

    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), { status: 400, headers: corsHeaders });
    }

    const newUserId = authData.user.id;

    // 6. Insert into public.users table
    const { error: userInsertError } = await supabaseAdmin
  .from("users")
  .upsert({
    id: newUserId,
    name: name || "",
    email,
    is_active: true,
    password_set: false,
  }, { onConflict: 'id' });

    if (userInsertError) {
      console.error("Database Insert Error:", userInsertError);
      return new Response(JSON.stringify({ error: userInsertError.message }), { status: 400, headers: corsHeaders });
    }

    // 7. Assign Editor Role to the new user
    const { error: roleError } = await supabaseAdmin.from("user_roles").upsert({
      user_id: newUserId,
      role: "editor",
    }, { onConflict: 'user_id' });

    if (roleError) {
      return new Response(JSON.stringify({ error: roleError.message }), { status: 400, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ success: true, userId: newUserId }), {
      status: 200,
      headers: corsHeaders,
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});