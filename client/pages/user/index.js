import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../context';
import UserRoute from '@components/routes/UserRoute';

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1 className="p-5 mb-4 bg-light text-center square">User Dashboard</h1>
    </UserRoute>
  );
};

export default UserIndex;
