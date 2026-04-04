import { LoginResponse, PartnerDocs, VerifyDocsPayload, } from "@/Types/types";
import axios from "axios";


export async function loginAPI(email: string): Promise<LoginResponse> {
  const res = await axios.post(
    "http://localhost:3000/api/super-admin/signin",
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}


export async function logoutAPI() {
  const res = await axios.get(
    "http://localhost:3000/api/super-admin/logout",
    {
      withCredentials: true,
    }
  );

  return res.data;
}



export async function getPartnersAPI() {
  const res = await axios.get(
    "https://textiles-hamburg-making-rivers.trycloudflare.com/api/v1/super-admin/partners",
    {
      headers: {
        "X-Super-Admin-API-Key": "123",
      },
    }
  );

  return res.data;
}



interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const fetchPartnerDocs = async (partnerId: string): Promise<PartnerDocs> => {
  const res = await axios.post<ApiResponse<PartnerDocs>>(
    "https://textiles-hamburg-making-rivers.trycloudflare.com/api/v1/super-admin/partner/documents",
    { partner_id: partnerId },
    {
      headers: {
        "X-Super-Admin-API-Key": "123",
      },
    }
  );

  // res.data is ApiResponse<PartnerDocs>, so res.data.data is PartnerDocs
  return res.data.data;
};





export const verifyPartnerDocsAPI = async (
  partnerId: string,
  payload: VerifyDocsPayload
) => {
  const res = await axios.patch(
    "https://textiles-hamburg-making-rivers.trycloudflare.com/api/v1/super-admin/partner/documents/status",
    {
      partner_id: partnerId,
      ...payload,
      status: Object.values(payload).every((v) => v === "verified")
        ? "verified"
        : "pending",
    },
    {
      headers: {
        "X-Super-Admin-API-Key": "123",
      },
    }
  );

  return res.data;
};




export const getDriverStatusCountAPI = async () => {
  const res = await axios.get(
    "https://textiles-hamburg-making-rivers.trycloudflare.com/api/v1/super-admin/partner/status/count"
  );

  return res.data.data;
};



export const fetchDriversAPI = async () => {
  const res = await axios.get(
    "https://textiles-hamburg-making-rivers.trycloudflare.com/api/v1/super-admin/partners/all"
  );

  return res.data?.data || [];
};



export const toggleDriverStatusAPI = async (payload: {
  partnerId: string;
  isActive: boolean;
}) => {
  const res = await axios.post(
    "https://textiles-hamburg-making-rivers.trycloudflare.com/api/v1/super-admin/partner/toggle/isactive",
    payload
  );

  return res.data.data;
};



const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNzJlZTgwOC1jMmVlLTQxOTEtYTZkOC0zZGQyNjU2MjMyN2QiLCJtb2JpbGUiOiI5MzU5MjQwMDAwIiwidHlwZSI6InVzZXIiLCJpYXQiOjE3NzUyOTYzMjMsImV4cCI6MTc3NTI5OTkyM30.of5am4-_KDij8PglpKda5PkEADJ8aZNS6mZTuwGwm3M";

export const fetchPaymentsAPI = async () => {
  const res = await axios.get(
    "http://192.168.1.14:3000/api/v1/admin/payment-history",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data.data;
};