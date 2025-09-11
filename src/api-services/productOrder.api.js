import { apiClient, apiClientAuth } from "../config/httpClient";


export function ProductOrderApi (contentType = "application/json")
{
    //const http = apiClient(contentType);
    const https = apiClientAuth(contentType);

    return {

        insert : (data) => https.post("/api/product-order", data),

        findAllOfUser : () => https.get(`/api/product-order/user`),

        findAllExternal : () => https.get(`/api/product-order/external`),

        remove : (id) => https.delete(`/api/product-order/${id}`),

        // findOne: (id) => https.get(`/api/message/${id}`),

        // findAll: () => https.get(`/api/message`),


        pay : (orderId, data) => https.post(`/api/payment/${orderId}`, data),


      };
}

