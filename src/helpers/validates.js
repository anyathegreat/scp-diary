export const validateScpNumber = (number) => {
  return !number.trim() ? "Номер объекта обязателен" : null;
};

export const validateScpTitle = (title) => {
  return !title.trim() ? "Название обязательно" : null;
};

export const validateAddScpImage = (image) => {
  if (!image) return "Изображение обязательно";
  if (!image.type.startsWith("image/")) return "Файл не является изображением";
  if (image.size > 5 * 1024 * 1024) return "Файл слишком большой (макс. 5MB)";

  return null;
};

export const validateEditScpImage = (image) => {
  if (!image) return "Изображение обязательно";

  if (typeof value === "string") {
    if (!image.startsWith("data:image/")) {
      return "Неверный формат изображения";
    }
  } else {
    if (!image.type.startsWith("image/")) return "Файл не является изображением";
    if (image.size > 5 * 1024 * 1024) return "Файл слишком большой (макс. 5MB)";
  }

  return null;
};

export const validateArticleTitle = (title) => {
  return !title.trim() ? "Название статьи обязательно" : null;
};

export const validateNoteText = (text) => {
  if (!text.trim()) return "Введите описание";
  if (text.trim().length < 40) return "Описание должно состоять минимум из 40 символов";

  return null;
};

export const validateCategoryTitle = (title) => {
  return !title.trim() ? "Название статьи обязательно" : null;
};

export const validateCategorySlug = (slug) => {
  if (!slug.trim()) return "Slug обязателен";
  if (!/^[a-z0-9]+$/.test(slug)) {
    return "Slug должен быть маленькими буквами и латинскими буквами";
  }

  return null;
};
