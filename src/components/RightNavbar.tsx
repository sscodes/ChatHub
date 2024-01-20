import { Avatar, Button, Grid, Typography } from '@mui/material';

const RightNavbar = () => {
  return (
    <Grid py={2} borderBottom={2} borderColor={'orange'} container>
      <Grid item xs={10} display={'flex'} pl={2}>
        <Avatar
          src='../../Sanket-Photo.jpeg'
          style={{ backgroundColor: 'orange', width: 37, height: 37 }}
        />
        <Typography
          display={'flex'}
          alignItems={'center'}
          color={'warning.light'}
          ml={1}
          variant='h6'
        >
          username
        </Typography>
      </Grid>
      <Grid
        xs={2}
        item
        display={'flex'}
        justifyItems={'end'}
        alignItems={'center'}
      >
        <Button variant='contained' color='warning' size='small'>
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default RightNavbar;
