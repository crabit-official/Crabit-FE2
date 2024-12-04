import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

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

  const handleImageUpload = async (imageUrl: string, file: File) => {
    try {
      const res = await fetch(imageUrl, {
        method: 'PUT',
        body: file,
      });

      if (!res.ok) {
        toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        return false;
      }

      return true;
    } catch {
      toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      return false;
    }
  };

  return {
    file,
    filePreview,
    handleChangeFile,
    setFile,
    setFilePreview,
    handleImageUpload,
  };
};
