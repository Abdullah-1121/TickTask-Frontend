import { jwtVerify } from 'jose';


async function getUsernameFromToken(token: string, secretKey: string) {
  try {
    const secretKeyBytes = new TextEncoder().encode(secretKey);  // Convert secret key to bytes
    const { payload } = await jwtVerify(token, secretKeyBytes);  // Verify the token and get payload

    // Assuming the username is in the 'sub' field
    const username = payload.sub;  // Typically, 'sub' contains the user identifier
    return username;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
export default getUsernameFromToken