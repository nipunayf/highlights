import webapp.backend.lists as _;
import ballerina/http;
import ballerina/io;
import ballerinax/mysql.driver as _;
import ballerina/websocket;
import ballerina/lang.runtime;

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowCredentials: false,
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        maxAge: 84900
    }
}

service / on new websocket:Listener(9091) {

    resource function get .() returns websocket:Service {
        // Accept the WebSocket upgrade by returning a `websocket:Service`.
        return new ChatService();
    }
}


service class ChatService {
    *websocket:Service;

    // This `remote function` is triggered when a new message is received
    // from a client. It accepts `anydata` as the function argument. The received data 
    // will be converted to the data type stated as the function argument.
    remote function onMessage(websocket:Caller caller, string chatMessage) returns error? {
        io:println(chatMessage);
        // Add your logic for handling incoming messages here.
    }

    remote function onOpen(websocket:Caller caller) returns error? {
        io:println("New client connected");
        int count = 0;
        while true {
            json m = {"x": count};
            io:println("sending");
            error? myerror = check caller->writeMessage(m);
            if (myerror is error) {
                io:println("Error sending message");
                // Optionally break the loop if you want to stop on error
                // break;
            }
            count += 1;
            runtime:sleep(1); // Send a message every 1 second
        }
    }
}
