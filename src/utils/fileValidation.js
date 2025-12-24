export const validateImageFile = async (file) => {
  try {
    const arrayBuffer = await file.slice(0, 16).arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const hexString = Array.from(uint8Array)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

    const signatures = {
      PNG: ["89504E470D0A1A0A"],
      JPEG: ["FFD8FFDB", "FFD8FFE0", "FFD8FFE1", "FFD8FFE2", "FFD8FFE3", "FFD8FFE8"],
      GIF: ["47494638"],
      WebP: ["52494646"],
    };

    let isValid = false;

    for (const format in signatures) {
      if (signatures[format].some((sig) => hexString.startsWith(sig))) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      return "Файл не является корректным изображением (PNG, JPEG, GIF, WebP, BMP)";
    }

    return null;
  } catch (error) {
    return error;
  }
};
