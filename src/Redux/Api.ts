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
    "https://elliott-hewlett-picks-dave.trycloudflare.com/api/v1/super-admin/partners",
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
    "https://elliott-hewlett-picks-dave.trycloudflare.com/api/v1/super-admin/partner/documents",
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
    "https://elliott-hewlett-picks-dave.trycloudflare.com/api/v1/super-admin/partner/documents/status",
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
    "https://bar-lawyer-owned-brilliant.trycloudflare.com/api/v1/super-admin/partner/status/count"
  );

  return res.data.data;
};