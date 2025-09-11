import { apiClient, apiClientAuth } from "../config/httpClient";


export function DiscussionApi(contentType = "application/json")
{
    // const http = apiClient(contentType);
    const https = apiClientAuth(contentType);

    return {

        findAll: (sessionId) => https.get(`/api/discussion/${sessionId}`),

        insert : (sessionId, data) => https.post(`/api/discussion/${sessionId}`, data),

        findAllParticipants: (sessionId) => https.get(`/api/discussion/${sessionId}/participants`),

        remove : (id) => https.delete(`/api/discussion/${id}`),   

    
      };
}

