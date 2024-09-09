export function generateRandomPassword(): string {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specialChars = "!@#$%^&*()_";

  // Helper function to get a random character from a string
  function getRandomChar(str: string): string {
    return str[Math.floor(Math.random() * str.length)];
  }

  // Build the password with the desired pattern: 2 lowercase, 2 special, 1 uppercase, 1 digit, 2 uppercase
  let password = "";
  password += getRandomChar(lowercase);
  password += getRandomChar(lowercase);
  password += getRandomChar(specialChars);
  password += getRandomChar(specialChars);
  password += getRandomChar(uppercase);
  password += getRandomChar(digits);
  password += getRandomChar(uppercase);
  password += getRandomChar(uppercase);

  return password;
}

export function generateRandomUsername(): string {
  const characters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";

  // Helper function to get a random character from a string
  function getRandomChar(str: string): string {
    return str[Math.floor(Math.random() * str.length)];
  }

  let username = "";

  // Generate a 6 character username from lowercase letters
  for (let i = 0; i < 6; i++) {
    username += getRandomChar(characters);
  }

  return username;
}

export function generateUserCredentials() {
  return {
    userName: generateRandomUsername(),
    password: generateRandomPassword(),
  };
}
