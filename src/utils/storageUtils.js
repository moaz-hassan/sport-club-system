import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

// Secret key for encryption (use a strong key and keep it secure)
const SECRET_KEY = "d7f#9Y2!@kL$3pZ8G&w1Q$X#bH*R9oT!";

// Function to encrypt and store the ID in session storage
export function storeEncryptedId(userId) {
  // Encrypt the key and value
  const encryptedKey = CryptoJS.AES.encrypt("userId", SECRET_KEY).toString();
  const encryptedValue = CryptoJS.AES.encrypt(
    userId.toString(),
    SECRET_KEY
  ).toString();

  // Store in session storage
  sessionStorage.setItem(encryptedKey, encryptedValue);
}

// Function to decrypt and retrieve the ID from session storage
export function getDecryptedId() {
  // Find the encrypted key
  const encryptedKey = Object.keys(sessionStorage).find((key) => {
    try {
      const decryptedKey = CryptoJS.AES.decrypt(key, SECRET_KEY).toString(
        CryptoJS.enc.Utf8
      );
      return decryptedKey === "userId";
    } catch {
      return false;
    }
  });

  if (!encryptedKey) {
    return null; // Key not found
  }

  // Decrypt the value
  const encryptedValue = sessionStorage.getItem(encryptedKey);
  try {
    const decryptedValue = CryptoJS.AES.decrypt(
      encryptedValue,
      SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    return decryptedValue || null;
  } catch {
    return null; // Decryption failed
  }
}

// Function to clear the encrypted ID
export function clearEncryptedId() {
  // Find the encrypted key
  const encryptedKey = Object.keys(sessionStorage).find((key) => {
    try {
      const decryptedKey = CryptoJS.AES.decrypt(key, SECRET_KEY).toString(
        CryptoJS.enc.Utf8
      );
      return decryptedKey === "userId";
    } catch {
      return false;
    }
  });

  if (encryptedKey) {
    sessionStorage.removeItem(encryptedKey);
  }
}

// Function to store encrypted user data in cookies
export function storeUserDataInCookies(userData, expiresInDays = 7) {
  try {
    // Stringify the data and encrypt it
    const stringifiedData = JSON.stringify(userData);
    const encryptedData = CryptoJS.AES.encrypt(
      stringifiedData,
      SECRET_KEY
    ).toString();

    // Store encrypted data in a cookie
    Cookies.set("user_data", encryptedData, {
      expires: expiresInDays,
      secure: true,
    });

    // console.log("User data stored successfully in cookies.");
  } catch (error) {
    console.error("Error storing user data in cookies:", error);
  }
}

// Function to retrieve and decrypt user data from cookies
export function getUserDataFromCookies() {
  try {
    const encryptedData = Cookies.get("user_data");
    if (!encryptedData) return null;

    // Decrypt the data
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData;
  } catch (error) {
    console.error("Error retrieving user data from cookies:", error);
    return null;
  }
}

// Function to clear user data from cookies on logout
export function clearUserDataFromCookies() {
  try {
    // Remove the "user_data" cookie
    Cookies.remove("user_data", { secure: true, sameSite: "Strict" });

    console.log("User data cleared from cookies.");
  } catch (error) {
    console.error("Error clearing user data from cookies:", error);
  }
}
