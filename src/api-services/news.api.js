import { apiClient, apiClientAuth } from "../config/httpClient";


export function NewsApi(contentType = "application/json")
{
    // const http = apiClient(contentType);
    const https = apiClientAuth(contentType);

    return {

        // findOne: (id) => https.get(`/api/product/${id}`),

        findAll: () => https.get(`/api/news`),

        insert : (data) => https.post("/api/news", data),

        findAllOfUser: () => https.get("/api/news/user"),

        update : (id, data) => https.put(`/api/news/${id}`, data), 

        remove : (id) => https.delete(`/api/news/${id}`), 

        

        like : (newsId) => https.post(`/api/news-like/${newsId}`),
        
        findLiker : (newsId) => https.get(`/api/news-like/${newsId}/users`),

      };
}

