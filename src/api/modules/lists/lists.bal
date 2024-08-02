import webapp.backend.http_listener;

service /lists on http_listener:Listener {
    resource function get .() returns string {
        return "lists";
    }
}