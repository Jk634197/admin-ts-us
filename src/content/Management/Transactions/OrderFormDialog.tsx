import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
export default function OrderFormDialog({ open, handleClickOpen,id, handleClose ,title,description}) {
 
    const [titleField, setTitleField] = useState(title)
    const [descriptionField,setDescriptionField]=useState(description)
  return (
    <div>
      <Dialog open={open} onClose={(e) => { handleClose(id,titleField,descriptionField) }}>
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
                  <TextField
                          autoFocus
            margin="dense"
                      id="outlined-search"
                      label="Project Title"
                      type="search"
                      defaultValue={titleField}
            fullWidth
               onChange={(e) => setTitleField(e.target.value)}
                    />
                  <TextField
                                                autoFocus
            margin="dense"
          id="outlined-multiline-static"
          label="Project Description"
            multiline
             onChange={(e) => setDescriptionField(e.target.value)}
                      rows={4}
                      defaultValue={descriptionField}
                      fullWidth
        />                  
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => { handleClose(id,titleField,descriptionField) }}>Cancel</Button>
          <Button onClick={(e) => { handleClose(id,titleField,descriptionField) }}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}