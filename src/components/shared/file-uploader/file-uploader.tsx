import { forwardRef, useState } from 'react';

import { UploadCloudIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface uploadFile {
  name: string;
  url: string;
}

interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  onChange?: (files: FileList) => void;
}

export const FileUploader = forwardRef<HTMLInputElement, FileUploaderProps>(
  function FileUploader({ accept, multiple, disabled, onChange }, ref) {
    const [uploadFiles, setUploadFiles] = useState<uploadFile[]>([]);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const uploadFiles = event.target.files;
      if (!uploadFiles) return;

      onChange?.(uploadFiles);

      const files = Array.from(uploadFiles).map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));

      setUploadFiles(files);
    };

    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor="dropzone-file" className="file-uploader">
          {uploadFiles.length === 1 ? (
            <div className="grid gap-2 w-full p-4">
              <img
                key={uploadFiles[0].url}
                src={uploadFiles[0].url}
                alt={uploadFiles[0].name}
                className="w-full h-48 rounded-lg object-cover"
              />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Click or drag photo to replace
              </p>
            </div>
          ) : (
            <div className="flex-center flex-col pt-5 pb-6">
              <UploadCloudIcon
                width={30}
                height={30}
                className="text-gray-500 dark:text-gray-400"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              {accept && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {accept}
                </p>
              )}
            </div>
          )}
          <Input
            ref={ref}
            id="dropzone-file"
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            className="hidden"
            onChange={(event) => onFileChange(event)}
          />
        </Label>
        {uploadFiles.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {uploadFiles.map((file) => (
              <img
                key={file.url}
                src={file.url}
                alt={file.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
