import { SignInButton } from "@/components/SignInButton";
import { SignOutButton } from "@/components/SignOutButton";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import React from "react";


export default function Home() {
    return (
        <>
            <AuthenticatedTemplate>
                <div>
                    You are logged in
                </div>
                <SignOutButton />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <div>
                    You are not logged in
                </div>
                <SignInButton />
            </UnauthenticatedTemplate>
        </>
    );
}