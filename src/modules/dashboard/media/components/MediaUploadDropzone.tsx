import { useState } from "react";
import { useMediaUpload } from "../hooks/useMediaUpload";

const MediaUploadDropzone = ({ onUpload }: any) => {
  const { upload, uploading } = useMediaUpload();
  const [dragging, setDragging] = useState(false);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();

    setDragging(false);

    const file = e.dataTransfer.files[0];

    if (!file) return;

    if (onUpload) await onUpload(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-10 text-center
${dragging ? "bg-soft border-primary" : "border-main"}`}
    >
      {uploading ? "Uploading..." : "Drag & Drop image here to upload"}
    </div>
  );
};

export default MediaUploadDropzone;
