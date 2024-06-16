import { loginRequest } from "@/authConfig";
import { useMsal } from "@azure/msal-react";
import { Button } from "@mantine/core";
import { useState } from "react";

function fetchData(accessToken: string) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch("http://localhost:9090/greeting", options)
        .then(response => response.text())
        .catch(error => console.log(error));
}

export default function GetAPIResponse() {

    const { instance, accounts } = useMsal();
    const [response, setResponse] = useState<string>();

    function getData() {
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                fetchData(response.accessToken).then((response) => setResponse(response ?? "No response"));
            });
    }

    return (
        <>
            <Button onClick={getData}>Call API
            </Button>
            <div>
                {response ? <p>{response}</p> : null}
            </div>
        </>
    );
}