import { AppUser } from "@/hooks/useAppUser";
import { apiSlice } from "../api/apiSlice";

export const apiSliceWithUsers = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query<AppUser, string>({
            query: sub => `/users?sub=${sub}`
        })
    })
});

export const { useGetUserQuery } = apiSliceWithUsers;