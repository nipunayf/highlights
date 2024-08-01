import { apiEndpoint } from "../apiConfig";
import { Tip } from "@/models/Tip";
import axios, { AxiosInstance } from "axios";


function getAxiosClient(route: string): AxiosInstance {
    // console.log("***************");
    const client = axios.create({
        
        baseURL: `${apiEndpoint}/${route}`
       
    });
    // console.log("KKK");
    return client;
}

export async function addTip(tip: Tip): Promise<Tip> {
    // console.log("hferioh");
    const response = await getAxiosClient('tips').request<Tip>({
        method: 'POST',
        data: tip
    });
    return response.data;
}

export async function fetchDailyTips(): Promise<Tip[]> {
    const response = await getAxiosClient('all').get<Tip[]>('');
    return response.data;
}
