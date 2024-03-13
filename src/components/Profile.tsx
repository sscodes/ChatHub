import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { userType } from '../types/types';
import Input from './Input';

const Profile = () => {
  const [usernameAsForm, setUsernameAsForm] = useState<boolean>(false);
  const [DPAsForm, setDPAsForm] = useState<boolean>(false);
  const [DPHover, setDPHover] = useState<boolean>(false);

  // @ts-ignore
  const { currentUser }: userType = useContext(AuthContext);

  const handleRef = (ref: any) => {
    ref.focus();
  };

  return (
    <div>
      <Grid container>
        <Grid
          item
          xs={12}
          display={'flex'}
          justifyContent={'center'}
          position={'relative'}
        >
          {currentUser?.photoURL && (
            <Avatar
              src={currentUser?.photoURL}
              style={{ width: 200, height: 200 }}
              onMouseEnter={() => setDPHover(true)}
            />
          )}
          {DPHover && (
            <div className='changeDP' onMouseLeave={() => setDPHover(false)}>
              <EditIcon
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: '40%',
                  fontSize: '2.4rem',
                  color: 'blanchedalmond',
                }}
                onClick={() => setDPAsForm(true)}
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12} display={'flex'} justifyContent={'center'} mt={2}>
          <Typography
            display={'flex'}
            alignItems={'center'}
            color={'blanchedalmond'}
            variant='h4'
            fontFamily={'lato'}
            fontWeight={700}
            position={'relative'}
          >
            {!usernameAsForm && (
              <Box
                onClick={() => setUsernameAsForm(true)}
                style={{ cursor: 'pointer' }}
                height={45}
                width={200}
                display={'flex'}
                justifyContent={'center'}
              >
                {currentUser?.displayName}
              </Box>
            )}
            {usernameAsForm && currentUser?.displayName && (
              <Box
                height={45}
                width={200}
                display={'flex'}
                justifyContent={'center'}
              >
                <Input
                  label='Username'
                  type='text'
                  name='username'
                  value={currentUser.displayName}
                  onChange={() => {}}
                  onBlur={() => setUsernameAsForm(false)}
                  refProp={handleRef}
                />
              </Box>
            )}
          </Typography>
        </Grid>
        {(usernameAsForm || DPAsForm) && (
          <Grid item xs={12} display={'flex'} justifyContent={'center'} mt={3}>
            <Button
              variant='contained'
              style={{
                backgroundColor: 'rgb(246, 215, 169)',
                color: 'indigo',
              }}
            >
              <b>Update</b>
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Profile;
