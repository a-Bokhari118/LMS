import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Context } from '../../context';

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/current-user');
        console.log(data);
        setHidden(false);
      } catch (err) {
        console.log(err);
        setHidden(true);
      }
    };
    fetchUser();
  }, []);
  return (
    <h1 className="p-5 mb-4 bg-light text-center square">
      <pre>{JSON.stringify(user)}</pre>
    </h1>
  );
};

export default UserIndex;
