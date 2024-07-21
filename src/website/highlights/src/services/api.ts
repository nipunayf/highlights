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

export async function updateTask(task: Task): Promise<Task> {
    console.log("Updating task:", task);
    try {
        const client = getAxiosClient('tasks');
        const response = await client.request<Task>({
            method: 'PUT',
            url: `/${task.id}`, // Ensure the URL includes the task ID
            data: task
        });
        console.log("Task updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
}


export async function deleteTask(taskId: number): Promise<void> {
    console.log("Deleting task with ID:", taskId);
    try {
        const client = getAxiosClient('tasks');
        await client.request<void>({
            method: 'DELETE',
            url: `/${taskId}` // Ensure the URL includes the task ID
        });
        console.log("Task deleted");
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
}


export async function addsubtask(taskId: number): Promise<void> {
    console.log("Deleting task with ID:", taskId);
    try {
        const client = getAxiosClient('subtasks');
        await client.request<void>({
            method: 'post',
            url: `/${taskId}` // Ensure the URL includes the task ID
        });
        console.log("Add subtask");
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
}