import {NextResponse} from "next/server";

export async function GET(request:Request) {
    const {searchParams,origin} = new URL(request.url);

    const code = searchParams.get('code');
    if (!code) {
        return NextResponse.redirect("/");
    }
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
    // const isLocalhost = typeof window !== 'undefined' && window.location.hostname === '127.0.0.1';
    // const redirectUri = isLocalhost
    //     ? process.env.NEXT_PUBLIC_DEV_REDIRECT_URI!
    //     : process.env.NEXT_PUBLIC_PROD_REDIRECT_URI!;
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            code,
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
            client_secret: process.env.CLIENT_SECRET!,
            redirect_uri: redirectUri!,
            grant_type: 'authorization_code',
        }),
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    console.log('Access Token:', accessToken);
    if (!accessToken) {

        return NextResponse.redirect("/"+origin);
    }
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const user = await userResponse.json();
    return NextResponse.json(user);


}