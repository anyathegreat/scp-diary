import { handleResponse } from "../helpers/api";
import { supabaseConfig } from "./articleService";

const scpREST = {
  getAllScp: async () => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/creatures?select=*&apikey=${supabaseConfig.apikey}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.trim()}`,
      },
    });

    const data = await handleResponse(response);

    const newScp = data.map((item) => ({
      scpId: item.id,
      title: item.title,
      number: item["scp-number"],
      description: item.description,
      image: item.image,
    }));

    return newScp;
  },

  getScp: async (scpId) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/creatures?id=eq.${scpId}&apikey=${supabaseConfig.apikey}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.trim()}`,
      },
    });

    const data = await handleResponse(response);

    const newScp = data.map((item) => ({
      scpId: item.id,
      title: item.title,
      number: item["scp-number"],
      description: item.description,
      image: item.image,
    }));

    return newScp;
  },

  addScp: async (body) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.functionUrl}/create-creature`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return handleResponse(response);
  },

  deleteScp: async (scpId) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/creatures?id=eq.${scpId}&apikey=${supabaseConfig.apikey}`, {
      method: "DELETE",
      headers: {
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
  deleteScp: scpREST.deleteScp,
};
