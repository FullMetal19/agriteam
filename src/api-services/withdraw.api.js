import { apiClient, apiClientAuth } from "../config/httpClient";


export function WithdrawApi (contentType = "application/json")
{
    //const http = apiClient(contentType);
    const https = apiClientAuth(contentType);

    return {

        //insert : (data) => https.post("/api/product-order", data),

        // findAllOfUser : () => https.get(`/api/product-order/user`),

        // findAllExternal : () => https.get(`/api/product-order/external`),

        // remove : (id) => https.delete(`/api/product-order/${id}`),

        getBalance: () => https.get(`/api/balance`),

        
        findAll: () => https.get(`/api/withdraw`),

        doWithdraw: (data) => https.post(`/api/withdraw`, data),


      };
}

