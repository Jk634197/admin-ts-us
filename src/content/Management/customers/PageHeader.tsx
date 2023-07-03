import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import OrderFormDialog from './OrderFormDialog';
import moment from 'moment';

function PageHeader({open,handleClose,id,handleClickOpen}) {
  
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg',
  };

  return (
    <Grid container style={{ position: 'sticky', top: 0 }} justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Customers
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your recent Projects
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={e => { handleClickOpen("","","") }}
        >
          Create Customer
        </Button>
        <OrderFormDialog open={open} id={id} ssnIs={""} address1Is={""} address2Is={""} cityIs={""} stateIs={""} zipIs={""} date={moment()} handleClose={handleClose} handleClickOpen={handleClickOpen} title={"Project Title"} description={"Project Description"} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
