import ballerina/http;
import ballerina/log;
import ballerina/sql;
import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/io;

type Greeting record {|
    string greeting;
|};

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
    int highlight_id;
    string highlight_name;
    int user_id;
|};

type TimerDetails record {|
    int timer_id;
    string timer_name;
    time:TimeOfDay? pomo_duration;
    time:TimeOfDay? short_break_duration;
    time:TimeOfDay? long_break_duration;
    int pomos_per_long_break;
    int user_id;
|};


type HighlightPomoDetails record {|
    int timer_id;
    string highlight_id;
    time:TimeOfDay pomo_duration;
    time:TimeOfDay short_break_duration;
    time:TimeOfDay long_break_duration;
    int pomos_per_long_break;
    int user_id;
|};



Task[] tasks = [
    {id: "1", title: "Task 1"},
    {id: "2", title: "Task 2"},
    {id: "3", title: "Task 3"}
];



// Define the configuration variables
configurable string azureAdIssuer = ?;
configurable string azureAdAudience = ?;

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

    resource function get greeting(string? name) returns Greeting {
        string greetingStr = string `Hello, ${name == () ? "visitor" : name}!`;
        Greeting greeting = {greeting: greetingStr};
        return greeting;
    }

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

    resource function get tasks() returns Task[] {
        return tasks;
    }

    resource function post tasks(Task task) returns Task {
        tasks.push({id: (tasks.length() + 1).toString(), title: task.title});
        log:printInfo("Task added");
        return task;
    }


    resource function get timer_details() returns TimerDetails[]|error {

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

        TimerDetails[] timerDetailsList = [];

        // Iterate over the results
        check from var timerDetail in resultStream
            do {
                log:printInfo("Retrieved TimerDetail: " + timerDetail.toString());
                timerDetailsList.push({
                    timer_id: timerDetail.timer_id,
                    timer_name: timerDetail.timer_name,
                    pomo_duration: timerDetail.pomo_duration,
                    short_break_duration: timerDetail.short_break_duration,
                    long_break_duration: timerDetail.long_break_duration,
                    pomos_per_long_break: timerDetail.pomos_per_long_break,
                    user_id: timerDetail.user_id
                });
            };
        
        io:println(timerDetailsList);

        return timerDetailsList;
    }



    // Function to get highlights from the database
        resource function get highlights() returns Highlight[]|error {

            sql:ParameterizedQuery sqlQuery = `SELECT highlight_id, highlight_name, user_id FROM hilights_hasintha`;

            // Execute the query and retrieve the results
            stream<record {| 
                int highlight_id; 
                string highlight_name; 
                int user_id; 
            |}, sql:Error?> resultStream = self.db->query(sqlQuery);

            Highlight[] highlightList = [];

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


    resource function post add_pomo_details() returns  PomoDetails{


        sql:ParameterizedQuery sqlQuery = ;


        
    }


}
