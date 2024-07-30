import { getHighlights } from "@/services/api";
import useSWR from "swr";

export const useHighlights = () => {
    const { data, error } = useSWR('/highlights', getHighlights);

    return {
        highlights: data,
        isHighlightsLoading: !error && !data,
        isHighlightsError: error
    };
}



