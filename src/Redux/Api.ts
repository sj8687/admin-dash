import { LoginResponse,PartnerListItem } from "@/Types/types";
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
    "https://walker-subsidiary-acne-orange.trycloudflare.com/api/super-admin/partners",
    {
      headers: {
        "X-Super-Admin-API-Key": "123",
      },
    }
  );

  return res.data;
}





//temparty fix
export interface PartnerDocsResponse {
  success: boolean;
  data: {
    vehiclePhoto?: string;
    vehicleDocument?: string;
    aadhaarImageUrl?: string;
    aadhaarPdfUrl?: string;
    panCardUrl?: string;
  };
}

export const fetchPartnerDocs = async (partnerId: string) => {
  const res = await axios.post<PartnerDocsResponse>(
    "https://walker-subsidiary-acne-orange.trycloudflare.com/api/super-admin/partner/documents",
    {
      partner_id: partnerId,
    },
    {
      headers: {
        "X-Super-Admin-API-Key": "123",
      },
    }
  );

  return res.data.data;
};