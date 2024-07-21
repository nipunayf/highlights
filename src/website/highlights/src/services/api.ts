import { apiEndpoint } from "@/apiConfig";
import { aquireAccessToken } from "@/util/auth";
import { Task } from "@/models/Task";
import { HighlightTask } from "@/models/HighlightTask";
import { mTimer,mPomo_details } from "@/models/Timer";
import axios, { AxiosInstance } from "axios";

function getAxiosClient(route: string): AxiosInstance {
    const client = axios.create({
        baseURL: `${apiEndpoint}/${route}`
    });

    client.interceptors.request.use(async (config) => {
        config.headers['Authorization'] = `Bearer ${await aquireAccessToken()}`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    return client;
}

export async function getTasks(): Promise<Task[]> {
    const response = await getAxiosClient('tasks').request<Task[]>({
        method: 'GET'
    });

    return response.data;
}

export async function createTask(task: Task): Promise<Task> {
    const response = await getAxiosClient('tasks').request<Task>({
        method: 'POST',
        data: task
    });

    return response.data;
}

export async function getHighlights(): Promise<HighlightTask[]> {
    const response = await getAxiosClient('highlights').request<HighlightTask[]>({
        method: 'GET'
    });

    return response.data;
}

export async function getTimerDetails(): Promise<mTimer[]> {
    const response = await getAxiosClient('timer_details').request<mTimer[]>({
        method: 'GET'
    });

    return response.data;
}

export async function sendTimerEndData(timerData: {
    timer_id: number;
    highlight_id: string;
    pomo_duration: string;  // Adjusted to string, assuming TimeOfDay is represented as a string
    short_break_duration: string;  // Adjusted to string, assuming TimeOfDay is represented as a string
    long_break_duration: string;  // Adjusted to string, assuming TimeOfDay is represented as a string
    pomos_per_long_break: number;
    user_id: number;
}): Promise<mPomo_details> {
    const response = await getAxiosClient('add_pomo_details').request({
        method: 'POST',
        data: timerData
    });

    return response.data;

}
