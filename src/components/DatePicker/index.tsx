import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FirstComponent({ value, handleDateChange }) {
  console.log(value)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
          id="outlined-search" defaultValue={new Date(value)} sx={{m:"3px",width:"100%"}} onChange={(e)=>{handleDateChange(e)}}/>
    </LocalizationProvider>
  );
}