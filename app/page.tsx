'use client'
import { Button, Typography, Container, Card } from '@mui/material';


export default function Home(){
  const handleSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
      const isLocalhost = origin.includes('3000');
      const redirectUri = isLocalhost
    ? process.env.NEXT_PUBLIC_DEV_REDIRECT_URI!
        : process.env.NEXT_PUBLIC_PROD_REDIRECT_URI!;
    console.log(redirectUri);

    const scope = encodeURIComponent("openid profile email");
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  };
  return (
      <>
      <Container
          maxWidth="sm"
          sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
          }}
      >
          <Card elevation={6}
                sx={{
                       padding: 4,
                        margin: 8,
                       textAlign: 'center',
                       borderRadius: 4,
                       backgroundColor: '#8F87F1',
                   }}
                   >
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

          </Card>


      </Container>

      </>
  );
}