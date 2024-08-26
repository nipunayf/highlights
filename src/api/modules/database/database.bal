import ballerinax/mysql;

public final mysql:Client Client = check new ("localhost", "root", "root", "highlights", 3306);
