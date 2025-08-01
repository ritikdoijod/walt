export function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const env = (key, defaultValue = "") => {
  const value = process.env[`EXPO_PUBLIC_${key}`];

  if (!value) {
    if (defaultValue) return defaultValue;

    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
};
