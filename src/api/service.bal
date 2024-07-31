import ballerina/http;
import ballerina/log;
import ballerina/sql;
import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/io;
import ballerina/lang.'string as strings;

type CreateUser record {|
    string sub;
|};

type User record {|
    int id;
    string sub;
|};

type Task record {|
    string? id = null;
    string title;
    time:Utc? dueDate = null;
|};

type Highlight record {|
    string id;
    string created;
    string title;
    string date;
    string startTime;
    string endTime;
    string notification;
    string priority;
    boolean completed;
    string[] taskIds;
|};

Task[] tasks = [
    {id: "1", title: "Task 1"},
    {id: "2", title: "Task 2"},
    {id: "3", title: "Task 3"}
];

Highlight[] highlights = [
    {
        id: "1",
        created: time:utcToString(time:utcNow()),
        title: "Highlight 1",
        date: time:utcToString(check time:utcFromString("2024-09-01T00:00:00Z")),
        startTime: time:utcToString(check time:utcFromString("2024-09-01T00:00:00Z")),
        endTime: time:utcToString(check time:utcFromString("2024-09-01T00:00:00Z")),
        notification: "0",
        priority: "default",
        completed: false,
        taskIds: ["1", "2"]
    },
    {
        id: "2",
        created: time:utcToString(time:utcNow()),
        title: "Highlight 2",
        date: time:utcToString(check time:utcFromString("2024-09-01T00:00:00Z")),
        startTime: time:utcToString(check time:utcFromString("2024-09-01T00:00:00Z")),
        endTime: time:utcToString(check time:utcFromString("2024-09-01T00:00:00Z")),
        notification: "0",
        priority: "default",
        completed: false,
        taskIds: ["3"]
    }
];

