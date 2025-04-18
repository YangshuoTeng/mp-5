import createNewUrl from "@/lib/createNewUrl";
import { PostProps } from "@/types";
import { Textarea } from "@mui/joy";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function NewPostForm({
                                        append,
                                    }: {
    append: (newPost: PostProps) => void;
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);

    return (
        <form
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh',
                width: '100%',
                textAlign: 'left',
                flexDirection: 'column',
                padding: '1rem',
            }}
            onSubmit={(e) => {
                e.preventDefault();
                setError(null);
                createNewUrl(title, content)
                    .then((p) => append(p))
                    .catch((err) => {
                        console.error(err);
                        setError(err.message);
                    });
            }}
        >
            <div style={{
                backgroundColor: 'white',
                border: '3px solid lightgrey',
                borderRadius: '10px',
                maxWidth: '600px',
                padding: '16px',
                margin: '0 auto',
            }}>
                <h3>Shorten a URL</h3>
                <p>Enter a long URL to create a shorter, shareable link</p>
                <p>URL</p>

                <TextField
                    variant="filled"
                    sx={{ width:"90%" }}
                    label="https://example.com/very/long/url"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <p>custom Alias</p>
                <div style={{ display: 'flex', flexDirection: 'row', width: '70%'}}>
                    <p>https://cs391-url-shortener.vercel.app/</p>
                    <Textarea
                        sx={{
                            width:"30%"
                        }}
                        variant="soft"
                        placeholder="your-custom-alias"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>


                <div >
                    <Button type="submit" variant="contained" sx={{ width: "80px" }}>
                        Shorten
                    </Button>
                </div>

                <p style={{ color: "red", marginTop: "1rem" }}> {error}</p>

            </div>
        </form>

    );
}