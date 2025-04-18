import getCollection, { URI_COLLECTION } from "@/db";
import { PostProps } from "@/types";

export default async function getPostById(
    id: string,
): Promise<PostProps | null> {
  const postsCollection = await getCollection(URI_COLLECTION);
  const data = await postsCollection.findOne({ outputUrl: id });

  if (data === null) {
    return null;
  }

  const post = {
    id: data._id.toHexString(),
    inputUrl: data.inputUrl,
    outputUrl: data.outputUrl,
  };

  return post;
}
