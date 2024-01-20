import LeftNavbar from './LeftNavbar';
import Inboxes from './Inboxes';
import Search from './Search';

const Left = () => {
  return (
    <div>
      <LeftNavbar />
      <Search />
      <Inboxes />
    </div>
  );
};

export default Left;
