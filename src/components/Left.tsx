import { Box } from '@mui/material';
import LeftNavbar from './LeftNavbar';
import Search from './Search';

const Left = () => {
  return (
    <Box bgcolor={'indigo'}>
      <LeftNavbar />
      <Search />
    </Box>
  );
};

export default Left;
