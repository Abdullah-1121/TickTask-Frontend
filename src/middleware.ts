import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const verifyToken = async (token: string) => {
  try {
    const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jwtVerify(token, secretKey);
    return payload;  // Return decoded payload if valid
  } catch (error: any) {
    throw new Error('Invalid or expired token');  // Throw error if token is invalid or expired
  }
};

export async function middleware(req: NextRequest) {
  // Get access and refresh tokens from cookies
  const accessTokenCookie = req.cookies.get('access_token');
  const refreshTokenCookie = req.cookies.get('refresh_token');

  if (!accessTokenCookie || !refreshTokenCookie) {
    // Redirect to sign-in if either token is missing
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const accessToken = accessTokenCookie.value;
  const refreshToken = refreshTokenCookie.value;

  try {
    // Verify the access token
    await verifyToken(accessToken);
    return NextResponse.next();  // Proceed to the requested page if access token is valid
  } catch (error) {
    console.log('Access token expired, trying to refresh token');

    try {
      // Request new access token using the refresh token
      const response = await fetch(`http://localhost:8000/token/refresh?oldToken=${refreshToken}`, {
        method: 'GET',
      });

      if (response.ok) {
        const { access_token } = await response.json();

        // Set the new access token in the cookies
        const res = NextResponse.next();
        res.cookies.set('access_token', access_token, { httpOnly: true });

        return res;
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (err) {
      console.error('Token refresh failed:', err);
      // Redirect to sign-in if refresh token fails
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }
}

// Apply middleware only to the home route
export const config = {
  matcher: ['/'],  // This will protect only the home route
};
