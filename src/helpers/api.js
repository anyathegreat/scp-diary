import { ApiError } from "@/service/error";

export const handleResponse = async (response) => {
  let data = null;

  try {
    data = await response.json();
  } catch (error) {
    if (response.ok) {
      return null;
    }

    console.error(error.message);

    const text = response.text();
    throw new ApiError(text || response.statusText, response.status, data);
  }

  if (!response.ok) {
    const errorMessage = data?.error || data?.message || response.statusText;
    throw new ApiError(errorMessage, response.status, data);
  }

  return data;
};
