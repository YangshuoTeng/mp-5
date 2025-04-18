import getCollection, {URI_COLLECTION} from "@/db";
import {PostProps} from "@/types";

export default async function getUrl():Promise<PostProps[]> {
  const urlCollection = await getCollection(URI_COLLECTION);
  const data = await urlCollection.find().toArray();

  const posts: PostProps[] = data.map((p)=>({
    id: p._id.toHexString(),
    inputUrl:p.inputUrl,
    outputUrl:p.outputUrl,
  }));
  return posts.reverse();
}