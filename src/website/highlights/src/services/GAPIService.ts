import { googleAPIConfig } from "@/authConfig";
import axios from "axios";

declare global {
    interface Window {
        google: any;
    }
}

let tokenClient: any;

export const initTokenClient = (callback: (response: any) => void, loginHint?: string) => {
    if (tokenClient) return;

    tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: googleAPIConfig.clientId,
        scope: googleAPIConfig.scopes,
        callback: callback,
        login_hint: loginHint,
    });
};

export const requestAccessToken = () => {
    if (tokenClient) {
        tokenClient.requestAccessToken();
    } else {
        console.error('Token client not initialized');
    }
};

export async function getUserEmail(token: string): Promise<string> {
    const res = await axios.get('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data.emailAddresses[0].value;
}

export async function getTaskLists(token: string) {
    const res = await axios.get('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data.items;
}

export async function getTasks(token: string, taskListId: string) {
    const res = await axios.get(`https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data.items;
}