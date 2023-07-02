import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import OrderFormDialog from './OrderFormDialog';

function PageHeader({open,handleClose,id,handleClickOpen}) {
  
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg',
  };

  return (
    <Grid container style={{ position: 'sticky', top: 0 }} justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Projects
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
          Create Project
        </Button>
        <OrderFormDialog open={open} id={id} handleClose={handleClose} handleClickOpen={handleClickOpen} title={"Project Title"} description={"Project Description"} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
