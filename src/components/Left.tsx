import { Box } from '@mui/material';
import LeftNavbar from './LeftNavbar';
import Search from './Search';

const Left = () => {
  return (
    <Box bgcolor={'black'}>
      <LeftNavbar />
      <Search />
    </Box>
  );
};

export default Left;
