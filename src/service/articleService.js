import { handleResponse } from "../helpers/api";
import { BaseService } from "./client";

class ArticleService extends BaseService {
  constructor(url) {
    super(url);
  }

  async getAllArticle() {
    const response = await fetch(
      `${this.url}/articles?select=*,categories(*),creatures(*)&apikey=sb_publishable_a8OLpm42wzifxhgGmo7Snw_mi4oB5oi`
    );

    return handleResponse(response);
  }
}

export const articleService = new ArticleService("https://gtpqlyakxnistnjenuqa.supabase.co/rest/v1");
