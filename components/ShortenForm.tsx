import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

export default function ShortenForm({
                                        longUrl, customAlias, setLongUrl, setCustomAlias,
                                        isLoading, errorMessage, handleSubmitUrl, currentDomain
                                    }: {
    longUrl: string;
    customAlias: string;
    setLongUrl: (value: string) => void;
    setCustomAlias: (value: string) => void;
    isLoading: boolean;
    errorMessage: string;
    handleSubmitUrl: () => void;
    currentDomain: string;
}) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmitUrl();
            }}
            noValidate
            style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
        >
            <Box mb={2}>
                <Typography variant="h6">URL</Typography>
                <TextField
                    variant="filled"
                    sx={{ width:"100%" }}
                    label="https://example.com/very/long/url"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                />
            </Box>

            <Box mb={2}>
                <Typography variant="h6" gutterBottom>Custom Alias</Typography>
                <Box display="flex" alignItems="center">
                    <Typography variant="body1" mr={1}>{currentDomain}/</Typography>
                    <TextField
                        sx={{
                            width:"100%"
                        }}
                        variant="filled"
                        label="your-custom-alias"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                    />
                </Box>
            </Box>

            <Box mb={2}>
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    size="large"
                >
                    {isLoading ? "Shortening..." : "Shorten"}
                </Button>
            </Box>

            {errorMessage && (
                <Box mt={2} textAlign="center">
                    <Typography color="red">{errorMessage}</Typography>
                </Box>
            )}
        </form>
    );
}
