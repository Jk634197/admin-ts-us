"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import { Drawer,Container } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import DatePicker from '@/components/DatePicker';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import {DateField}  from '@mui/x-date-pickers';
export default function OrderFormDialog({ open, handleClickOpen,id,project,ssnIs,address1Is,address2Is,cityIs,stateIs,zipIs, date,handleClose ,title,description}) {
 
    const [titleField, setTitleField] = useState(title)
  const [descriptionField, setDescriptionField] = useState(description)
  const [datePicker, setDate] = useState()
  const [ssn, setSsn] = useState(ssnIs)
  const [address1, setAddress1] = useState(address1Is)
  const [address2, setAddress2] = useState(address2Is)
  const [city, setCity] = useState(cityIs)
  const [state, setState] = useState(stateIs)
  const [zip, setZip] = useState(zipIs)
  const [data,setData]=useState(false)
//   const getProjects = async () => {
//     console.log(id)
//     console.log(project)
//     console.log(data)
//        const headers = {
//   "Authorization": `Bearer ${localStorage.getItem('token')}`,
// };
//     if (!data && id!=undefined && project!=undefined && id!="" && project!="") {
      
//      const response = await fetch(`http://68.178.202.181:8000/api/v1/project/project/${project}/customers/${id}`, { headers }).then((response) => {
//                 // Check if the request was successful
//                 if (response.ok) {
//                   console.log(response)
//                     return response.json();

//                 } else {
//                 }
//             })
//             .then((data) => {
//                 // Do something with the data
//               console.log(data);
//               if (data != undefined) {
//                 console.log('setting value')
//               setTitleField(data.first_name)
//               setDescriptionField(data.last_name)
//               setSsn(data.ssn)
//               setDate(new Date(data.birth_date))
//               setAddress1(data.address1)
//               setAddress2(data.address2)
//               setCity(data.city)
//               setState(data.state)
//                 setZip(data.zipcode)  
//                 setData(true)
//               }
              
//             })
//             .catch((error) => {
//                 // Handle the error
//                 console.error(error);
//             });

//       console.log(response)
      
//     }
//   }
  // if (id != "" || id != undefined) {
  //     getProjects()
  //   }
  React.useEffect(async () => {
  const getProjects = async () => {
    console.log(id)
    console.log(project)
    console.log(data)
            
    const headers = {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    };
    if (id !== undefined && project !== undefined && id !== "" && project !== "") {
      try {
        const response = await fetch(`http://68.178.202.181:8000/api/v1/project/project/${project}/customers/${id}`, { headers });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data !== undefined) {
            console.log('setting value')
            setTitleField(data.first_name);
            setDescriptionField(data.last_name);
            setSsn(data.ssn);
            setDate(new Date(data.birth_date));
            setAddress1(data.address1);
            setAddress2(data.address2);
            setCity(data.city);
            setState(data.state);
            setZip(data.zipcode);
            setData(true);
          }
        } else {
          // Handle the error response if needed
        }
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    else {
      setData(true)
      setTitleField("");
            setDescriptionField("");
            setSsn("");
            setDate(new Date());
            setAddress1("");
            setAddress2("");
            setCity("");
            setState("");
            setZip("");
    }
  };

  console.log("finally");
  console.log(id);
  console.log(project);

  if (open) {
   await getProjects();
  } else {
    setData(false);
  }
}, [open]);

  const handleDateChange = (date: string | null) => {
     console.log(date)
    setDate(date);
  };
  const handleSideBar = (e) => {
     console.log(e)
  };
  console.log(title+" "+id+" "+description)
  return (
    <>
    <div>
       <Drawer sx={{p:"13px"}}
          anchor={"right"} open={open} onClose={(e) => { handleClose(id,titleField,descriptionField) }}

    >
          {data?(<Box sx={{p:"13px",maxWidth:"350px"}}>
                  <TextField
                          autoFocus
            margin="dense"
                      id="outlined-search"
                      label="First Name"
                      type="search"
            defaultValue={titleField}

            fullWidth
               onChange={(e) => setTitleField(e.target.value)}
                    />
                  <TextField
                                                autoFocus
            margin="dense"
          id="outlined-search"
          label="Last Name"
             onChange={(e) => setDescriptionField(e.target.value)}

                      defaultValue={descriptionField}
                      fullWidth
          />           
          <TextField
                                                autoFocus
            margin="dense"
          id="outlined-search"
          label="ssn"

             onChange={(e) => setSsn(e.target.value)}
                      defaultValue={ssn}
                      fullWidth
          />           
        <TextField
                                                autoFocus
            margin="dense"
          id="outlined-search"
          label="address 1"
            // multiline
             onChange={(e) => setAddress1(e.target.value)}
                      // rows={4}
                      defaultValue={address1}
                      fullWidth
          />        
        <TextField
                                                autoFocus
            margin="dense"
          id="outlined-search"
          label="address 2"
            // multiline
             onChange={(e) => setAddress2(e.target.value)}
                      // rows={4}
                      defaultValue={address2}
                      fullWidth
          />   
        <TextField
                                                autoFocus
            margin="dense"
          id="outlined-search"
          label="city"
            
             onChange={(e) => setCity(e.target.value)}
                      
                      defaultValue={city}
                      fullWidth
          />     
          <TextField
                                                autoFocus
            margin="dense"
          id="outlined-search"
          label="state"
            
             onChange={(e) => setState(e.target.value)}
                      
                      defaultValue={state}
                      fullWidth
          />  
        <TextField
                                                autoFocus
            margin="dense"
          id="outlined-search"
          label="zip code"
             onChange={(e) => setZip(e.target.value)}

                      defaultValue={zip}
                      fullWidth
          />   
            <DatePicker value={date} handleDateChange={ handleDateChange} />

          <Box sx={{ flexGrow: 1 }}>
      <Grid sx={{mt:'3px'}} container spacing={2}>
              <Grid >
                  <Button variant='contained' onClick={(e) => { handleClose(id, titleField, descriptionField, datePicker, ssn, address1, address2, city, state, zip) }}>{ id!=undefined&&id!=""?"Update":"Create"}</Button>
          </Grid>
              
                <Grid >
                <Button variant='contained' onClick={(e) => { handleClose("notaction",titleField,descriptionField,datePicker,ssn,address1,address2,city,state,zip) }}>Cancel</Button>
              </Grid>
              
            </Grid>
            </Box>
          </Box>):""}
    </Drawer>
    </div>
    </>
  );
}