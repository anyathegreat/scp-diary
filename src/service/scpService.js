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
}

export const scpService = new ScpService("https://gtpqlyakxnistnjenuqa.supabase.co/rest/v1");
