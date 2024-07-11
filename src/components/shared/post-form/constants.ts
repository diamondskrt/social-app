import { z } from 'zod';

const fileMaxSize = 1024 * 1024 * 2; // 2MB
const fileTypes = ['image/png', 'image/jpg', 'image/jpeg'];

export const formSchema = z.object({
  files: z
    .instanceof(FileList, { message: 'File is required' })
    .refine((files) => {
      return Array.from(files).some((file: File) => file.size <= fileMaxSize);
    }, 'Maximum file size is 2Mb')
    .refine(
      (files) => {
        return Array.from(files).some((file: File) =>
          fileTypes.includes(file.type)
        );
      },
      `Allowed types: ${fileTypes.join(', ')}`
    ),
  caption: z
    .string()
    .min(1, 'Caption is required')
    .max(2200, { message: 'Maximum 1000 characters.' }),
  location: z.string().optional(),
  tags: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
    })
  ),
});
