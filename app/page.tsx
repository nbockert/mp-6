'use client'
import { Button, Typography, Container, Card, Avatar } from '@mui/material';
import {useState,useEffect} from "react";


export default function Home(){
    const [user, setUser] = useState<{ name: string, email: string, picture: string } | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name');
        const email = params.get('email');
        const picture = params.get('picture');

        if (name && email && picture) {
            setUser({ name, email, picture });
        }
        setLoading(false);
    }, []);

    const handleSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const isLocalhost = origin.includes('127.0.0.1') || origin.includes('localhost');
      const redirectUri = isLocalhost
    ? process.env.NEXT_PUBLIC_DEV_REDIRECT_URI!
        : process.env.NEXT_PUBLIC_PROD_REDIRECT_URI!;


      const scope = encodeURIComponent("openid profile email");
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  };
    if (loading) {
        return null;
    }
  return (
      <Container
          maxWidth="sm"
          sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
          }}
      >
          <Card
              elevation={6}
              sx={{
                  padding: 4,
                  margin: 8,
                  textAlign: 'center',
                  borderRadius: 4,
                  backgroundColor: '#8F87F1',
              }}
          >
              {!user ? (
                  <>
                      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#E9A5F1' }}>
                          Sign In With Google
                      </Typography>
                      <Button
                          variant="contained"
                          size="large"
                          onClick={handleSignIn}
                          sx={{
                              marginTop: 2,
                              backgroundColor: '#E9A5F1',
                              '&:hover': {
                                  backgroundColor: '#C68EFD',
                              },
                              borderRadius: 3,
                              paddingX: 4,
                          }}
                      >
                          Sign In
                      </Button>
                  </>
              ) : (
                  <>
                      <Avatar
                          src={user.picture}
                          alt={user.name}
                          sx={{ width: 100, height: 100, margin: '0 auto', marginBottom: 2 }}
                      />
                      <Typography variant="h5" component="h2" gutterBottom>
                          Welcome, {user.name}!
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                          {user.email}
                      </Typography>
                  </>
              )}
          </Card>
      </Container>



  );
}