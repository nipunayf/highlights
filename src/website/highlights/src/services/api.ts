import { apiEndpoint } from "@/apiConfig";
import { aquireAccessToken } from "@/util/auth";
import { Task } from "@/models/Task";
import axios, { AxiosInstance } from "axios";

function getAxiosClient(route: string): AxiosInstance {
    console.log("d")
    const client = axios.create({
        baseURL: `${apiEndpoint}/${route}`
        
    });
    

    client.interceptors.request.use(async (config) => {
        console.log("df")
        config.headers['Authorization'] = `Bearer ${await aquireAccessToken()}`;
        console.log(config)
        console.log("Sqqqqqqqqqq")
        return config;

    }, (error) => {
        console.log("s")
        return Promise.reject(error);
    });
    
console.log("qw")
console.log(client)
    return client;
}

export async function getTasks(): Promise<Task[]> {
    console.log("Ssssssssssssssssssssssssssss")
    const response = await getAxiosClient('tasks').request<Task[]>({
        method: 'GET'
    });

    return response.data;
}



export async function createTask(task: Task): Promise<Task> {
    console.log(task)
    const response = await getAxiosClient('tasks').request<Task>({
        method: 'POST',
        data: task
    });
    console.log("mbbbbbm")

    return response.data;
}



  