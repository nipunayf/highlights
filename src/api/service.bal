import ballerina/http;
import ballerina/io;

import ballerina/log;
import ballerina/sql;
import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

// import ballerina/io;

type CreateUser record {|
    string sub;
|};

type User record {|
    int id;
    string sub;
|};

type Task record {
    int id;
    string title;
    string description;
    string? dueDate;
    string? startTime;
    string? endTime;
    string? reminder;
    string priority;
    string label;
    string status;
};

type CreateTask record {|
    string title;
    string description;
    string? dueDate;
    string? startTime;
    string? endTime;
    string? label;
    string? reminder;
    string priority;

|};

type Highlight record {|
    string id;
    string created;
    string title;
    time:Utc? dueDate = null;
|};

type h_Highlight record {|
    int highlight_id;
    string highlight_name;
    int user_id;
|};

type h_TimerDetails record {|
    int timer_id;
    string timer_name;
    time:TimeOfDay? pomo_duration;
    time:TimeOfDay? short_break_duration;
    time:TimeOfDay? long_break_duration;
    int pomos_per_long_break;
    int user_id;
|};

type HighlightPomoDetails record {
    int timer_id;
    int highlight_id;
    int user_id;
    time:Utc start_time;
    time:Utc end_time;
    string status;
};

// Intermediate record type for deserialization
type h_HighlightPomoDetailsTemp record {
    int timer_id;
    int highlight_id;
    int user_id;
    string start_time;
    string end_time;
    string status;
};

type PausesDetails record {
    // int pauses_pomo_id;
    int highlight_id;
    string pause_time;
    // string continue_time;
};

type PausesDetailsTemp record {
    // int pauses_pomo_id;
    int highlight_id;
    string pause_time;
    // string continue_time;
};

type ContinueDetails record {
    // int pauses_pomo_id;
    int highlight_id;
    // string pause_time;
    string continue_time;
};

type ContinueDetailsTemp record {
    // int pauses_pomo_id;
    int highlight_id;
    // string pause_time;
    string continue_time;
};

type TimeRecord record {
    int highlight_id;
    string highlight_name;
    string start_time;
    string end_time;
    string[][] pause_and_continue_times;
};


Task[] tasks = [

];


type FocusRecord record {
    string highlight_id;
    time:TimeOfDay start_time;
    time:TimeOfDay end_time;
};

type PauseContinueDetails record {
    string highlight_id;
    time:TimeOfDay pause_time;
    time:TimeOfDay continue_time;
};

type FocusSummary record {
    FocusRecord focusRecord;
    PauseContinueDetails[] pauseContinueDetails;
};
type PauseContinueRecord record {

    string pause_time;
    string continue_time?;
};


// Define a record to hold the highlight details
type HighlightRecord record {
    int highlight_id;
    string start_time;
    string end_time;
    PauseContinueRecord[] pause_and_continue_times;
};

type h_PauseContinueDetails record {|
    int highlight_id;
    string pause_time;
    string? continue_time;
|};

type TaskList record {|
    int id;
    @sql:Column {name: "user_id"}
    int userId;
    string title;
|};

type DailyTip record {
    int id;
    string label;
    string tip;
    // time:Date date;
};

type CreateDailyTip record {|
    string label;
    string tip;
    // time:Date date;
|};

// listener http:Listener securedEP = new (9090);

// Define the configuration variables
configurable string azureAdIssuer = ?;
configurable string azureAdAudience = ?;

