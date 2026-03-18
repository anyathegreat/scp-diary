import { handleResponse } from "@/helpers/api";
import { supabaseConfig } from "@/constants/supabaseUrl";

const scpREST = {
  getAllScp: async () => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/creatures?select=*`, {
      method: "GET",
      headers: {
        apikey: supabaseConfig.apikey,
        Authorization: `Bearer ${token.trim()}`,
      },
    });

    const data = await handleResponse(response);

    const newScp = data.map((item) => ({
      scpId: item.id,
      title: item.title,
      scpNumber: item["scp_number"],
      description: item.description,
      image: item.image,
    }));

    return newScp;
  },

  getScp: async (scpId) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/creatures?id=eq.${scpId}`, {
      method: "GET",
      headers: {
        apikey: supabaseConfig.apikey,
        Authorization: `Bearer ${token.trim()}`,
      },
    });

    const data = await handleResponse(response);

    const newScp = data.map((item) => ({
      scpId: item.id,
      title: item.title,
      scpNumber: item["scp_number"],
      description: item.description,
      image: item.image,
    }));

    return newScp;
  },

  addScp: async (body) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/creatures`, {
      method: "POST",
      headers: {
        apikey: supabaseConfig.apikey,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });

    return handleResponse(response);
  },

  updateScp: async ({ scpId, updateScp }) => {
    console.log(updateScp);
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/creatures?id=eq.${scpId}`, {
      method: "PATCH",
      headers: {
        apikey: supabaseConfig.apikey,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updateScp),
    });

    return handleResponse(response);
  },

  deleteScp: async (scpId) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/creatures?id=eq.${scpId}`, {
      method: "DELETE",
      headers: {
        apikey: supabaseConfig.apikey,
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },
};

export const scpService = {
  getAllScp: scpREST.getAllScp,
  getScp: scpREST.getScp,
  addScp: scpREST.addScp,
  updateScp: scpREST.updateScp,
  deleteScp: scpREST.deleteScp,
};
