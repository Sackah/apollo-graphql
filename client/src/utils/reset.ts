export const resetForm = <T extends object>(
  form: T,
  callback: (updater: React.SetStateAction<T>) => void
) => {
  for (const field of Object.keys(form)) {
    callback((prev) => ({
      ...prev,
      [field]: "",
    }));
  }
};
