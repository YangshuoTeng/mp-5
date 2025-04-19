"use client";
import HomeContent from "@/components/HomeContent";
import { Box, Container, Typography } from "@mui/material";

export default function Home() {
    return (
        <main>
            <Container>
                <Box textAlign="center" mt={8} mb={4}>
                    <Typography variant="h3">
                        URL Shortener
                    </Typography>
                    <Typography variant="subtitle1" color="grey">
                        Shorten your long URLs into compact, shareable links
                    </Typography>
                </Box>
                <HomeContent />
            </Container>
        </main>
    );
}
