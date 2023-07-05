import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/customers/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import * as moment from 'moment';
import React, { useEffect, useState} from 'react';
import RecentOrders from '@/content/Management/customers/RecentOrders';
import { subDays } from 'date-fns';

import toast, { Toaster } from "react-hot-toast";

import { idText } from 'typescript';
import { useRouter } from 'next/router'
function Customers() {
  const router=useRouter()
  const project = router.query.project=="notSelected"?localStorage.getItem('last-project'):router.query.project;
  const [open, setOpen] = useState<boolean>(false);
  const [selectedData, setSelected] = useState<any>({id:"",title:"",description:""});
  const [cryptoOrders, setCryptoOrders] = useState([]);
  const getProjects = async () => {
       const headers = {
  "Authorization": `Bearer ${localStorage.getItem('token')}`,
};
  
     const response = await fetch(`http://68.178.202.181:8000/api/v1/project/project/${project}/customers/`, { headers }).then((response) => {
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
              data.map(e=>{
                newData.push({
      id: e.id,
      orderDetails: e.first_name,
      orderDate: moment().format('DD/MM/YYYY HH:mm:ss'),
      status: 'completed',
      orderID: e.last_name,
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
      console.log(router.query.project)
      getProjects()
   }, [])
  const handleClickOpen = (id,title,description) => {
    console.log(id+" "+title+" "+description)
    setOpen(true);
    setSelected({id:id,title:title,description:description})
  };

  const handleClose = async (id, title, description, datePicker, ssn, address1, address2, city, state, zip) => {
    console.log(id + " " + title + " " + description + " " + datePicker + " " + ssn + " " + address1 + " " + address2 + " " + city + " " + state + " " + zip)
    
    if (id != "notaction") {
      
      if (id == undefined || id == "") {
        console.log("here")
        const toastCreate = toast.loading('creating new customer plese wait ..');
        toast.dismiss()
        toast.success('customer created ')
        toast.error('customer cannot created Having issue ')
        toast.dismiss(toastCreate);
        const headers = {
             "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem('token')}`,
};
const options = {
            method: "POST", // The HTTP method to use
            headers:headers,
            // The body of the request as a JSON string
            body: JSON.stringify({
    "first_name": title,
    "last_name": description,
    "ssn": ssn,
    "address1": address1,
    "address2": address2,
    "city": city,
    "state": state,
    "country": "USA",
    "zipcode": zip,
    "birth_date":datePicker
}),
};
        
        const toastUpdate = toast.loading('updating existing customer plese wait ..');
     const response = await fetch(`http://68.178.202.181:8000/api/v1/project/project/${project}/customer/`, options).then((response) => {
                // Check if the request was successful
       if (response.ok) {
                  // toast.dismiss(toastCreate)
                 toast.dismiss()
                    toast.success('customer created ')
                    return response.json();

                } else {
// toast.dismiss(toastCreate)
                 toast.dismiss()
                  toast.error('customer cannot created Having issue ')
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
            }).finally(() => {
              toast.dismiss()
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
  body: JSON.stringify({
    "first_name": title,
    "last_name": description,
    "ssn": ssn,
    "address1": address1,
    "address2": address2,
    "city": city,
    "state": state,
    "country": "USA",
    "zipcode": zip,
    "birth_date":datePicker
}),
};

const response = await fetch(`http://68.178.202.181:8000/api/v1/project/project/${project}/customer/${id}`, options)
  .then((response) => {
    // Check if the request was successful
    if (response.ok) {
      toast.dismiss()
                    toast.success('customer updated ')
      return response.json();
    } else {
      // Handle the error
        toast.dismiss()
                  toast.error('customer cannot created Having issue ')
               
      // throw new Error("Request failed with status " + response.status);
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
  }).finally(() => {
              toast.dismiss()
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
        <Toaster 
  position="top-center"
  reverseOrder={false} />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders project={project} cryptoOrders={cryptoOrders} open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} title={selectedData.title} description={selectedData.description} id={selectedData.id} />
          </Grid>
        </Grid>
        
      </Container>
       
      <Footer />
    </>
  );
}

Customers.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default Customers;
