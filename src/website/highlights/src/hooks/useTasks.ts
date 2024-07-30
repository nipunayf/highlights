import { getTasks } from "@/services/api";
import useSWR from "swr";

export const useTasks = () => {
    // const { data, error } = useSWR('/tasks', getTasks);
    const { data, error } = useSWR('/highlights', getTasks);

    return {
        tasks: data,
        isLoading: !error && !data,
        isError: error
    };

   
}


// export const useTasks = () => {
   

//     return {
//         tasks: data,
//         isLoading: !error && !data,
//         isError: error
//     };