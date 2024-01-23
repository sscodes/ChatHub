import Inbox from './Inbox';

interface InboxType {
  image: string;
  username: string;
}

const SearchedUser = ({ image, username }: InboxType) => {
  return (
    <div>
      <Inbox image={image} username={username} />
    </div>
  );
};

export default SearchedUser;
