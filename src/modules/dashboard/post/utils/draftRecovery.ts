const STORAGE_KEY = "veda-draft-backup";

export const saveDraftBackup = (data: any) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Draft backup failed", err);
  }
};

export const loadDraftBackup = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const clearDraftBackup = () => {
  localStorage.removeItem(STORAGE_KEY);
};
