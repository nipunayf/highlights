import { apiEndpoint } from "@/apiConfig";
import { aquireAccessToken } from "@/util/auth";
import { Task } from "@/models/Task";
import { Tip } from "@/models/Tip";
import axios, { AxiosInstance } from "axios";
import { Highlight } from "@/models/Highlight";
import { AppUser } from "@/hooks/useAppUser";

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

export async function getTaskLists(user: AppUser) {
    const response = await getAxiosClient('taskLists').request({
        method: 'GET',
        params: {
            sub: user.sub
        }
    });
    return response.data;
}

export async function createTask(task: Task): Promise<Task> {
    console.log(task)
    const response = await getAxiosClient('tasks').request<Task>({
        method: 'POST',
        data: task
    });

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

// export async function getHighlights() {
//     const response = await getAxiosClient('highlights').request<Highlight[]>({
//         method: 'GET'
//     });

//     return response;
// }

export async function addTip(tip: Tip): Promise<Tip> {
    const response = await getAxiosClient('tips').request<Tip>({
        method: 'POST',
        data: tip
    });
    return response.data;
}
