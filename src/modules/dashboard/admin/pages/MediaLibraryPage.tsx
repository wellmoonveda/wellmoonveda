import MediaGrid from "../components/MediaGrid";
import { useMediaLibrary } from "../hooks/useMediaLibrary";
import MediaUploadDropzone from "../../media/components/MediaUploadDropzone";
import { useAuthUser } from "@/modules/auth/hooks/useAuthUser";

const MediaLibraryPage = () => {
  const { media, loading, upload, remove } = useMediaLibrary();

  const handleUpload = async (file: File) => {
    const { user } = useAuthUser();
    const userId = user?.id;

    await upload(file, file.name, "general", userId);

    if (!user?.is_admin) return null;
  };

  return (
    <div className="dashboard-theme p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Media Library</h1>

      {/* Drag & Drop Upload */}

      <MediaUploadDropzone onUpload={handleUpload} />

      {/* Media Grid */}

      <MediaGrid media={media} loading={loading} onDelete={remove} />
    </div>
  );
};

export default MediaLibraryPage;
