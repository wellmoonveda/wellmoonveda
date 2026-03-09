import React, { useState } from "react";

interface Props {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postId: string, reason: string) => void;
}

const DeletionRequestModal: React.FC<Props> = ({
  postId,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!reason.trim()) return;

    onSubmit(postId, reason);
    setReason("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="card w-[420px] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-main">
          Request Post Deletion
        </h2>

        <textarea
          className="w-full border-main p-2 rounded"
          placeholder="Reason for deletion..."
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="btn-secondary px-3 py-1 rounded text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="btn-prime px-3 py-1 rounded"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletionRequestModal;
