import { Route, Routes } from "react-router-dom";

//public pages
import Home from "../../modules/marketing/pages/HomePage";
import { ContactPage } from "@/modules/marketing/contact";
import PricingPage from "@/modules/pricing/pages/PricingPage";
import { AboutPage } from "@/modules/marketing/about";
import BlogPage from "@/modules/blog/pages/BlogPage";
import BlogPostPage from "@/modules/blog/pages/BlogPostPage";
//healing paths
import HealingPathPage from "@/modules/healing-paths/pages/HealingPathPage";
//layouts
import MainLayout from "../layouts/MainLayout";
import SecondaryLayout from "../layouts/SecondaryLayout";
//Legal Page Route
import LegalDynamicPage from "@/modules/legal/pages/LegalDynamicPage";
//Auth pages
import AuthLayout from "@/modules/auth/layouts/AuthLayout";
import { AuthRoutes } from "@/modules/auth/routes/auth.routes";
//Dashboard Routes
import { AdminRoutes } from "./AdminRoutes";
import { EditorRoutes } from "./EditorRoutes";
import { UserRoutes } from "./UserRoutes";

function AppRoutes() {
  return (
    <Routes>
      {/*Public Routes */}
      {/*Home with Special Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      {/*Public Routes */}
      {/*Other pages with Navbar */}
      <Route element={<SecondaryLayout />}>
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:categorySlug/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/plan-and-pricing" element={<PricingPage />} />
        {/*Healing Paths */}
        <Route path="/healing-path/:slug" element={<HealingPathPage />} />
        {/*Legal Page Route */}
        <Route path="/legal/:slug" element={<LegalDynamicPage />} />
      </Route>
      {/*Auth Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        {AuthRoutes()}
      </Route>
      {/*Dashoard Routes */}
      {AdminRoutes()}
      {EditorRoutes()}
      {UserRoutes()}
    </Routes>
  );
}

export default AppRoutes;
