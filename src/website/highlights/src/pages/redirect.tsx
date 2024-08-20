import { useMsal } from "@azure/msal-react";

export default async function Redirect() {
    const {instance} = useMsal();
    await instance.handleRedirectPromise();
    return;
}