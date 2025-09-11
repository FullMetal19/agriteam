import { apiClient, apiClientAuth } from "../config/httpClient";


export function ProductApi(contentType = "application/json")
{
    // const http = apiClient(contentType);
    const https = apiClientAuth(contentType);

    return {

        findOne: (id) => https.get(`/api/product/${id}`),

        findAll: () => https.get(`/api/product`),

        insert : (data) => https.post("/api/product", data),

        findAllOfUser: () => https.get("/api/product/user"),

        update : (id, data) => https.put(`/api/product/${id}`, data), 

        remove : (id) => https.delete(`/api/product/${id}`), 

        

        like : (productId) => https.post(`/api/product-like/${productId}`),
        findLiker : (productId) => https.get(`/api/product-like/${productId}/users`),

      };
}

