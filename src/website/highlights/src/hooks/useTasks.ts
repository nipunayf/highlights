import { getTasks } from "@/services/api";
import useSWR from "swr";

export const useTasks = () => {
    const { data, error } = useSWR('/tasks', getTasks);

    return {
        tasks: data,
        isLoading: !error && !data,
        isError: error
    };
}