type PauseAndContinueTime record {
    
};

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowCredentials: false,
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        maxAge: 84900
    }
}
service / on new http:Listener(9090) {

    private final mysql:Client db;

    function init() returns error? {
        // Initiate the mysql client at the start of the service. This will be used
        // throughout the lifetime of the service.
        self.db = check new ("localhost", "root", "root", "highlights", 3306);
    }

    resource function post users(CreateUser createUser) returns http:Created|http:Conflict|http:InternalServerError {

        User|sql:Error result = self.db->queryRow(`SELECT * FROM users WHERE sub = ${createUser.sub}`);

        if result is sql:NoRowsError {
            do {
                _ = check self.db->execute(`
                        INSERT INTO users (sub)
                        VALUES (${createUser.sub});`);
            } on fail var e {
                log:printError("Error occurred while inserting data: ", e);
                return http:INTERNAL_SERVER_ERROR;
            }

            return http:CREATED;
        }

        if result is User {
            return http:CONFLICT;
        }

        return http:INTERNAL_SERVER_ERROR;
    }

    //  resource function get tasks() returns Task[]|error {
    //         sql:ParameterizedQuery query = `SELECT id,title, dueDate, startTime, endTime, label, reminder, priority, description , status FROM hi`;
    //         stream<Task, sql:Error?> resultStream = self.db->query(query);
    //         Task[] tasksList = [];
    //         error? e = resultStream.forEach(function(Task task) {
    //             tasksList.push(task);
    //         });
    //         if (e is error) {
    //             log:printError("Error occurred while fetching tasks: ", 'error = e);
    //             return e;
    //         }
    // // io:print(tasklist);
    // io:println(tasksList);
    //         return tasksList;
    //     }

    private function fetchTasksForToday() returns Task[]|error {
        sql:ParameterizedQuery query = `SELECT id, title, dueDate, startTime, endTime, label, reminder, priority, description, status
                                        FROM hi
                                        WHERE dueDate = CURRENT_DATE`;

        stream<Task, sql:Error?> resultStream = self.db->query(query);
        Task[] tasksList = [];
        error? e = resultStream.forEach(function(Task task) {
            tasksList.push(task);
        });

        if (e is error) {
            log:printError("Error occurred while fetching tasks: ", 'error = e);
            return e;
        }

        check resultStream.close();
        return tasksList;
    }

    resource function get taskLists(string sub) returns TaskList[]|error {
        User|sql:Error result = self.db->queryRow(`SELECT * FROM users WHERE sub = ${sub}`);

        if result is sql:NoRowsError {
            return error("User not found");
        }

        stream<TaskList, sql:Error?> taskListStream = self.db->query(
            `SELECT * FROM task_lists WHERE user_id=(SELECT u.id FROM users AS u WHERE u.sub=${sub});`
        );

        return from TaskList taskList in taskListStream
            select taskList;
    }

    // resource function get tasks() returns Task[] {
    //     return tasks;
    // }

    resource function get tasks() returns Task[]|error {
        io:println("cbbbb");
        return self.fetchTasksForToday();
    }

    resource function post tasks(http:Caller caller, http:Request req) returns error? {
        json|http:ClientError payload = req.getJsonPayload();
        if payload is http:ClientError {
            log:printError("Error while parsing request payload", 'error = payload);
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }

        CreateTask|error task = payload.cloneWithType(CreateTask);
        if task is error {
            log:printError("Error while converting JSON to Task", 'error = task);
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }

        // Convert ISO 8601 date to MySQL compatible date format
        string dueDate = task.dueDate != () ? formatDateTime(task.dueDate.toString()) : "";
        string startTime = task.startTime != () ? formatTime(task.startTime.toString()) : "";
        string endTime = task.endTime != () ? formatTime(task.endTime.toString()) : "";

        sql:ExecutionResult|sql:Error result = self.db->execute(`
        INSERT INTO hi (title, dueDate, startTime, endTime, label, reminder, priority, description) 
        VALUES (${task.title}, ${dueDate}, ${startTime}, ${endTime}, ${task.label} ,${task.reminder}, ${task.priority}, ${task.description});
    `);

        if result is sql:Error {
            log:printError("Error occurred while inserting task", 'error = result);
            check caller->respond(http:STATUS_INTERNAL_SERVER_ERROR);
        }

        Task[]|error tasks = self.fetchTasksForToday();
        if (tasks is error) {
            log:printError("Error occurred while fetching tasks: ", 'error = tasks);
            check caller->respond(http:STATUS_INTERNAL_SERVER_ERROR);
            return;
        }

        io:println(tasks);

        check caller->respond(tasks);

        // } else {
        //     check caller->respond(http:STATUS_CREATED);
        // }
    }

    resource function put tasks/[int taskId](http:Caller caller, http:Request req) returns error? {
        // io:println("ss");
        // io:println(Task);

        json|http:ClientError payload = req.getJsonPayload();
        if payload is http:ClientError {
            log:printError("Error while parsing request payload", 'error = payload);
            io:println("xdd");
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }

        Task|error task = payload.cloneWithType(Task);
        if task is error {
            log:printError("Error while converting JSON to Task", 'error = task);
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }

        // Convert ISO 8601 date to MySQL compatible date format
        string dueDate = task.dueDate != () ? formatDateTime(task.dueDate.toString()) : "";
        string startTime = task.startTime != () ? formatTime(task.startTime.toString()) : "";
        string endTime = task.endTime != () ? formatTime(task.endTime.toString()) : "";

        sql:ExecutionResult|sql:Error result = self.db->execute(`
        UPDATE hi SET title = ${task.title}, 
                      dueDate = ${dueDate}, 
                      startTime = ${startTime}, 
                      endTime = ${endTime}, 
                      reminder = ${task.reminder}, 
                      priority = ${task.priority}, 
                      description = ${task.description}
        WHERE id = ${taskId};
    `);

        if result is sql:Error {
            log:printError("Error occurred while updating task", 'error = result);
            check caller->respond(http:STATUS_INTERNAL_SERVER_ERROR);
        } else {
            check caller->respond(http:STATUS_OK);
        }
    }

    // resource function get highlights() returns Highlight[] {
    //     return highlights;
    // }

    resource function delete tasks/[int taskId](http:Caller caller) returns error? {
        io:println("xdd");
        sql:ExecutionResult|sql:Error result = self.db->execute(`
            DELETE FROM hi WHERE id = ${taskId};
        `);

        if result is sql:Error {
            log:printError("Error occurred while deleting task", result);
            check caller->respond(http:STATUS_INTERNAL_SERVER_ERROR);
        } else {
            check caller->respond(http:STATUS_OK);
        }
    }

    // Create a new daily tip
    private function tipps(CreateDailyTip dailyTip) returns error? {
        io:println("cc");
        sql:ExecutionResult|sql:Error result = self.db->execute(`
            INSERT INTO dailytips (label, tip) VALUES (${dailyTip.label}, ${dailyTip.tip});
        `);

        if (result is sql:ApplicationError) {
            log:printError("Error occurred while inserting daily tip", 'error = result);
            return result;
        }
        return ();
    }

    // Fetch daily tips
    private function fetchDailyTips() returns DailyTip[]|error {
        sql:ParameterizedQuery query = `SELECT id, label, tip FROM dailytips`;
        stream<DailyTip, sql:Error?> resultStream = self.db->query(query);
        DailyTip[] dailyTipList = [];
        error? e = resultStream.forEach(function(DailyTip dailyTip){
            dailyTipList.push(dailyTip);
        });

        if (e is error) {
            log:printError("Error occured while fetching daily tips: ", 'error = e);
            return e;
        }

        check resultStream.close();
        return dailyTipList;
    }

    // Update a dailytip by ID
    private function updateDailyTip(int tipId, string label, string tip) returns error? {
        sql:ExecutionResult|sql:Error result = self.db->execute(`
            UPDATE dailytips SET label = ${label}, tip = ${tip} WHERE id = ${tipId};
        `);

        if (result is sql:Error) {
            log:printError("Error occurred while updating daily tip", 'error = result);
            return result;
        }

        return ();
    }

    // Endpoint to create a new daily tip
    resource function POST tips(http:Caller caller, http:Request req) returns error? {
        io:println("ccmmm");
        json|http:ClientError payload = req.getJsonPayload();
        if (payload is http:ClientError) {
            log:printError("Error while parsing request payload", 'error = payload);
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }
        CreateDailyTip|error dailyTip = payload.cloneWithType(CreateDailyTip);
        if (dailyTip is error) {
            log:printError("Error while converting JSON to CreateDailyTip", 'error = dailyTip);
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }

        error? result = self.tipps(dailyTip);
        if (result is error) {
            check caller->respond(http:STATUS_INTERNAL_SERVER_ERROR);
            return;
        }

        check caller->respond(http:STATUS_CREATED);
    }

    // Endpoint to fetch daily tips
    resource function GET all() returns DailyTip[]|error {
        return self.fetchDailyTips();
    }

    // Endpoint to update a daily tip
    resource function put [int tipId](http:Caller caller, http:Request req) returns error? {
        json|http:ClientError payload = req.getJsonPayload();

        if (payload is http:ClientError) {
            log:printError("Error while parsing request payload", 'error = payload);
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }

        CreateDailyTip|error dailyTip = payload.cloneWithType(CreateDailyTip);
        if (dailyTip is error) {
            log:printError("Error while converting JSON to CreateDailyTip", 'error = dailyTip);
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }

        error? result = self.updateDailyTip(tipId, dailyTip.tip, dailyTip.label);
        if (result is error) {
            check caller->respond(http:STATUS_INTERNAL_SERVER_ERROR);
            return;
        }

        check caller->respond(http:STATUS_OK);
    }

    resource function get timer_details() returns h_TimerDetails[]|error {

        sql:ParameterizedQuery sqlQuery = `SELECT timer_id, timer_name, pomo_duration, short_break_duration, long_break_duration, pomos_per_long_break, user_id FROM timer_details`;

        // Execute the query and retrieve the results
        stream<record {|
            int timer_id;
            string timer_name;
            time:TimeOfDay? pomo_duration;
            time:TimeOfDay? short_break_duration;
            time:TimeOfDay? long_break_duration;
            int pomos_per_long_break;
            int user_id;
        |}, sql:Error?> resultStream = self.db->query(sqlQuery);

        h_TimerDetails[] h_timerDetailsList = [];

        // Iterate over the results
        check from var timerDetail in resultStream
            do {
                log:printInfo("Retrieved TimerDetail: " + timerDetail.toString());
                h_timerDetailsList.push({
                    timer_id: timerDetail.timer_id,
                    timer_name: timerDetail.timer_name,
                    pomo_duration: timerDetail.pomo_duration,
                    short_break_duration: timerDetail.short_break_duration,
                    long_break_duration: timerDetail.long_break_duration,
                    pomos_per_long_break: timerDetail.pomos_per_long_break,
                    user_id: timerDetail.user_id
                });
            };

        io:println(h_timerDetailsList);

        return h_timerDetailsList;
    }

    // Function to get highlights from the database
    resource function get highlights() returns h_Highlight[]|error {

        sql:ParameterizedQuery sqlQuery = `SELECT highlight_id, highlight_name, user_id FROM hilights_hasintha`;

        // Execute the query and retrieve the results
        stream<record {|
            int highlight_id;
            string highlight_name;
            int user_id;
        |}, sql:Error?> resultStream = self.db->query(sqlQuery);

        h_Highlight[] highlightList = [];

        // Iterate over the results
        check from var highlight in resultStream
            do {
                log:printInfo("Retrieved Highlight: " + highlight.toString());
                highlightList.push({
                    highlight_id: highlight.highlight_id,
                    highlight_name: highlight.highlight_name,
                    user_id: highlight.user_id
                });
            };

        io:println(highlightList);

        return highlightList;
    }

    resource function post add_pomo_details(http:Caller caller, http:Request req) returns error? {

        json|http:ClientError payload = req.getJsonPayload();

        if payload is http:ClientError {
            log:printError("Error while parsing request payload (pomo_details)", 'error = payload);
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }

        // Convert the payload to the h_HighlightPomoDetailsTemp record
        h_HighlightPomoDetailsTemp tempDetails = check payload.cloneWithType(h_HighlightPomoDetailsTemp);
        io:println("Received highlightPomoDetails:", tempDetails);

        // Convert start_time and end_time strings to time:Utc
        time:Utc|error startTime = time:utcFromString(tempDetails.start_time);
        time:Utc|error endTime = time:utcFromString(tempDetails.end_time);

        if (startTime is error) {
            log:printError("Error parsing start_time", 'error = startTime);
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }

        if (endTime is error) {
            log:printError("Error parsing end_time", 'error = endTime);
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }

        // Create a negative duration of 5 hours and 30 minutes
        time:Utc adjustedStartTime = time:utcAddSeconds(startTime, +(5 * 3600 + 30 * 60));
        time:Utc adjustedEndTime = time:utcAddSeconds(endTime, +(5 * 3600 + 30 * 60));

        // Create HighlightPomoDetails record with adjusted times
        HighlightPomoDetails highlightPomoDetails = {
            timer_id: tempDetails.timer_id,
            highlight_id: tempDetails.highlight_id,
            user_id: tempDetails.user_id,
            start_time: adjustedStartTime,
            end_time: adjustedEndTime,
            status: tempDetails.status
        };

        // Convert time:Utc to RFC 3339 strings
        string startTimeStr = time:utcToString(highlightPomoDetails.start_time);
        string endTimeStr = time:utcToString(highlightPomoDetails.end_time);

        // Manual formatting from RFC 3339 to "yyyy-MM-dd HH:mm:ss"
        string formattedStartTime = startTimeStr.substring(0, 10) + " " + startTimeStr.substring(11, 19);
        string formattedEndTime = endTimeStr.substring(0, 10) + " " + endTimeStr.substring(11, 19);

        // Insert data into database
        sql:ExecutionResult|sql:Error result = self.db->execute(`
            INSERT INTO HighlightPomoDetails (timer_id, highlight_id, user_id, start_time, end_time, status) 
            VALUES (${highlightPomoDetails.timer_id}, ${highlightPomoDetails.highlight_id}, ${highlightPomoDetails.user_id}, ${formattedStartTime}, ${formattedEndTime}, ${highlightPomoDetails.status});
        `);

        if result is sql:Error {
            log:printError("Error while inserting data into HighlightPomoDetails", 'error = result);
            check caller->respond(http:STATUS_INTERNAL_SERVER_ERROR);
            return;
        }

        io:println("Data inserted successfully");
        check caller->respond(http:STATUS_OK);
    }

    resource function post pause_pomo_details(http:Caller caller, http:Request req) returns error? {

        json|http:ClientError payload = req.getJsonPayload();

        if payload is http:ClientError {
            log:printError("Error while parsing request payload (pause_pomo_details)", 'error = payload);
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }

        // Convert the payload to the h_HighlightPomoDetailsTemp record
        PausesDetailsTemp tempDetails = check payload.cloneWithType(PausesDetailsTemp);
        io:println("Received highlightPomoDetails:", tempDetails);

        // Convert pause_time string to time:Utc
        time:Utc|error pauseTime = time:utcFromString(tempDetails.pause_time);

        if (pauseTime is error) {
            log:printError("Error parsing pause_time", 'error = pauseTime);
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }

        // Create a negative duration of 5 hours and 30 minutes
        time:Utc adjustedPauseTime = time:utcAddSeconds(pauseTime, +(5 * 3600 + 30 * 60));

        // Convert time:Utc to RFC 3339 string
        string adjustedPauseTimeStr = time:utcToString(adjustedPauseTime);

        // Manual formatting from RFC 3339 to "yyyy-MM-dd HH:mm:ss"
        string formattedPauseTime = adjustedPauseTimeStr.substring(0, 10) + " " + adjustedPauseTimeStr.substring(11, 19);

        // Create PausesDetails record with adjusted times
        PausesDetails pausesDetails = {
            highlight_id: tempDetails.highlight_id,
            pause_time: formattedPauseTime
        };

        // Insert data into database
        sql:ExecutionResult|sql:Error result = self.db->execute(`
        INSERT INTO PausesPomoDetails (highlight_id, pause_time) 
        VALUES (${pausesDetails.highlight_id}, ${pausesDetails.pause_time});
    `);

        if result is sql:Error {
            log:printError("Error while inserting data into HighlightPomoDetails", 'error = result);
            check caller->respond(http:STATUS_INTERNAL_SERVER_ERROR);
            return;
        }

        io:println("Data inserted successfully");
        check caller->respond(http:STATUS_OK);
    }

    resource function post continue_pomo_details(http:Caller caller, http:Request req) returns error? {

        json|http:ClientError payload = req.getJsonPayload();

        if payload is http:ClientError {
            log:printError("Error while parsing request payload (continue_pomo_details)", 'error = payload);
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }

        // Convert the payload to the h_HighlightPomoDetailsTemp record
        ContinueDetailsTemp tempDetails = check payload.cloneWithType(ContinueDetailsTemp);
        io:println("Received highlightContinuePomoDetails:", tempDetails);

        // Convert pause_time string to time:Utc
        time:Utc|error continueTime = time:utcFromString(tempDetails.continue_time);

        if (continueTime is error) {
            log:printError("Error parsing pause_time", 'error = continueTime);
            check caller->respond(http:STATUS_BAD_REQUEST);
            return;
        }

        // Create a negative duration of 5 hours and 30 minutes
        time:Utc adjustedContinueTime = time:utcAddSeconds(continueTime, +(5 * 3600 + 30 * 60));

        // Convert time:Utc to RFC 3339 string
        string adjustedContinueTimeStr = time:utcToString(adjustedContinueTime);

        // Manual formatting from RFC 3339 to "yyyy-MM-dd HH:mm:ss"
        string formattedContinueTime = adjustedContinueTimeStr.substring(0, 10) + " " + adjustedContinueTimeStr.substring(11, 19);

        // Create PausesDetails record with adjusted times
        ContinueDetails continueDetails = {
            highlight_id: tempDetails.highlight_id,
            continue_time: formattedContinueTime
        };

        sql:ExecutionResult|sql:Error result = self.db->execute(`
        UPDATE PausesPomoDetails 
        SET continue_time = ${continueDetails.continue_time} 
        WHERE highlight_id = ${continueDetails.highlight_id} 
        AND continue_time IS NULL;
    `);

        if result is sql:Error {
            log:printError("Error while updating data into PausesDetails", 'error = result);
            check caller->respond(http:STATUS_INTERNAL_SERVER_ERROR);
            return;
        }

        io:println("Data inserted successfully");
        check caller->respond(http:STATUS_OK);
    }














// for get the focus record without pauses
resource function get focus_record/[int userId]() returns TimeRecord[]|error {
    // Query to get all highlights for the given user
    sql:ParameterizedQuery highlightQuery = `SELECT highlight_id, start_time, end_time FROM HighlightPomoDetails WHERE user_id = ${userId}`;
    stream<record {| int highlight_id; time:Utc start_time; time:Utc end_time; |}, sql:Error?> highlightStream = self.db->query(highlightQuery);

    TimeRecord[] highlightTimeRecords = [];

    // Iterate over the highlight results
    check from var highlight in highlightStream
        do {
            string[][] pauseAndContinueTimes = [];

            // Add the duration to start_time and end_time
            time:Utc newStartTime = time:utcAddSeconds(highlight.start_time, +(5 * 3600 + 30 * 60));
            time:Utc newEndTime = time:utcAddSeconds(highlight.end_time, +(5 * 3600 + 30 * 60));

            // Convert time:Utc to RFC 3339 strings
            string startTimeStr = time:utcToString(newStartTime);
            string endTimeStr = time:utcToString(newEndTime);

            // Manual formatting from RFC 3339 to "yyyy-MM-dd HH:mm:ss"
            string formattedStartTime = startTimeStr.substring(0, 10) + " " + startTimeStr.substring(11, 19);
            string formattedEndTime = endTimeStr.substring(0, 10) + " " + endTimeStr.substring(11, 19);

            // Query to get the highlight name based on highlight_id
            sql:ParameterizedQuery highlightNameQuery = `SELECT highlight_name FROM hilights_hasintha WHERE highlight_id = ${highlight.highlight_id}`;
            stream<record {| string highlight_name; |}, sql:Error?> highlightNameStream = self.db->query(highlightNameQuery);
            
            string highlightName = "";
            check from var result in highlightNameStream
                do {
                    highlightName = result.highlight_name;
                };

            TimeRecord timeRecord = {
                highlight_id: highlight.highlight_id,
                highlight_name: highlightName,
                start_time: formattedStartTime,
                end_time: formattedEndTime,
                pause_and_continue_times: pauseAndContinueTimes
            };

            highlightTimeRecords.push(timeRecord);
        };
    io:println(highlightTimeRecords);
    return highlightTimeRecords;
}



resource function get pause_details/[int userId]() returns h_PauseContinueDetails[]|error {
    // SQL query to retrieve pause and continue details
    sql:ParameterizedQuery sqlQuery = `SELECT 
                                            h.highlight_id, 
                                            p.pause_time, 
                                            p.continue_time 
                                        FROM 
                                            HighlightPomoDetails h 
                                        JOIN 
                                            PausesPomoDetails p 
                                        ON 
                                            h.highlight_id = p.highlight_id 
                                        WHERE 
                                            h.user_id = ${userId}`;

    // Execute the query and retrieve the results
    stream<record {|
        int highlight_id;
        time:Utc pause_time;
        time:Utc? continue_time;
    |}, sql:Error?> resultStream = self.db->query(sqlQuery);

    h_PauseContinueDetails[] pauseContinueDetails = [];

  

    // Iterate over the results
    check from var pauseDetail in resultStream
        do {
            // Add the duration to pause_time and continue_time
            time:Utc newPauseTime = time:utcAddSeconds(pauseDetail.pause_time, +(5 * 3600 + 30 * 60));
            time:Utc? newContinueTime = pauseDetail.continue_time != () ? time:utcAddSeconds(<time:Utc>pauseDetail.continue_time,  +(5 * 3600 + 30 * 60)) : ();

            // Convert time:Utc to RFC 3339 strings
            string pauseTimeStr = time:utcToString(newPauseTime);
            string? continueTimeStr = newContinueTime != () ? time:utcToString(newContinueTime) : ();

            // Manual formatting from RFC 3339 to "yyyy-MM-dd HH:mm:ss"
            string formattedPauseTime = pauseTimeStr.substring(0, 10) + " " + pauseTimeStr.substring(11, 19);
            string? formattedContinueTime = continueTimeStr != () ? continueTimeStr.substring(0, 10) + " " + continueTimeStr.substring(11, 19) : ();

            h_PauseContinueDetails pauseContinueDetail = {
                highlight_id: pauseDetail.highlight_id,
                pause_time: formattedPauseTime,
                continue_time: formattedContinueTime
            };

            pauseContinueDetails.push(pauseContinueDetail);
        };

    io:println(pauseContinueDetails);

    return pauseContinueDetails;
}
















}
function formatDateTime(string isodueDateTime) returns string {
    time:Utc utc = checkpanic time:utcFromString(isodueDateTime);
    time:Civil dt = time:utcToCivil(utc);
    return string `${dt.year}-${dt.month}-${dt.day}`;
}

function formatTime(string isoTime) returns string {
    // Construct a full RFC 3339 formatted string with a default date and seconds
    string fullTime = "1970-01-01T" + (isoTime.length() == 5 ? isoTime + ":00Z" : isoTime + "Z");

    // Parse the fullTime string into UTC time
    time:Utc|time:Error utc = time:utcFromString(fullTime);
    if (utc is error) {
        log:printError("Error parsing time string:", utc);
        return "";
    }

    // Convert UTC time to civil time to get hours, minutes, and seconds
    time:Civil dt = time:utcToCivil(<time:Utc>utc);

    // Format the time components into HH:MM:SS format
    return string `${dt.hour}:${dt.minute}:${dt.second ?: 0}`;
}
