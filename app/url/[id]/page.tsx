import { redirect } from 'next/navigation';
import getUrlById from '@/lib/getUrlById';

interface RedirectPageProps {
  params: { id: string };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const post = await getUrlById(params.id);

  if (!post || !post.outputUrl) {
    throw new Error('URL not found');
  }

  redirect(post.inputUrl);
}

