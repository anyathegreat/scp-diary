import { ApiError } from "../service/error";

export const handleResponce = async (responce) => {
  let data = null;

  try {
    data = await responce.json();
  } catch (error) {
    if (responce.ok) {
      return null;
    }

    console.error(error.message);

    const text = responce.text();
    throw new ApiError(text || responce.statusText, responce.status, data);
  }

  if (!responce.ok) {
    const errorMessage = data?.error || data?.message || responce.statusText;
    throw new ApiError(errorMessage, responce.status, data);
  }

  return data;
};
