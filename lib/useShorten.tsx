import { useState, useEffect } from "react";
import insertUrl from "@/lib/insertUrl";

export function useShorten() {
    const [longUrl, setLongUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentDomain, setCurrentDomain] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        setCurrentDomain(window.location.origin);
    }, []);

    async function handleSubmitUrl() {
        setIsLoading(true);
        setErrorMessage("");
        setIsCopied(false);
        try {
            const result = await insertUrl({ url: longUrl, alias: customAlias });

            if (result) {
                setErrorMessage(result);
                return;
            }

            setShortenedUrl(`${currentDomain}/${customAlias}`);
        } catch (e) {
            console.error(e);
            setErrorMessage("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    function handleCopyToClipboard() {
        if (shortenedUrl) {
            navigator.clipboard.writeText(shortenedUrl);
            setIsCopied(true);
        }
    }

    return {
        longUrl, setLongUrl,
        customAlias, setCustomAlias,
        errorMessage,
        shortenedUrl,
        isLoading,
        isCopied,
        handleSubmitUrl,
        handleCopyToClipboard,
        currentDomain
    };
}
