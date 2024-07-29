import { apiEndpoint } from "@/apiConfig";
import { aquireAccessToken } from "@/util/auth";
import { Task } from "@/models/Task";
import {Tip} from "@/models/Tip";
import axios, { AxiosInstance } from "axios";

function getAxiosClient(route: string): AxiosInstance {
    console.log("Hello");
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

export async function addTip(tip: Tip): Promise<Tip> {
    // console.log("cc")
    const response = await getAxiosClient('tips').request<Tip>({
        method: 'POST',
        data: tip
    });
    // console.log("Hello");
    return response.data;
}
