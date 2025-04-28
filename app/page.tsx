'use client'

export default function Home(){
  const handleSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI!;
    // const isLocalhost = typeof window !== 'undefined' && window.location.hostname === '127.0.0.1';
    // const redirectUri = isLocalhost
    // ? process.env.NEXT_PUBLIC_DEV_REDIRECT_URI!
    //     : process.env.NEXT_PUBLIC_PROD_REDIRECT_URI!;
    // console.log(redirectUri);

    const scope = encodeURIComponent("openid profile email");
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  };
  return (
      <main>
        <h1>Sign In With Google!</h1>
        <button onClick={handleSignIn}>Sign In</button>
      </main>
  );
}