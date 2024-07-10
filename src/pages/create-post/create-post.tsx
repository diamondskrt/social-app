import { PostForm } from '@/components/shared/post-form';
import { PostFormAction } from '@/models';

export function CreatePostPage() {
  return (
    <div className="w-full">
      <h3 className="font-semibold">Create Post</h3>

      <PostForm className="mt-6" action={PostFormAction.CREATE} />
    </div>
  );
}
