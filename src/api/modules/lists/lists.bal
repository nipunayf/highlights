import webapp.backend.http_listener;
import webapp.backend.storage;

service /lists on http_listener:Listener {
    private final storage:Client sClient;

    function init() returns error? {
        self.sClient = check new ();
    }

    resource function get .(int uid) returns storage:TaskList[]|error {
        storage:User user = check self.sClient->/users/[uid];
        stream<storage:TaskList, error?> taskListStream = self.sClient->/tasklists;
        return from storage:TaskList taskList in taskListStream
            where taskList.userId == user.id
            select taskList;
    }
}
