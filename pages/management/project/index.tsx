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

  const handleClose = () => {
    console.log("here clicked")
    setOpen(false);
    console.log(open)
  };

  return (
    <>
      <Head>
        <title>Transactions - Applications</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} />
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
