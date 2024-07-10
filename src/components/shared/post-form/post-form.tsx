import { useState } from 'react';

import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Models } from 'appwrite';
import { CircleX as CircleXIcon } from 'lucide-react';
import type { ControllerRenderProps } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import type { z } from 'zod';

import { FileUploader } from '@/components/shared/file-uploader';
import { SortableItem } from '@/components/shared/sortable-item';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreatePost, useUpdatePost } from '@/lib/tanstackquery/queries';
import { cn } from '@/lib/utils';
import { PostFormAction } from '@/models';
import { useUserStore } from '@/store';

import { formSchema } from './constants';

interface PostFormProps extends React.HTMLAttributes<HTMLElement> {
  post?: Models.Document;
  action: PostFormAction;
}

export function PostForm({ post, action, ...props }: PostFormProps) {
  const { className } = props;

  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.user);
  const [inputValue, setInputValue] = useState<string>('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof formSchema>, 'tags'>
  ) => {
    if (event.key !== 'Enter' || !field.value) return;
    field.onChange([...field.value, { id: uuidv4(), value: inputValue }]);
    setInputValue('');
    event.preventDefault();
  };

  const onTagDragEnd = (
    event: DragEndEvent,
    field: ControllerRenderProps<z.infer<typeof formSchema>, 'tags'>
  ) => {
    const { active, over } = event;

    if (!over?.id) return;

    if (active.id !== over.id) {
      const oldIndex = field.value.findIndex(({ id }) => id === active.id);
      const newIndex = field.value.findIndex(({ id }) => id === over.id);

      field.onChange(arrayMove(field.value, oldIndex, newIndex));
    }
  };

  const onRemoveTag = (
    field: ControllerRenderProps<z.infer<typeof formSchema>, 'tags'>,
    tagId: string
  ) => field.onChange(field.value.filter(({ id }) => id !== tagId));

  const defaultValues = {
    files: undefined,
    caption: post?.caption || '',
    location: post?.location || '',
    tags: post?.tags || [],
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { mutateAsync: createPost, isPending: isCreatePostPending } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdatePostPending } =
    useUpdatePost();

  const onSubmit = async (postData: z.infer<typeof formSchema>) => {
    try {
      if (!currentUser) return;

      if (action === PostFormAction.CREATE) {
        await createPost({
          ...postData,
          userId: currentUser.$id,
        });

        toast.success('Post has been created.');
      } else {
        if (!post) return;

        await updatePost({
          ...postData,
          postId: post.$id,
          imageId: post.imageId,
          imageUrl: post.imageUrl,
        });

        toast.success('Post has been update.');
      }

      navigate('/');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const isPending = isCreatePostPending || isUpdatePostPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
        className={cn(className, 'w-full md:w-1/3')}
      >
        <div className="space-y-2 mb-4">
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <FileUploader
                    accept=".png, .jpg, .jpeg"
                    disabled={isPending}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caption</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    placeholder="caption"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="location"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>
                    Add Tags (enter a value and press "Enter")
                  </FormLabel>
                  <FormControl>
                    <Input
                      value={inputValue}
                      disabled={isPending}
                      placeholder="tags"
                      onChange={(event) => setInputValue(event.target.value)}
                      onKeyDown={(event) => onInputKeyDown(event, field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => onTagDragEnd(event, field)}
                >
                  <SortableContext items={field.value}>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((tag) => (
                        <div key={tag.id} className="flex items-center gap-1">
                          <SortableItem id={tag.id}>
                            <Badge
                              key={tag.id}
                              variant="secondary"
                              className="flex gap-2 py-1.5 px-4"
                            >
                              <p className="mb-[1px]">{tag.value}</p>
                            </Badge>
                          </SortableItem>
                          <CircleXIcon
                            size={18}
                            className="cursor-pointer text-destructive"
                            onClick={() => onRemoveTag(field, tag.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </>
            )}
          />
        </div>

        <Button disabled={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
