import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled,
  TextField,
  FormControl,
  Grid,
  Stack,
  useMediaQuery
} from '@mui/material';

import { useRouter } from "next/router";
import {  Input } from "@mui/material";
import { ReactElement, useEffect, useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import  useAuthTokens  from "@/utils/useAuthTokens";
import Link from 'src/components/Link';
import Head from 'next/head';

import Logo from 'src/components/LogoSign';
import Hero from 'src/content/Overview/Hero';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const router = useRouter();
 const { saveTokens } = useAuthTokens();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(async () => {
    console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token') != undefined) {
      router.push("/management/transactions", {
      replace: true,
                             });
    }
    
   }, [])
  const mq:any = useMediaQuery("(max-width: 600px)");
//Handle Login API Integration here
    const authenticateUser = () => {
        
        // The URL to post to
        const url = "http://68.178.202.181:8000/api/v1/account/login/";


        // The options for the fetch request
        const options = {
            method: "POST", // The HTTP method to use
            headers: {
                // The content type of the request body
                "Content-Type": "application/json",
            },
            // The body of the request as a JSON string
            body: JSON.stringify({username,password}),
        };

        // Call the fetch function and handle the response
        fetch(url, options)
            .then((response) => {
                // Check if the request was successful
                if (response.ok) {
                    // Parse the response body as JSON
                  alert("login successful");
                  
                    return response.json();

                } else {
                    // Throw an error if the response was not ok
                    // throw new Error("Something went wrong");
                    alert("invalid credentials");
                }
            })
            .then((data) => {
                // Do something with the data
              console.log(data);
                             router.push("/management/transactions", {
      replace: true,
                             });
              localStorage.setItem("token", data.access);
localStorage.setItem("refresh", data.refresh);
              saveTokens(data.access, data.refresh);

            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });

    }
  return (
    <OverviewWrapper sx={{margin:"auto",maxWidth:"max-content"}}>
      
       <Box
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        maxWidth: "600px",
        margin: "auto",
        [mq]: {
          maxWidth: "100%",
          margin: 0,
        },
      }}
      >
        <FormControl>
          <Typography align='center' variant="h2" sx={{m:2  }}>
          Welcome
        </Typography>
          <Typography variant="subtitle1" sx={{ m: 2 }}>
          Does not have account &ensp;
          <Link
            href="/register"
            rel="noopener noreferrer"
          >
            Register
          </Link>
        </Typography>
        <TextField
          label="Username"
          type="text"
          name="username"
            value={username}
            sx={{m:2}}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
            value={password}
            sx={{m:2}}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" sx={{m:2}} onClick={(e)=>{authenticateUser()}}>
          Login
        </Button>
      </FormControl>
        </Box>
      {/* <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
              <Box>
                <Button
                  component={Link}
                  href="/dashboards/crypto"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  Live Preview
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Hero />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography textAlign="center" variant="subtitle1">
          Crafted by{' '}
          <Link
            href="https://bloomui.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            BloomUI.com
          </Link>
        </Typography>
      </Container> */}
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
  // return ( <Box sx={{ maxWidth: "500px", margin: "auto" }}>
  //     <h1>Login or Register</h1>
  //     <LoginForm />
  //     <RegistrationForm />
  //   </Box>)
};
