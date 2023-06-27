import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Transactions/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import React, { useState} from 'react';
import RecentOrders from '@/content/Management/Transactions/RecentOrders';

function ApplicationsTransactions() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedData, setSelected] = useState<any>({id:"",title:"",description:""});

  const handleClickOpen = () => {
    setOpen(true);
    // setSelected({id:id,title:title,description:description})
  };

  const handleClose = async (id, title, description) => {
    if (id == undefined) {
      const headers = {
             "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem('token')}`,
};
const options = {
            method: "POST", // The HTTP method to use
            headers:headers,
            // The body of the request as a JSON string
            body: JSON.stringify({name:title,description:description}),
        };
     const response = await fetch("http://68.178.202.181:8000/api/v1/project/", options).then((response) => {
                // Check if the request was successful
                if (response.ok) {
                    alert("project added successfully")
                    return response.json();

                } else {
                }
            })
            .then((data) => {
                // Do something with the data
              console.log(data);

            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });

    }
    setOpen(false);
    console.log(id+" "+title+" "+description);
  };

  return (
    <>
      <Head>
        <title>Transactions - Applications</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader open={open} handleClose={handleClose} id="" handleClickOpen={handleClickOpen} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} title={selectedData.title} description={selectedData.description} id={selectedData.id} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