type TaskList record {|
    int id;
    @sql:Column {name: "user_id"}
    int userId;
    string title;
|};

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
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowCredentials: false,
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        maxAge: 84900
    }
}
service / on new http:Listener(9091) {

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

    // resource function get taskLists(string sub) returns TaskList[]|error {
    //     User|sql:Error result = self.db->queryRow(`SELECT * FROM users WHERE sub = ${sub}`);

    //     if result is sql:NoRowsError {
    //         return error("User not found");
    //     }

    //     stream<TaskList, sql:Error?> taskListStream = self.db->query(
    //         `SELECT * FROM task_lists WHERE user_id=(SELECT u.id FROM users AS u WHERE u.sub=${sub});`
    //     );

    //     return from TaskList taskList in taskListStream
    //         select taskList;
    // }

    // resource function get tasks() returns Task[] {
    //     return tasks;
    // }

    resource function post tasks(Task task) returns Task {
        tasks.push({id: (tasks.length() + 1).toString(), title: task.title});
        log:printInfo("Task added");
        return task;
    }

    resource function get highlights() returns Highlight[] {
        return highlights;
    }
    resource function post addTask(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();

        string taskName= (check payload.taskName).toString();
        string progress = (check payload.progress).toString();
        string priority = (check payload.priority).toString();
        // json assignees = check payload.assignees;
        // string assigneesJson = assignees.toString();
        string startDate = (check payload.startDate).toString();
        string dueDate = (check payload.dueDate).toString();
        int projectId= (check payload.projectId);

        sql:ParameterizedQuery insertQuery = `INSERT INTO taskss (taskName,progress, priority, startDate, dueDate,projectId) VALUES (${taskName},${progress}, ${priority}, ${startDate}, ${dueDate},${projectId})`;
        _ = check self.db->execute(insertQuery);

        sql:ParameterizedQuery selectQuery = `SELECT taskName,progress, priority,  startDate, dueDate FROM taskss`;
        stream<record {| anydata...; |}, sql:Error?> resultStream = self.db->query(selectQuery);

        json[] resultJsonArray = [];
        check from record {| anydata...; |} row in resultStream
            do {
                resultJsonArray.push(row.toJson());
            };

        json response = { projects: resultJsonArray};
        http:Response res = new;
        res.setPayload(response);
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        check caller->respond(res);

        return;
    }

    // Handle preflight OPTIONS request for CORS
    resource function options addTask(http:Caller caller, http:Request req) returns error? {
        http:Response response = new;
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        check caller->respond(response);

        return;
    }

    resource function post addProjects(http:Caller caller, http:Request req) returns error? {

        io:println("ccc");
        json payload = check req.getJsonPayload();

        string projectName= (check payload.projectName).toString();
        string progress = (check payload.progress).toString();
        string priority = (check payload.priority).toString();
        // json assignees = check payload.assignees;
        // string assigneesJson = assignees.toString();
        string startDate = (check payload.startDate).toString();
        string dueDate = (check payload.dueDate).toString();

        sql:ParameterizedQuery insertQuery = `INSERT INTO projects (projectName,progress, priority, startDate, dueDate) VALUES (${projectName},${progress}, ${priority}, ${startDate}, ${dueDate})`;
        _ = check self.db->execute(insertQuery);

        sql:ParameterizedQuery selectQuery = `SELECT id,projectName,progress, priority,  startDate, dueDate FROM projects`;
        stream<record {| anydata...; |}, sql:Error?> resultStream = self.db->query(selectQuery);

        json[] resultJsonArray = [];
        check from record {| anydata...; |} row in resultStream
            do {
                resultJsonArray.push(row.toJson());
            };

        json response = { projects: resultJsonArray};
        http:Response res = new;
        res.setPayload(response);
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        check caller->respond(res);

        return;
    }

    // Handle preflight OPTIONS request for CORS
    resource function options addProjects(http:Caller caller, http:Request req) returns error? {
        http:Response response = new;
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        check caller->respond(response);

        return;
    }

    /////////////////////////////////////////////////////////
    resource function get projects(http:Caller caller, http:Request req) returns error? {
        
        sql:ParameterizedQuery selectQuery = `SELECT id,projectName,progress, priority,  startDate, dueDate FROM projects`;
        stream<record {| anydata...; |}, sql:Error?> resultStream = self.db->query(selectQuery);

        json[] resultJsonArray = [];
        check from record {| anydata...; |} row in resultStream
            do {
                resultJsonArray.push(row.toJson());
            };
        io:println("totl projects",resultJsonArray);

        json response = { projects: resultJsonArray};
        http:Response res = new;
        res.setPayload(response);
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        check caller->respond(res);

        return;
    }

    // Handle preflight OPTIONS request for CORS
    resource function options projects(http:Caller caller, http:Request req) returns error? {
        http:Response response = new;
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        check caller->respond(response);

        return;
    }

      // New resource function to update project details
    resource function put updateProject(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();

        int projectId = check payload.id;
        string projectName = (check payload.projectName).toString();
        string progress = (check payload.progress).toString();
        string priority = (check payload.priority).toString();
        // time:Utc startDate = time:format(payload.startDate, "yyyy-MM-dd");
        // time:Utc dueDate = (check payload.dueDate);
        // string startDateStr = time:format(payload.startDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
          int? indexOfT = strings:indexOf(check payload.startDate, "T");

        // Extract the date part (before 'T')
        string startDate = strings:substring(check payload.startDate, 0, <int>indexOfT);

            int? indexOfT2 = strings:indexOf(check payload.dueDate, "T");

        // Extract the date part (before 'T')
        string dueDate = strings:substring(check payload.dueDate, 0, <int>indexOfT2);

    

        // string startDate =(check payload.startDate).toString();
        // string dueDate =(check payload.startDate).toString();
        io:println("Formatted Due Date: ", payload.startDate);
        // time:Utc dateTime = check time:parse(dateTimeString, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        

        sql:ParameterizedQuery updateQuery = `UPDATE projects SET projectName = ${projectName}, progress = ${progress}, priority = ${priority},startDate=${startDate},dueDate=${dueDate}   WHERE id = ${projectId}`;
        _ = check self.db->execute(updateQuery);

        json response = { message: "Project updated successfully" };
        http:Response res = new;
        res.setPayload(response);
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        check caller->respond(res);

        return;
    }

    // Handle preflight OPTIONS request for CORS
    resource function options updateProject(http:Caller caller, http:Request req) returns error? {
        http:Response response = new;
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "PUT, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        check caller->respond(response);

        return;
    }

    // New resource function to get details of a specific project based on project id
    resource function get project/[int projectId](http:Caller caller, http:Request req) returns error? {
        // Prepare the SQL query to select project details by ID
        sql:ParameterizedQuery selectQuery = `SELECT id, projectName, progress, priority, startDate, dueDate FROM projects WHERE id = ${projectId}`;

        // Execute the query and get the result stream
        stream<record {| anydata...; |}, sql:Error?> resultStream =  self.db->query(selectQuery);

        // Variables to hold project details and response
        record {| anydata...; |}? projectDetails;
        json response;

        // Iterate through the result stream
       
        projectDetails = check resultStream.next();
        // if (projectDetails is record {| anydata...; |}) {
        //     response = resultStream.toJson();
        //     break; // Found the project, exit the loop
        // }
        // json[] resultJsonArray = [];
        // check from record {| anydata...; |} row in resultStream
        //     do {
        //        response.push(row.toJson());
        //     };
         response = projectDetails.toJson();

        // If projectDetails is still empty, project not found
        // if (projectDetails == ()) {
        //     response.push( "Project not found" );
        // }
        io:println(resultStream);
        io:println(response);
        io:println(projectId);
        io:println(projectDetails);

        // Create and set HTTP response
        http:Response res = new;
        res.setPayload(response);
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        check caller->respond(res);

        return;
    }

    // Handle preflight OPTIONS request for CORS
    resource function options project/[int projectId](http:Caller caller, http:Request req) returns error? {
        http:Response response = new;
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        check caller->respond(response);

        return;
    }

    resource function put updateTask(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();

        int projectId = <int>check payload.projectId;
        string taskName = (check payload.taskName).toString();
        string progress = (check payload.progress).toString();
        string priority = (check payload.priority).toString();

          int? indexOfT = strings:indexOf(check payload.startDate, "T");

        // Extract the date part (before 'T')
        string startDate = strings:substring(check payload.startDate, 0, <int>indexOfT);

            int? indexOfT2 = strings:indexOf(check payload.dueDate, "T");

        // Extract the date part (before 'T')
        string dueDate = strings:substring(check payload.dueDate, 0, <int>indexOfT2);

        io:println("Formatted Due Date: ", payload.startDate);

        sql:ParameterizedQuery updateQuery = `UPDATE taskss SET taskName = ${taskName}, progress = ${progress}, priority = ${priority},startDate=${startDate},dueDate=${dueDate}   WHERE taskName = ${taskName} AND projectId=${projectId}`;
        _ = check self.db->execute(updateQuery);

        json response = { message: "Task updated successfully" };
        http:Response res = new;
        res.setPayload(response);
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        check caller->respond(res);

        return;
    }

    // Handle preflight OPTIONS request for CORS
    resource function options updateTask(http:Caller caller, http:Request req) returns error? {
        http:Response response = new;
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "PUT, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        check caller->respond(response);

        return;
    }
        resource function get tasks/[int projectId](http:Caller caller, http:Request req) returns error? {
        
        sql:ParameterizedQuery selectQuery = `SELECT projectId,taskName,progress, priority,  startDate, dueDate FROM taskss WHERE projectId=${projectId}`;
        stream<record {| anydata...; |}, sql:Error?> resultStream = self.db->query(selectQuery);

        json[] resultJsonArray = [];
        check from record {| anydata...; |} row in resultStream
            do {
                resultJsonArray.push(row.toJson());
            };
        io:println("totl projects",resultJsonArray);

        json response = { projects: resultJsonArray};
        http:Response res = new;
        res.setPayload(response);
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        check caller->respond(res);

        return;
    }

    // Handle preflight OPTIONS request for CORS
    resource function options tasks/[int projectId](http:Caller caller, http:Request req) returns error? {
        http:Response response = new;
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        check caller->respond(response);

        return;
    }
}
