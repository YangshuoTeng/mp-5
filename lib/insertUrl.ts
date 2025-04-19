"use server";
import getCollection, { ENTRIES_COLLECTION } from "@/db";
import getUrl from "./getUrl";
import { EntryProps } from "@/types";


//helper functions
function isEntryValid(url: string, alias: string): boolean {
    return !!url && !!alias;
}


function isCycle(url: string): boolean {
    return url.startsWith("https://cs391-url-shortener.vercel.app") || url.startsWith("http://localhost:3000");
}

function isValidAlias(alias: string): boolean {
    return encodeURIComponent(alias) === alias;
}

function isValidUrlFormat(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

async function verifyUrl(inputUrl: string): Promise<void> {
    if (!isValidUrlFormat(inputUrl)) {
        throw new Error("Invalid URL format");
    }

    let reachable = false;

    try {
        const response = await fetch(inputUrl);

        if (response.ok) {
            reachable = true;
        } else if (response.status >= 300 && response.status < 400) {
            reachable = true;
        } else if (response.status >= 400 && response.status !== 404) {
            reachable = true;
        } else {
            console.error(`Request failed for: ${inputUrl}`);
        }
    } catch (error) {
        console.error(`Fetch failed for ${inputUrl}. Reason:`, error);
        throw new Error("Invalid URL or URL cannot be reached");
    }

    if (!reachable) {
        throw new Error("URL cannot be reached");
    }
}

//insertUrl function start

export default async function insertUrl(entry: EntryProps): Promise<string> {
    const { url, alias } = entry;

    if (!isEntryValid(url, alias)) {
        return "URL or alias is missing";
    }

    if (isCycle(url)) {
        return "Invalid URL: Cycles are not allowed";
    }

    if (!isValidAlias(alias)) {
        return "Invalid alias: You may only use valid URL characters";
    }

    try {
        await verifyUrl(url);
    } catch (error: any) {
        return error.message || "Invalid URL";
    }

    const aliasExists = await getUrl(alias);
    if (aliasExists) {
        return "Invalid alias: This alias already exists";
    }

    const entriesCollection = await getCollection(ENTRIES_COLLECTION);
    const res = await entriesCollection.insertOne({ alias, url });

    if (res.acknowledged) {
        return "";
    } else {
        return "Something went wrong. Please try again.";
    }
}

