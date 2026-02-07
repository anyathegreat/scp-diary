import { supabaseConfig } from "../constants/supabaseUrl";
import { handleResponse } from "../helpers/api";

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

  getCategory: async (categoryId) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/categories?id=eq.${categoryId}`, {
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

  addCategory: async (body) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/categories`, {
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

  updateCategory: async ({ categoryId, updateCategory }) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/categories?id=eq.${categoryId}`, {
      method: "PATCH",
      headers: {
        apikey: supabaseConfig.apikey,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateCategory),
    });

    return handleResponse(response);
  },

  deleteCategory: async (categoryId) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/categories?id=eq.${categoryId}`, {
      method: "DELETE",
      headers: {
        apikey: supabaseConfig.apikey,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return handleResponse(response);
  },
};

export const categoryService = {
  getAllCategory: categoryREST.getAllCategory,
  getCategory: categoryREST.getCategory,
  addCategory: categoryREST.addCategory,
  updateCategory: categoryREST.updateCategory,
  deleteCategory: categoryREST.deleteCategory,
};
