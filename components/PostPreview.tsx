import { PostProps } from "@/types";

export default function PostPreview({ post }: { post: PostProps }) {
    const shortUrl = post.inputUrl;
    return (
        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {post.outputUrl}
        </a>
    );
}
