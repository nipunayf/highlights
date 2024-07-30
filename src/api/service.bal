import ballerina/http;
import ballerina/log;
import ballerina/sql;
import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/io;
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

// type SubTask record {|
//     int id;
//     string title;
//     string description;
//     string? dueDate;
//     string? startTime;
//     string? endTime;
//     string? reminder;
//     string priority;
//     int parentTaskId;
// |};


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

// type CreateSubTask record {|
//     string title;
//     string description;
//     string? dueDate;
//     string? startTime;
//     string? endTime;
//     string? reminder;
//     string priority;
//     int parentTaskId;
// |};





Task[] tasks = [
    
];

// listener http:Listener securedEP = new (9090);

// Define the configuration variables
configurable string azureAdIssuer = ?;
configurable string azureAdAudience = ?;

@http:ServiceConfig {
    // auth: [
    //     {
    //         jwtValidatorConfig: {
    //             issuer: azureAdIssuer,
    //             audience: azureAdAudience,
    //             scopeKey: "scp"
    //         },
    //         scopes: ["User.Read"]
    //     }
    // ],
    // auth: [
    //     {
    //         jwtValidatorConfig: {
    //             issuer: azureAdIssuer,
    //             audience: azureAdAudience,
    //             scopeKey: "scp"
    //         },
    //         scopes: ["User.Read"]
    //     }
    // ],
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowCredentials: false,
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        maxAge: 84900
    }
}
service / on new http:Listener(9092) {

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
        check caller->respond(http:STATUS_INTERNAL_SERVER_ERROR);}

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


//      resource function post subtasks(http:Caller caller, http:Request req) returns error? {
//         json|http:ClientError payload = req.getJsonPayload();
//         if payload is http:ClientError {
//             log:printError("Error while parsing request payload", 'error = payload);
//             check caller->respond(http:STATUS_BAD_REQUEST);
//             return;
//         }
// io:println(payload);
//         CreateSubTask|error subTask = payload.cloneWithType(CreateSubTask);
//         if subTask is error {
//             log:printError("Error while converting JSON to SubTask", 'error = subTask);
//             check caller->respond(http:STATUS_BAD_REQUEST);
//             return;
//         }

//         // Convert ISO 8601 date to MySQL compatible date format
//         string Date = subTask.dueDate != () ? formatDateTime(subTask.dueDate.toString()) : "";
//         string startTime = subTask.startTime != () ? formatTime(subTask.startTime.toString()) : "";
//         string endTime = subTask.endTime != () ? formatTime(subTask.endTime.toString()) : "";

//         sql:ExecutionResult|sql:Error result = self.db->execute(`
//             INSERT INTO his (title, dueDate, startTime, endTime, reminder, priority, description, parentTaskId) 
//             VALUES (${subTask.title}, ${Date}, ${startTime}, ${endTime}, ${subTask.reminder}, ${subTask.priority}, ${subTask.description}, ${subTask.parentTaskId});
//         `);

//         if result is sql:Error {
//             log:printError("Error occurred while inserting subtask", 'error = result);
//             check caller->respond(http:STATUS_INTERNAL_SERVER_ERROR);
//         } else {
//             check caller->respond(http:STATUS_CREATED);
//         }
//     }


   
    
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
    time:Civil dt = time:utcToCivil(<time:Utc> utc);
    
    // Format the time components into HH:MM:SS format
    return string `${dt.hour}:${dt.minute}:${dt.second ?: 0}`;
}
