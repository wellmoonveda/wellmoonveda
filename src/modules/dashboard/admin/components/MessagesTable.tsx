import React, { useState } from "react";
import type { ContactMessage } from "@/services/supabase/contact.service";

interface Props {
  messages: ContactMessage[];
  loading: boolean;
}

const MessagesTable = ({ messages, loading }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleMessage = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <div className="card p-6">
        <p className="text-muted">Loading messages...</p>
      </div>
    );
  }

  if (!messages.length) {
    return (
      <div className="card p-6 text-center text-muted">
        No messages received yet.
      </div>
    );
  }

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-card-header text-white">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Subject</th>
            <th className="p-4">Message</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((msg) => {
            const isExpanded = expandedId === msg.id;

            return (
              <React.Fragment key={msg.id}>
                <tr
                  key={msg.id}
                  className="border-b border-main hover-soft cursor-pointer"
                  onClick={() => toggleMessage(msg.id)}
                >
                  <td className="p-4 text-main">{msg.name}</td>

                  <td className="p-4 text-sub">{msg.email}</td>

                  <td className="p-4 text-sub">{msg.subject || "—"}</td>

                  <td className="p-4 text-sub">
                    {msg.message.slice(0, 60)}
                    {msg.message.length > 60 && "..."}
                  </td>

                  <td className="p-4 text-muted">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </td>
                </tr>

                {isExpanded && (
                  <tr className="bg-soft">
                    <td colSpan={5} className="p-6 text-sub leading-relaxed">
                      {msg.message}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MessagesTable;
