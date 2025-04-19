import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";

export default function ShortenedResult({
                                            shortenedUrl,
                                            isCopied,
                                            handleCopyToClipboard
                                        }: {
    shortenedUrl: string;
    isCopied: boolean;
    handleCopyToClipboard: () => void;
}) {
    if (!shortenedUrl) return null;

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Box p={2} border={1} borderRadius={2} borderColor="grey.300">
                <Typography variant="h6" gutterBottom>
                    Your shortened URL:
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                    <Link
                        href={shortenedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body1"
                    >
                        {shortenedUrl}
                    </Link>

                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={handleCopyToClipboard}
                    >
                        {isCopied ? "✓" : "Copy"}
                    </Button>
                </Box>
            </Box>
        </div>
    );
}
