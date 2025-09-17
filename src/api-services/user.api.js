import { apiClient, apiClientAuth } from "../config/httpClient";


export function UserApi(contentType = "application/json")
{
    // const http = apiClient(contentType);
    const https = apiClientAuth(contentType);

    return {

        // insert : (data) => http.post("/api/message", data),

        findOne: () => https.get(`/api/user`, { withCredentials: true }),

        updateOne: (data) => https.put(`/api/user`, data)


      };
}

