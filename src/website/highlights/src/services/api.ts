import { apiEndpoint } from "@/apiConfig";
import { aquireAccessToken } from "@/util/auth";
import { Task } from "@/models/Task";
import { Tip } from "@/models/Tip";
import axios, { AxiosInstance } from "axios";
import { Highlight } from "@/models/Highlight";
import { AppUser } from "@/hooks/useAppUser";

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

export async function getTaskLists(user: AppUser) {
    const response = await getAxiosClient('taskLists').request({
        method: 'GET',
        params: {
            sub: user.sub
        }
    });
    return response.data;
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

export async function getHighlights() {
    const response = await getAxiosClient('highlights').request<Highlight[]>({
        method: 'GET'
    });

    return response;
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
export async function getProjects() {
    const response = await getAxiosClient('projects').request({
        method: 'GET'
    });

    return response;
}
export async function addProjects(tip: any) {
    console.log("cc")
    const response = await getAxiosClient('addProjects')({
        method: 'POST',
        data: tip
    });
    console.log("Hello", response.data);
    return response.data;
}
export async function updateProject(row: any) {
    // console.log("cc")
    const response = await getAxiosClient('updateProject')({
        method: 'PUT',
        data: row
    });
    // console.log("Hello");
    return response.data;
}
export async function getProjectDetails() {
    const response = await getAxiosClient('project-details').request({
        method: 'GET'
    });

    return response;
}
export async function addTask(row: any) {
    // console.log("cc")
    const response = await getAxiosClient('addTask')({
        method: 'POST',
        data: row
    });
    // console.log(response);
    // console.log("Hello");
    return response.data;
}
export async function updateTask(row: any) {
    // console.log("cc")
    const response = await getAxiosClient('updateTask')({
        method: 'PUT',
        data: row
    });
    // console.log("Hello");
    return response.data;
}
export async function tasks(projectId: any) {
    const response = await getAxiosClient(`tasks/${projectId}`).request({
        method: 'GET'
        // params: {
        //     projectId: projectId
        // }
    });
    console.log("jagaht");
    return response.data;
}
export async function project(projectId: any) {
    const response = await getAxiosClient(`project/${projectId}`).request({
        method: 'GET'
        // params: {
        //     projectId: projectId
        // }
    });
    // console.log(response);
    return response.data;
}
