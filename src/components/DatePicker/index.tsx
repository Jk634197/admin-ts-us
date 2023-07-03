import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FirstComponent({datePicker,setDate}) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker />
    </LocalizationProvider>
  );
}