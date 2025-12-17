import { handleResponce } from "../helpers/api";
import { BaseService } from "./client";

class ScpService extends BaseService {
  constructor(url) {
    super(url);
  }

  async getAllScp() {
    const responce = await fetch(
      `${this.url}/creatures?select=*&apikey=sb_publishable_a8OLpm42wzifxhgGmo7Snw_mi4oB5oi`
    );

    return handleResponce(responce);
  }

  async addScp(body) {
    const token = localStorage.getItem("access_token");

    console.log(token);

    const headers = {
      apikey: "sb_publishable_a8OLpm42wzifxhgGmo7Snw_mi4oB5oi",
      Authorization: `Bearer ${token.trim()}`,
      "Content-Type": "application/json",
    };

    const responce = await fetch("https://gtpqlyakxnistnjenuqa.supabase.co/rest/v1/creatures", {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    });

    return handleResponce(responce);
  }
}

export const scpService = new ScpService("https://gtpqlyakxnistnjenuqa.supabase.co/rest/v1");
