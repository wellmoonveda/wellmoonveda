import { useState } from "react";
import Button from "@/components/ui/Button";
import { submitContactMessage } from "@/services/supabase/contact.service";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await submitContactMessage({
        name,
        email,
        subject,
        message,
      });

      setSuccess(true);

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Send a Message</h2>

      {success && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg">
          Message sent successfully!
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-600 rounded-lg">{error}</div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-lg border px-4 py-3"
        />

        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border px-4 py-3"
        />

        <input
          type="text"
          placeholder="Subject (optional)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-lg border px-4 py-3"
        />

        <textarea
          placeholder="Your message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full rounded-lg border px-4 py-3"
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
