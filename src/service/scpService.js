import { handleResponse } from "../helpers/api";
import { BaseService } from "./client";

class ScpService extends BaseService {
  constructor(url) {
    super(url);
  }

  async getAllScp() {
    const response = await fetch(
      `${this.url}/creatures?select=*&apikey=sb_publishable_a8OLpm42wzifxhgGmo7Snw_mi4oB5oi`
    );

    return handleResponse(response);
  }

  async addScp(body) {
    const token = localStorage.getItem("access_token");

    const headers = {
      apikey: "sb_publishable_a8OLpm42wzifxhgGmo7Snw_mi4oB5oi",
      Authorization: `Bearer ${token.trim()}`,
    };

    const response = await fetch("https://gtpqlyakxnistnjenuqa.supabase.co/functions/v1/create-creature", {
      headers,
      method: "POST",
      body: body,
    });

    return handleResponse(response);
  }

  async deleteScp(id) {
    const token = localStorage.getItem("access_token");

    const headers = {
      apikey: "sb_publishable_a8OLpm42wzifxhgGmo7Snw_mi4oB5oi",
      Authorization: `Bearer ${token.trim()}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${this.url}/creatures?id=eq.${id}`, {
      headers,
      method: "DELETE",
    });

    return handleResponse(response);
  }
}

export const scpService = new ScpService("https://gtpqlyakxnistnjenuqa.supabase.co/rest/v1");
