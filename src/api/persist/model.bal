import ballerina/persist as _;
import ballerina/time;
import ballerinax/persist.sql;

type User record {|
    @sql:Generated
    readonly int id;
    string sub;
    TaskList[] tasklist;
|};

type TaskList record {|
    @sql:Generated
    readonly int id;
    User user;
    string title;
    time:Civil createdAt;
    Task[] task;
|};

type Task record {|
    @sql:Generated
    readonly int id;
    TaskList taskList;
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

// type h_Highlight record {|
//     int highlight_id;
//     string highlight_name;
//     int user_id;
// |};

// type h_TimerDetails record {|
//     int timer_id;
//     string timer_name;
//     time:TimeOfDay? pomo_duration;
//     time:TimeOfDay? short_break_duration;
//     time:TimeOfDay? long_break_duration;
//     int pomos_per_long_break;
//     int user_id;
// |};

// // type HighlightPomoDetails record {
// //     int timer_id;
// //     int highlight_id;
// //     int user_id;
// //     time:Utc start_time;
// //     time:Utc end_time;
// //     string status;
// // };

// // Intermediate record type for deserialization
// // type h_HighlightPomoDetailsTemp record {
// //     int timer_id;
// //     int highlight_id;
// //     int user_id;
// //     string start_time;
// //     string end_time;
// //     string status;
// // };

// type h_HighlightPomoStartDetails record {|
//     int timer_id;
//     int highlight_id;
//     int user_id;
//     time:Utc start_time;
//     string status;
// |};

// // Intermediate record type for deserialization
// type h_HighlightPomoStartDetailsTemp record {|
//     int timer_id;
//     int highlight_id;
//     int user_id;
//     string start_time;
//     string status;
// |};

// type h_HighlightPomoEndDetails record {|
//     int pomo_id;
//     int timer_id;
//     int highlight_id;
//     int user_id;
//     time:Utc end_time;
//     string status;
// |};

// // Intermediate record type for deserialization
// type h_HighlightPomoEndDetailsTemp record {|
//     int pomo_id;
//     int timer_id;
//     int highlight_id;
//     int user_id;
//     string end_time;
//     string status;
// |};

// type h_HighlightStopwatchEndDetails record {|
//     int stopwatch_id;
//     int timer_id;
//     int highlight_id;
//     int user_id;
//     time:Utc end_time;
//     string status;
// |};

// // Intermediate record type for deserialization
// type h_HighlightStopwatchEndDetailsTemp record {|
//     int stopwatch_id;
//     int timer_id;
//     int highlight_id;
//     int user_id;
//     string end_time;
//     string status;
// |};

// type PausesDetails record {|
//     int pomo_id;
//     int highlight_id;
//     string pause_time;
//     // string continue_time;
// |};

// type PausesDetailsTemp record {|
//     int pomo_id;
//     int highlight_id;
//     string pause_time;
//     // string continue_time;
// |};
// type h_stopwatch_PausesDetails record {|
//     int stopwatch_id;
//     int highlight_id;
//     string pause_time;
//     // string continue_time;
// |};

// type h_stopwatch_PausesDetailsTemp record {|
//     int stopwatch_id;
//     int highlight_id;
//     string pause_time;
//     // string continue_time;
// |};

// type ContinueDetails record {|
//     int pomo_id;
//     int highlight_id;
//     // string pause_time;
//     string continue_time;
// |};

// type ContinueDetailsTemp record {|
//     int pomo_id;
//     int highlight_id;
//     // string pause_time;
//     string continue_time;
// |};
// type h_stopwatch_ContinueDetails record {|
//     int stopwatch_id;
//     int highlight_id;
//     // string pause_time;
//     string continue_time;
// |};

// type h_stopwatch_ContinueDetailsTemp record {|
//     int stopwatch_id;
//     int highlight_id;
//     // string pause_time;
//     string continue_time;
// |};

// type h_HighlightStopwatchStartDetails record {|
//     int timer_id;
//     int highlight_id;
//     int user_id;
//     time:Utc start_time;
//     string status;
// |};

// // Intermediate record type for deserialization
// type h_HighlightStopwatchStartDetailsTemp record {|
//     int timer_id;
//     int highlight_id;
//     int user_id;
//     string start_time;
//     string status;
// |};

// type TimeRecord record {|
//     int pomo_id;
//     int highlight_id;
//     string highlight_name;
//     string start_time;
//     string end_time;
//     string[][] pause_and_continue_times;
// |};
// type h_StopwatchTimeRecord record {|
//     int stopwatch_id;
//     int highlight_id;
//     string highlight_name;
//     string start_time;
//     string end_time;
//     string[][] pause_and_continue_times;
// |};

// type FocusRecord record {|
//     string highlight_id;
//     time:TimeOfDay start_time;
//     time:TimeOfDay end_time;
// |};

// type PauseContinueDetails record {|
//     string highlight_id;
//     time:TimeOfDay pause_time;
//     time:TimeOfDay continue_time;
// |};

// type FocusSummary record {|
//     FocusRecord focusRecord;
//     PauseContinueDetails[] pauseContinueDetails;
// |};

// type PauseContinueRecord record {|
//     string pause_time;
//     string continue_time?;
// |};

// // Define a record to hold the highlight details
// type HighlightRecord record {|
//     int highlight_id;
//     string start_time;
//     string end_time;
//     PauseContinueRecord[] pause_and_continue_times;
// |};

// type h_PauseContinueDetails record {|
//     int pomo_id;
//     int highlight_id;
//     string pause_time;
//     string? continue_time;
// |};

// type h_Stopwatch_PauseContinueDetails record {|
//     int stopwatch_id;
//     int highlight_id;
//     string pause_time;
//     string? continue_time;
// |};

// type h_ActiveHighlightDetails record {|
//     int pomo_id;
//     int highlight_id;
// |};

// type h_ActiveStopwatchDetails record {|
//     int stopwatch_id;
//     int highlight_id;
// |};

// type DailyTip record {|
//     int id;
//     string label;
//     string tip;
//     // time:Date date;
// |};
