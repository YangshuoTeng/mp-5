"use client";
import { useShorten } from "@/lib/useShorten";
import ShortenForm from "@/components/ShortenForm";
import ShortenedResult from "@/components/ShortendResult";

export default function HomeContent() {
    const shorten = useShorten();

    return (
        <div>

            <ShortenForm
                longUrl={shorten.longUrl}
                customAlias={shorten.customAlias}
                setLongUrl={shorten.setLongUrl}
                setCustomAlias={shorten.setCustomAlias}
                isLoading={shorten.isLoading}
                errorMessage={shorten.errorMessage}
                handleSubmitUrl={shorten.handleSubmitUrl}
                currentDomain={shorten.currentDomain}
            />

            <ShortenedResult
                shortenedUrl={shorten.shortenedUrl}
                isCopied={shorten.isCopied}
                handleCopyToClipboard={shorten.handleCopyToClipboard}
            />
        </div>
    );
}
