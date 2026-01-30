import { handleResponse } from "../helpers/api";
import { supabaseConfig } from "./articleService";

const categoryREST = {
  getAllCategory: async () => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/categories`, {
      method: "GET",
      headers: {
        apikey: supabaseConfig.apikey,
        Authorization: `Bearer ${token.trim()}`,
      },
    });

    const data = await handleResponse(response);

    const newCategory = data.map((item) => ({
      categoryId: item.id,
      name: item.name,
      slug: item.slug,
    }));

    return newCategory;
  },
};

export const categoryService = {
  getAllCategory: categoryREST.getAllCategory,
};
