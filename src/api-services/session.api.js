import { apiClient, apiClientAuth } from "../config/httpClient";


export function SessionApi(contentType = "application/json")
{
    // const http = apiClient(contentType);
    const https = apiClientAuth(contentType);

    return {

        findOne: (id) => https.get(`/api/session/${id}`),

        findAll: () => https.get(`/api/session`),

        insert : (data) => https.post("/api/session", data),

        findAllOfUser: () => https.get("/api/session/user"),

        update : (id, data) => https.put(`/api/session/${id}`, data), 

        remove : (id) => https.delete(`/api/session/${id}`), 

        findHistoric: () => https.get(`/api/session/historic`),

        

        like : (sessionId) => https.post(`/api/session-like/${sessionId}`),
        
        findLiker : (sessionId) => https.get(`/api/session-like/${sessionId}/users`),

      };
}

