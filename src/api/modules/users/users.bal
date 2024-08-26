import webapp.backend.http_listener;
import webapp.backend.storage;

import ballerina/http;
import ballerina/log;

type User record {|
    int id;
    string sub;
    string[] linkedAccounts;
|};

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
service /users on http_listener:Listener {
    private final storage:Client sClient;

    function init() returns error? {
        self.sClient = check new ();
    }

    resource function get .(string sub) returns User|error {
        stream<storage:User, error?> users = self.sClient->/users();
        storage:User[] user = check from var u in users
            where u.sub == sub
            select u;

        if (user.length() == 0) {
            storage:UserInsert newUser = {sub: sub};
            int[] userIds = check self.sClient->/users.post([newUser]);
            storage:User u = check self.sClient->/users/[userIds[0]]();
            return {
                id: u.id,
                sub: u.sub,
                linkedAccounts: []
            };
        }

        int id = user[0].id;

        stream<storage:UserLinkedAccount, error?> userLinkedAccounts = self.sClient->/userlinkedaccounts();
        stream<storage:LinkedAccount, error?> linkedAccounts = self.sClient->/linkedaccounts();

        storage:LinkedAccount[] accounts = check from var ula in userLinkedAccounts
            where ula.userId == id
            join var la in linkedAccounts on ula.linkedaccountId equals la.id
            select la;

        return {
            id: id,
            sub: sub,
            linkedAccounts: accounts.map((account) => account.name)
        };
    }

    resource function get [int id]() returns User|error {
        storage:User user = check self.sClient->/users/[id]();

        stream<storage:UserLinkedAccount, error?> userLinkedAccounts = self.sClient->/userlinkedaccounts();
        stream<storage:LinkedAccount, error?> linkedAccounts = self.sClient->/linkedaccounts();

        storage:LinkedAccount[] accounts = check from var ula in userLinkedAccounts
            where ula.userId == id
            join var la in linkedAccounts on ula.linkedaccountId equals la.id
            select la;

        return {
            id: user.id,
            sub: user.sub,
            linkedAccounts: accounts.map((account) => account.name)
        };
    }

    resource function post .(@http:Payload storage:UserInsert user) returns http:Created|http:Conflict|http:InternalServerError|error {
        do {
            stream<storage:User, error?> users = self.sClient->/users();
            storage:User[] existingUser = check from var u in users
                where u.sub == user.sub
                select u;

            if existingUser.length() == 0 {
                do {
                    _ = check self.sClient->/users.post([user]);
                    return http:CREATED;
                } on fail var e {
                    log:printError("Error occurred while inserting data: ", e);
                    return http:INTERNAL_SERVER_ERROR;
                }
            } else {
                return http:CONFLICT;
            }
        } on fail var e {
            log:printError("Error occurred: ", e);
            return http:INTERNAL_SERVER_ERROR;
        }
    }
}
