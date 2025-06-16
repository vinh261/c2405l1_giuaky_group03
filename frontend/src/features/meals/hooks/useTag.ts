import { useState, useEffect } from "react";
import { TagAPI } from "../services/mealApi";
import type { Tag } from "../types/test.type";


export const useTags = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await TagAPI.getAllTags();
                setTags(data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to fetch tags"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    return { tags, loading, error };
};