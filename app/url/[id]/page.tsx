import { redirect } from 'next/navigation';
import getUrlById from '@/lib/getUrlById';

export default async function RedirectPage({
                                             params,
                                           }: {
  params: { id: string };
}) {
  const post = await getUrlById(params.id);

  if (!post || !post.outputUrl) {
    throw new Error('URL not found');
  }

  redirect(post.inputUrl);
}
