import { apiEndpoint } from "@/apiConfig";
import { aquireAccessToken } from "@/util/auth";
import { Task } from "@/models/Task";
import { HighlightTask } from "@/models/HighlightTask";
import { mTimer, mPomo_details, mPauses_details,mTimeRecord } from "@/models/Timer";
import axios, { AxiosInstance } from "axios";

// Function to create an Axios client with authorization
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

// Function to get tasks
export async function getTasks(): Promise<Task[]> {
    const response = await getAxiosClient('tasks').request<Task[]>({
        method: 'GET'
    });

    return response.data;
}

// Function to create a task
export async function createTask(task: Task): Promise<Task> {
    const response = await getAxiosClient('tasks').request<Task>({
        method: 'POST',
        data: task
    });

    return response.data;
}

// Function to get highlights
export async function getHighlights(): Promise<HighlightTask[]> {
    const response = await getAxiosClient('highlights').request<HighlightTask[]>({
        method: 'GET'
    });

    return response.data;
}





// Function to get timer details
export async function getTimerDetails(): Promise<mTimer[]> {
    const response = await getAxiosClient('timer_details').request<mTimer[]>({
        method: 'GET'
    });

    return response.data;
}

// Function to send timer end data
export async function sendTimerEndData(pomo_details: {
    timer_id: number;
    highlight_id: number;  // Changed from string to number
    user_id: number;
    start_time: string;  // Assuming ISO 8601 string format for time
    end_time: string;    // Assuming ISO 8601 string format for time
    status: string;
}): Promise<mPomo_details> {
    try {

        // Print the details of the data being sent
        console.log('Sending timer end data:', JSON.stringify(pomo_details, null, 2));

        // Create the Axios instance with the appropriate base URL
        const axiosInstance = getAxiosClient('add_pomo_details');


        // Make the POST request to the backend API
        const response = await axiosInstance.post('', pomo_details);

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error)) {
            // Handle known Axios errors
            console.error('Error sending timer end data:', error.response?.data || error.message);
        } else {
            // Handle other errors
            console.error('Unexpected error:', error);
        }

        // Optionally, you can throw the error again or handle it differently
        throw error;
    }
}







// Function to send pause data
export async function sendPauseData(pauseDetails: {
    highlight_id: number;
    pause_time: string;

}): Promise<mPauses_details> {
    try {
        // Print the details of the data being sent
        console.log('Sending pause data:', JSON.stringify(pauseDetails, null, 2));

        // Create the Axios instance with the appropriate base URL
        const axiosInstance = getAxiosClient('pause_pomo_details');

        // Make the POST request to the backend API
        const response = await axiosInstance.post('', pauseDetails);

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error)) {
            // Handle known Axios errors
            console.error('Error sending pause data:', error.response?.data || error.message);
        } else {
            // Handle other errors
            console.error('Unexpected error:', error);
        }

        // Optionally, you can throw the error again or handle it differently
        throw error;
    }
}




export async function sendContinueData(continueDetails: {
    highlight_id: number;
    continue_time: string;

}): Promise<mPauses_details> {
    try {
        // Print the details of the data being sent
        console.log('Sending pause data:', JSON.stringify(continueDetails, null, 2));

        // Create the Axios instance with the appropriate base URL
        const axiosInstance = getAxiosClient('continue_pomo_details');

        // Make the POST request to the backend API
        const response = await axiosInstance.post('', continueDetails);

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error)) {
            // Handle known Axios errors
            console.error('Error sending pause data:', error.response?.data || error.message);
        } else {
            // Handle other errors
            console.error('Unexpected error:', error);
        }

        // Optionally, you can throw the error again or handle it differently
        throw error;
    }
}










export async function getFocusRecord(userId: number): Promise<mTimeRecord[]> {
    try {
      const response = await getAxiosClient('focus_record').request<mTimeRecord[]>({
        method: 'GET',
        url: `/${userId}`
      });
  
      // Log the response data to the console
      console.log('Data sent to the backend:----------------------------------------------------------', response.data);
  
      return response.data;
    } catch (error) {
      console.error('Error fetching focus record:', error);
      throw error;
    }
  }




















