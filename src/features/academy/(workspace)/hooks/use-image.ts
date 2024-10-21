import type { ChangeEvent } from 'react';
import { useState } from 'react';

export const useImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  return {
    file,
    filePreview,
    handleChangeFile,
  };
};
