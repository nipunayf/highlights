import { getTimerDetails } from "@/services/api";
import useSWR from "swr";

export const useTimers = () => {
    const { data, error } = useSWR('/timer_details', getTimerDetails);

    return {
        timer_details: data,
        istimer_detailsLoading: !error && !data,
        istimer_detailsError: error
    };
}


export const use = () => {
    const { data, error } = useSWR('/timer_details', getTimerDetails);

    return {
        timer_details: data,
        istimer_detailsLoading: !error && !data,
        istimer_detailsError: error
    };
}


