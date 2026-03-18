import MediaGrid from "../components/MediaGrid";
import { useMediaLibrary } from "../hooks/useMediaLibrary";
import MediaUploadDropzone from "../../media/components/MediaUploadDropzone";
import { useAuth } from "@/modules/auth";

const MediaLibraryPage = () => {
  const { media, loading, upload, remove, uploading, uploadFileName } =
    useMediaLibrary();

  const { user } = useAuth() ?? {};

  const handleUpload = async (file: File) => {
    if (!user) return;

    await upload(file, file.name, "general", user.id);
  };

  return (
    <div className="dashboard-theme p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Media Library</h1>

      {/* Drag & Drop Upload */}

      <MediaUploadDropzone
        onUpload={handleUpload}
        uploading={uploading}
        fileName={uploadFileName}
      />

      {/* Media Grid */}

      <MediaGrid media={media} loading={loading} onDelete={remove} />
    </div>
  );
};

export default MediaLibraryPage;
