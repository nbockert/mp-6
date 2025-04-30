import {NextResponse} from "next/server";

export async function GET(request:Request) {
    const {searchParams,origin} = new URL(request.url);

    const code = searchParams.get('code');

    if (!code) {
        console.error('No code found');
        return NextResponse.redirect('${origin}/?${params.toString()}');
    }

    const isLocalhost = origin.includes('127.0.0.1') || origin.includes('localhost');
    const redirectUri = isLocalhost
        ? process.env.NEXT_PUBLIC_DEV_REDIRECT_URI!
        : process.env.NEXT_PUBLIC_PROD_REDIRECT_URI!;
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: new URLSearchParams({
            code,
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: redirectUri!,
            grant_type: 'authorization_code',
        }),
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) {
        console.error('No access token');
        return NextResponse.redirect('${origin}/?${params.toString()}');
    }
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const user = await userResponse.json();
    const params = new URLSearchParams({
        name: user.name,
        email: user.email,
        picture: user.picture,
    });
    return NextResponse.redirect(`${origin}/?${params.toString()}`);


}