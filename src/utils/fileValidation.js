export const MAX_FILE_MB = 15; // keep in sync with Apps Script

export function isFileTooLarge(file) {
  if (!file) return false;
  return file.size > MAX_FILE_MB * 1024 * 1024;
}