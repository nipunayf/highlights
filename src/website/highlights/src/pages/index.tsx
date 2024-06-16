import GetAPIResponse from "@/components/GetAPIResponse";
import { SignInButton } from "@/components/SignInButton";
import { SignOutButton } from "@/components/SignOutButton";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Space, Title } from "@mantine/core";
import React from "react";


export default function Home() {
    return (
        <>
            <AuthenticatedTemplate>
                <div>
                    You are logged in
                </div>
                <SignOutButton />
                <div>
                    <Space h="lg" />
                    <Title order={1}>API Call</Title>
                    <p>Response will be displayed here</p>
                    <GetAPIResponse />
                </div>
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