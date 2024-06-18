export function generateUniqueID() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const digits = '123456789';
    const now = new Date();
    const timestamp = now.getTime();

    const randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    const randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));
    return `${randomChar}${timestamp}${randomDigit}`;
}