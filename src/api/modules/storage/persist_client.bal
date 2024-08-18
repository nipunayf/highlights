// AUTO-GENERATED FILE. DO NOT MODIFY.

// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.

import ballerina/jballerina.java;
import ballerina/persist;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerinax/persist.sql as psql;

const USER = "users";
const TASK_LIST = "tasklists";
const TASK = "tasks";

public isolated client class Client {
    *persist:AbstractPersistClient;

    private final mysql:Client dbClient;

    private final map<psql:SQLClient> persistClients;

    private final record {|psql:SQLMetadata...;|} & readonly metadata = {
        [USER]: {
            entityName: "User",
            tableName: "User",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                sub: {columnName: "sub"},
                "tasklist[].id": {relation: {entityName: "tasklist", refField: "id"}},
                "tasklist[].userId": {relation: {entityName: "tasklist", refField: "userId"}},
                "tasklist[].title": {relation: {entityName: "tasklist", refField: "title"}}
            },
            keyFields: ["id"],
            joinMetadata: {tasklist: {entity: TaskList, fieldName: "tasklist", refTable: "TaskList", refColumns: ["userId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}}
        },
        [TASK_LIST]: {
            entityName: "TaskList",
            tableName: "TaskList",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                userId: {columnName: "userId"},
                title: {columnName: "title"},
                "user.id": {relation: {entityName: "user", refField: "id"}},
                "user.sub": {relation: {entityName: "user", refField: "sub"}},
                "task[].id": {relation: {entityName: "task", refField: "id"}},
                "task[].tasklistId": {relation: {entityName: "task", refField: "tasklistId"}},
                "task[].title": {relation: {entityName: "task", refField: "title"}},
                "task[].description": {relation: {entityName: "task", refField: "description"}},
                "task[].dueDate": {relation: {entityName: "task", refField: "dueDate"}},
                "task[].startTime": {relation: {entityName: "task", refField: "startTime"}},
                "task[].endTime": {relation: {entityName: "task", refField: "endTime"}},
                "task[].reminder": {relation: {entityName: "task", refField: "reminder"}},
                "task[].priority": {relation: {entityName: "task", refField: "priority"}},
                "task[].label": {relation: {entityName: "task", refField: "label"}},
                "task[].status": {relation: {entityName: "task", refField: "status"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                user: {entity: User, fieldName: "user", refTable: "User", refColumns: ["id"], joinColumns: ["userId"], 'type: psql:ONE_TO_MANY},
                task: {entity: Task, fieldName: "task", refTable: "Task", refColumns: ["tasklistId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}
            }
        },
        [TASK]: {
            entityName: "Task",
            tableName: "Task",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                tasklistId: {columnName: "tasklistId"},
                title: {columnName: "title"},
                description: {columnName: "description"},
                dueDate: {columnName: "dueDate"},
                startTime: {columnName: "startTime"},
                endTime: {columnName: "endTime"},
                reminder: {columnName: "reminder"},
                priority: {columnName: "priority"},
                label: {columnName: "label"},
                status: {columnName: "status"},
                "taskList.id": {relation: {entityName: "taskList", refField: "id"}},
                "taskList.userId": {relation: {entityName: "taskList", refField: "userId"}},
                "taskList.title": {relation: {entityName: "taskList", refField: "title"}}
            },
            keyFields: ["id"],
            joinMetadata: {taskList: {entity: TaskList, fieldName: "taskList", refTable: "TaskList", refColumns: ["id"], joinColumns: ["tasklistId"], 'type: psql:ONE_TO_MANY}}
        }
    };

    public isolated function init() returns persist:Error? {
        mysql:Client|error dbClient = new (host = host, user = user, password = password, database = database, port = port, options = connectionOptions);
        if dbClient is error {
            return <persist:Error>error(dbClient.message());
        }
        self.dbClient = dbClient;
        self.persistClients = {
            [USER]: check new (dbClient, self.metadata.get(USER), psql:MYSQL_SPECIFICS),
            [TASK_LIST]: check new (dbClient, self.metadata.get(TASK_LIST), psql:MYSQL_SPECIFICS),
            [TASK]: check new (dbClient, self.metadata.get(TASK), psql:MYSQL_SPECIFICS)
        };
    }

    isolated resource function get users(UserTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get users/[int id](UserTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post users(UserInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put users/[int id](UserUpdate value) returns User|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/users/[id].get();
    }

    isolated resource function delete users/[int id]() returns User|persist:Error {
        User result = check self->/users/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get tasklists(TaskListTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get tasklists/[int id](TaskListTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post tasklists(TaskListInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(TASK_LIST);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put tasklists/[int id](TaskListUpdate value) returns TaskList|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(TASK_LIST);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/tasklists/[id].get();
    }

    isolated resource function delete tasklists/[int id]() returns TaskList|persist:Error {
        TaskList result = check self->/tasklists/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(TASK_LIST);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get tasks(TaskTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get tasks/[int id](TaskTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post tasks(TaskInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(TASK);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put tasks/[int id](TaskUpdate value) returns Task|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(TASK);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/tasks/[id].get();
    }

    isolated resource function delete tasks/[int id]() returns Task|persist:Error {
        Task result = check self->/tasks/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(TASK);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    remote isolated function queryNativeSQL(sql:ParameterizedQuery sqlQuery, typedesc<record {}> rowType = <>) returns stream<rowType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor"
    } external;

    remote isolated function executeNativeSQL(sql:ParameterizedQuery sqlQuery) returns psql:ExecutionResult|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor"
    } external;

    public isolated function close() returns persist:Error? {
        error? result = self.dbClient.close();
        if result is error {
            return <persist:Error>error(result.message());
        }
        return result;
    }
}

