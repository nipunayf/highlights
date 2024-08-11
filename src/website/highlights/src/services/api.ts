import { apiEndpoint } from "@/apiConfig";
import { aquireAccessToken } from "@/util/auth";
import { Task } from "@/models/Task";
import { HighlightTask } from "@/models/HighlightTask";
import { mTimer, mPomo_details, mPauses_details, mTimeRecord, mPauseContinueDetails,StartDetails,EndDetails ,ActiveHighlightDetails} from "@/models/Timer";
import { Tip } from "@/models/Tip";
import axios, { AxiosInstance } from "axios";
import { Highlight } from "@/models/Highlight";
import { AppUser } from "@/hooks/useAppUser";

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
    pomo_id: number;
    timer_id: number;
    highlight_id: number;  // Changed from string to number
    user_id: number;
    // start_time: string;  // Assuming ISO 8601 string format for time
    end_time: string;    // Assuming ISO 8601 string format for time
    status: string;
}): Promise<EndDetails> {
    try {

        // Print the details of the data being sent
        console.log('Sending timer end data:', JSON.stringify(pomo_details, null, 2));

        // Create the Axios instance with the appropriate base URL
        const axiosInstance = getAxiosClient('end_pomo_details');


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









// Function to send start time data to the backend
export async function sendStartTimeData(startDetails: {
    timer_id: number;
    highlight_id: number;  // Changed from string to number
    user_id: number;
    start_time: string;  // Assuming ISO 8601 string format for time
    // end_time: string;    // Assuming ISO 8601 string format for time
    status: string
}): Promise<StartDetails> {
    try {
      // Print the details of the data being sent
      console.log('Sending start time data:', JSON.stringify(startDetails, null, 2));
  
      // Create the Axios instance with the appropriate base URL
      const axiosInstance = getAxiosClient('start_pomo_details');
  
      // Make the POST request to the backend API
      const response = await axiosInstance.post('', startDetails);
  
      // Return the response data (if any)
      return response.data;
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        // Handle known Axios errors
        console.error('Error sending start time data:', error.response?.data || error.message);
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
    pomo_id: number;
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
    pomo_id: number;
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










export async function getFocusRecord(userId: number, activeTab: string): Promise<mTimeRecord[]> {
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


export async function getActiveTimerHighlightDetails(userId: number): Promise<ActiveHighlightDetails[]> {
    try {
        const response = await getAxiosClient('active_timer_highlight_details').request<ActiveHighlightDetails[]>({
            method: 'GET',
            url: `/${userId}`
        });
        
        return response.data;
    } catch (error) {
        console.error('Error fetching active timer highlight details:', error);
        throw error;
    }
}


export async function getPauseDetails(userId: number, activeTab: string): Promise<mPauseContinueDetails[]> {
    try {

        const response = await getAxiosClient('pause_details').request<mPauseContinueDetails[]>({
            method: 'GET',
            url: `/${userId}`
        });

        return response.data;

    } catch (error) {
        console.error('Error fetching pause details:', error);
        throw error;
    }
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
export async function getProjects() {
    const response = await getAxiosClient('projects').request({
        method: 'GET'
    });

    return response;
}
export async function addProjects(tip: any) {
    console.log("add projects");
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
export async function updateMyTask(row: any) {
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
