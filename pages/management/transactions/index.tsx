import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Transactions/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import * as moment from 'moment';
import React, { useEffect, useState} from 'react';
import RecentOrders from '@/content/Management/Transactions/RecentOrders';
import { subDays } from 'date-fns';
import { idText } from 'typescript';
function ApplicationsTransactions() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedData, setSelected] = useState<any>({id:"",title:"",description:""});
  const [cryptoOrders, setCryptoOrders] = useState([]);
  const getProjects = async () => {
       const headers = {
  "Authorization": `Bearer ${localStorage.getItem('token')}`,
};

     const response = await fetch("http://68.178.202.181:8000/api/v1/project/project/", { headers }).then((response) => {
                // Check if the request was successful
                if (response.ok) {

                    return response.json();

                } else {
                }
            })
            .then((data) => {
                // Do something with the data
              console.log(data);
              let newData=[]
              if (data.length > 0) {
                localStorage.setItem('last-project',data[0].id)
              }
              data.map(e=>{
                newData.push({
      id: e.id,
      orderDetails: e.name,
      orderDate: moment(e.created_date).format('DD/MM/YYYY HH:mm:ss'),
      status: 'completed',
      orderID: e.description,
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 34.4565,
      amount: 56787,
      cryptoCurrency: 'ETH',
      currency: '$'
    })
              })
              setCryptoOrders(newData)
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });

     console.log(response)
  }
    useEffect(async () => {
// console.log(accessToken)
      getProjects()
   }, [])
  const handleClickOpen = (id,title,description) => {
    console.log(id+" "+title+" "+description)
    setOpen(true);
    setSelected({id:id,title:title,description:description})
  };

  const handleClose = async (id, title, description) => {
    if (id != "notaction") {
      
    if (id == undefined||id=="") {
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
              getProjects()
              
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });

    }
    else {
      console.log("MAKING PATCH ")
            const headers = {
             "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem('token')}`,
            };
      const options = {
  method: "PATCH", // The HTTP method to use
  headers: headers,
  // The body of the request as a JSON string
  body: JSON.stringify({ name: title, description: description }),
};

const response = await fetch(`http://68.178.202.181:8000/api/v1/project/project/${id}`, options)
  .then((response) => {
    // Check if the request was successful
    if (response.ok) {
      alert("Project updated successfully");
      return response.json();
    } else {
      // Handle the error
      throw new Error("Request failed with status " + response.status);
    }
  })
  .then((data) => {
    getProjects()
    // Do something with the data
    // console.log(data);
  })
  .catch((error) => {
    // Handle the error
    console.error(error);
  });

    }
      
    }
    setOpen(false);
    // console.log(id+" "+title+" "+description);
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
            <RecentOrders cryptoOrders={cryptoOrders} open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} title={selectedData.title} description={selectedData.description} id={selectedData.id} />
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
