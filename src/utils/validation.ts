export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-+()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
};

export const validateCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s|-/g, "");
  return /^\d{16}$/.test(cleaned);
};

export const validateExpiryDate = (expiry: string): boolean => {
  const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!expiryRegex.test(expiry)) return false;

  const [month, year] = expiry.split("/");
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  const expiryYear = parseInt(year, 10);
  const expiryMonth = parseInt(month, 10);

  if (expiryYear < currentYear) return false;
  if (expiryYear === currentYear && expiryMonth < currentMonth) return false;

  return true;
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};

export const validatePostalCode = (postalCode: string): boolean => {
  return /^[0-9]{5}(-[0-9]{4})?$/.test(postalCode);
};

export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s/g, "");
  const chunks = cleaned.match(/.{1,4}/g);
  return chunks ? chunks.join(" ") : cleaned;
};

export const formatExpiryDate = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
  }
  return cleaned;
};
