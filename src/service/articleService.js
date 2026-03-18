import { supabaseConfig } from "@/constants/supabaseUrl";
import { handleResponse } from "@/helpers/api";

const articleREST = {
  getAllArticle: async () => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/articles?select=*,categories(*),creatures(*)`, {
      method: "GET",
      headers: {
        apikey: supabaseConfig.apikey,
        Authorization: `Bearer ${token.trim()}`,
      },
    });

    const data = await handleResponse(response);

    const newArticles = data.map((item) => ({
      articleId: item.id,
      title: item.title,
      notes: item.notes,
      categories: item.categories,
      creatures: item.creatures,
    }));

    return newArticles;
  },

  getArticle: async (articleId) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
      `${supabaseConfig.baseUrl}/articles?id=eq.${articleId}&select=*,categories(*),creatures(*)`,
      {
        method: "GET",
        headers: {
          apikey: supabaseConfig.apikey,
          Authorization: `Bearer ${token.trim()}`,
        },
      },
    );

    const data = await handleResponse(response);

    const newArticle = data.map((item) => ({
      articleId: item.id,
      title: item.title,
      notes: item.notes,
      categories: item.categories,
      creatures: item.creatures,
    }));

    return newArticle;
  },

  addArticle: async (body) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/articles`, {
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

  updateArticleTitle: async ({ articleId, updateArticle }) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/articles?id=eq.${articleId}`, {
      method: "PATCH",
      headers: {
        apikey: supabaseConfig.apikey,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateArticle),
    });

    return handleResponse(response);
  },

  deleteArticle: async (articleId) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/articles?id=eq.${articleId}`, {
      method: "DELETE",
      headers: {
        apikey: supabaseConfig.apikey,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return handleResponse(response);
  },

  addArticleNote: async ({ articleId, newNote }) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.functionUrl}/notes?article_id=${articleId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });

    return handleResponse(response);
  },

  updateArticleNote: async ({ articleId, noteId, updatedNote }) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.functionUrl}/notes?article_id=${articleId}&note_uid=${noteId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    });

    return handleResponse(response);
  },

  deleteArticleNote: async ({ articleId, noteId }) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.functionUrl}/notes?article_id=${articleId}&note_uid=${noteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },

  addArticleScpObject: async (body) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/articles_creatures`, {
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

  deleteArticleScpObject: async ({ article_id, creature_id }) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
      `${supabaseConfig.baseUrl}/articles_creatures?article_id=eq.${article_id}&creature_id=eq.${creature_id}`,
      {
        method: "DELETE",
        headers: {
          apikey: supabaseConfig.apikey,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return handleResponse(response);
  },

  addArticleCategoryObject: async (body) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${supabaseConfig.baseUrl}/articles_categories`, {
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

  deleteArticleCategoryObject: async ({ article_id, category_id }) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
      `${supabaseConfig.baseUrl}/articles_categories?article_id=eq.${article_id}&category_id=eq.${category_id}`,
      {
        method: "DELETE",
        headers: {
          apikey: supabaseConfig.apikey,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return handleResponse(response);
  },
};

export const articleService = {
  getAllArticle: articleREST.getAllArticle,
  getArticle: articleREST.getArticle,
  addArticle: articleREST.addArticle,
  deleteArticle: articleREST.deleteArticle,
  addArticleNote: articleREST.addArticleNote,
  updateArticleNote: articleREST.updateArticleNote,
  deleteArticleNote: articleREST.deleteArticleNote,
  addArticleScpObject: articleREST.addArticleScpObject,
  deleteArticleScpObject: articleREST.deleteArticleScpObject,
  addArticleCategoryObject: articleREST.addArticleCategoryObject,
  deleteArticleCategoryObject: articleREST.deleteArticleCategoryObject,
  updateArticleTitle: articleREST.updateArticleTitle,
};
