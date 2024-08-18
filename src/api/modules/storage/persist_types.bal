// AUTO-GENERATED FILE. DO NOT MODIFY.

// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.

public type User record {|
    readonly int id;
    string sub;

|};

public type UserOptionalized record {|
    int id?;
    string sub?;
|};

public type UserWithRelations record {|
    *UserOptionalized;
    TaskListOptionalized[] tasklist?;
|};

public type UserTargetType typedesc<UserWithRelations>;

public type UserInsert record {|
    string sub;
|};

public type UserUpdate record {|
    string sub?;
|};

public type TaskList record {|
    readonly int id;
    int userId;
    string title;

|};

public type TaskListOptionalized record {|
    int id?;
    int userId?;
    string title?;
|};

public type TaskListWithRelations record {|
    *TaskListOptionalized;
    UserOptionalized user?;
    TaskOptionalized[] task?;
|};

public type TaskListTargetType typedesc<TaskListWithRelations>;

public type TaskListInsert record {|
    int userId;
    string title;
|};

public type TaskListUpdate record {|
    int userId?;
    string title?;
|};

public type Task record {|
    readonly int id;
    int tasklistId;
    string title;
    string description;
    string? dueDate;
    string? startTime;
    string? endTime;
    string? reminder;
    string priority;
    string label;
    string status;
|};

public type TaskOptionalized record {|
    int id?;
    int tasklistId?;
    string title?;
    string description?;
    string? dueDate?;
    string? startTime?;
    string? endTime?;
    string? reminder?;
    string priority?;
    string label?;
    string status?;
|};

public type TaskWithRelations record {|
    *TaskOptionalized;
    TaskListOptionalized taskList?;
|};

public type TaskTargetType typedesc<TaskWithRelations>;

public type TaskInsert record {|
    int tasklistId;
    string title;
    string description;
    string? dueDate;
    string? startTime;
    string? endTime;
    string? reminder;
    string priority;
    string label;
    string status;
|};

public type TaskUpdate record {|
    int tasklistId?;
    string title?;
    string description?;
    string? dueDate?;
    string? startTime?;
    string? endTime?;
    string? reminder?;
    string priority?;
    string label?;
    string status?;
|};

