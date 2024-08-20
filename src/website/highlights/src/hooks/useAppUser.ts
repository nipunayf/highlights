import { loginRequest } from "@/authConfig";
import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";

export interface AppUser {
    id?: string;
    displayName?: string;
    sub?: string;
    linkedAccounts?: string[];
}

export function useAppUser() {
    const { instance, accounts } = useMsal();
    const [user, setUser] = useState<AppUser | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAccount = async () => {
            setIsLoading(true);
            if (accounts.length > 0) {
                const account = instance.getActiveAccount();
                if (account && account.idTokenClaims) {
                    setUser({
                        displayName: account.idTokenClaims.name,
                        sub: account.idTokenClaims.sub,
                    });
                } else {
                    try {
                        const silentRequest = {
                            ...loginRequest,
                            account: account!,
                        };
                        await instance.acquireTokenSilent(silentRequest);
                        const updatedAccount = instance.getActiveAccount();
                        setUser({
                            displayName: updatedAccount?.idTokenClaims?.name,
                            sub: updatedAccount?.idTokenClaims?.sub,
                        });
                    } catch (error) {
                        console.error("Error acquiring token:", error);
                        setUser(undefined);
                    }
                }
            } else {
                setUser(undefined);
            }
            setIsLoading(false);
        };

        checkAccount();
    }, [instance, accounts]);

    return { user, isLoading };
}