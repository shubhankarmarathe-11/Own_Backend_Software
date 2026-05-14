const ValidateEmail = async (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  return true;
};

const ValidateNumber = async (number) => {
  if (String(number).length == 10) return true;

  return false;
};

const Validatepassword = async (password) => {
  if (String(password).length >= 8) return true;

  return false;
};

export { ValidateEmail, ValidateNumber, Validatepassword };
