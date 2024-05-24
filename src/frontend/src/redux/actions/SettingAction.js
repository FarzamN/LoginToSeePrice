import { baseUrl } from "../../utils/urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/setting/` }),
  endpoints: (builder) => ({
    AddSettingApi: builder.mutation({
      query: (data) => ({
        url: "addSetting",
        method: "POST",
        body: data,
      }),
    }),
    GetSettingApi: builder.mutation({
      query: () => ({
        url: "getAllSetting",
        method: "GET",
      }),
    }),
    DeleteSettingApi: builder.mutation({
      query: (id) => ({
        url: `deleteSetting/${id}`,
        method: "DELETE",
      }),
    }),
    EditSettingApi: builder.mutation({
      query: (item) => ({
        url: `editSetting/${item.id}`,
        method: "PATCH",
        body: item,
      }),
    }),
  }),
});

export const {
  useAddSettingApiMutation,
  useGetSettingApiMutation,
  useDeleteSettingApiMutation,
  useEditSettingApiMutation,
} = settingApi;
