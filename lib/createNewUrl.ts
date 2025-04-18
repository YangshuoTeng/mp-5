"use server";
import getCollection, {URI_COLLECTION} from "@/db";
import {PostProps} from "@/types";


function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export default async function createNewUrl(inputUrl: string, outputUrl: string): Promise<PostProps> {
    console.log("creating new url...");

    if (!isValidUrl(inputUrl)) {
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
            console.error(`request failed for: ${inputUrl}`);
        }
    } catch (error) {
        console.error(`Fetch failed for ${inputUrl}. Reason:`, error);
        throw new Error("Invalid URL or URL cannot be reached");
    }

    if (!reachable) {
        throw new Error("URL cannot be reached");
    }

    const urlCollection = await getCollection(URI_COLLECTION);
    const fullUrl = `https://localhost:3000/${outputUrl}`;
    const existing = await urlCollection.findOne({outputUrl: fullUrl});

    if (existing) {
        throw new Error("Alias already taken");
    }

    const p = {
        inputUrl,
        outputUrl: fullUrl,
    };

    const res = await urlCollection.insertOne(p);
    return { ...p, id: res.insertedId.toHexString() };

}

