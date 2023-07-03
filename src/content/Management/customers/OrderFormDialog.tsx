import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import DatePicker from '@/components/DatePicker';
import {DateField}  from '@mui/x-date-pickers';
export default function OrderFormDialog({ open, handleClickOpen,id,ssnIs,address1Is,address2Is,cityIs,stateIs,zipIs, date,handleClose ,title,description}) {
 
    const [titleField, setTitleField] = useState(title)
  const [descriptionField, setDescriptionField] = useState(description)
  const [datePicker, setDate] = useState(date)
  const [ssn, setSsn] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  React.useEffect((e => {
    console.log(datePicker)
  }),[datePicker])
  console.log(title+" "+id+" "+description)
  return (
    <div>
      <Dialog open={open} onClose={(e) => { handleClose(id,titleField,descriptionField) }}>
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
                  <TextField
                          autoFocus
            margin="dense"
                      id="outlined-search"
                      label="First Name"
                      type="search"
            defaultValue={title}

            fullWidth
               onChange={(e) => setTitleField(e.target.value)}
                    />
                  <TextField
                                                autoFocus
            margin="dense"
          id="outlined-search"
          label="Last Name"
            multiline
             onChange={(e) => setDescriptionField(e.target.value)}
                      rows={4}
                      defaultValue={description}
                      fullWidth
          />           
          <TextField
                                                autoFocus
            margin="dense"
          id="outlined-search"
          label="ssn"
            multiline
             onChange={(e) => setSsn(e.target.value)}
                      defaultValue={ssnIs}
                      fullWidth
          />           
        <TextField
                                                autoFocus
            margin="dense"
          id="outlined-multiline-static"
          label="address 1"
            multiline
             onChange={(e) => setAddress1(e.target.value)}
                      rows={4}
                      defaultValue={address1Is}
                      fullWidth
          />        
        <TextField
                                                autoFocus
            margin="dense"
          id="outlined-multiline-static"
          label="address 2"
            multiline
             onChange={(e) => setAddress2(e.target.value)}
                      rows={4}
                      defaultValue={address2Is}
                      fullWidth
          />   
        <TextField
                                                autoFocus
            margin="dense"
          id="outlined-multiline-static"
          label="city"
            multiline
             onChange={(e) => setCity(e.target.value)}
                      rows={4}
                      defaultValue={cityIs}
                      fullWidth
          />     
          <TextField
                                                autoFocus
            margin="dense"
          id="outlined-multiline-static"
          label="state"
            multiline
             onChange={(e) => setState(e.target.value)}
                      rows={4}
                      defaultValue={stateIs}
                      fullWidth
          />  
          {/* <TextField
                                                autoFocus
            margin="dense"
          id="outlined-multiline-static"
          label="country"
            multiline
             onChange={(e) => s(e.target.value)}
                      rows={4}
                      defaultValue={description}
                      fullWidth
          />  */}
        <TextField
                                                autoFocus
            margin="dense"
          id="outlined-multiline-static"
          label="zip code"
            multiline
             onChange={(e) => setZip(e.target.value)}
                      rows={4}
                      defaultValue={zipIs}
                      fullWidth
          />   
          <DatePicker datePicker={datePicker } setDate={setDate } />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={(e) => { handleClose("notaction",titleField,descriptionField) }}>Cancel</Button>
          <Button onClick={(e) => { handleClose(id,titleField,descriptionField) }}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}