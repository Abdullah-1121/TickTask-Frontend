'use client'
import Cookies from 'js-cookie';

function logout() {
    // Remove both the access token and refresh token
    Cookies.remove('access_token', { path: '/' });
    Cookies.remove('refresh_token', { path: '/' });

    // Optional: You may want to redirect the user to the login page after logging out
    window.location.href = '/sign-in';  // Or use Next.js Router for redirection
}

export default function LogoutButton() {
    return (
        <button onClick={logout}>
            Log Out
        </button>
    );
}
