import ballerina/http;
import ballerina/log;
import ballerina/sql;
import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

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

    resource function get tasks() returns Task[] {
        return tasks;
    }

    resource function post tasks(Task task) returns Task {
        tasks.push({id: (tasks.length() + 1).toString(), title: task.title});
        log:printInfo("Task added");
        return task;
    }

    resource function get highlights() returns Highlight[] {
        return highlights;
    }
}
