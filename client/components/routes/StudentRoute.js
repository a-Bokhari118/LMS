import { SyncOutlined } from '@ant-design/icons';
import UserNav from '@components/nav/UserNav';
import axios from 'axios';
import { useEffect, useState } from 'react';

const StudentRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/current-user');
        if (data.ok) setOk(true);
      } catch (err) {
        console.log(err);
        setOk(false);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <>
          <div className="container-fluid px-5 py-2">{children}</div>
        </>
      )}
    </>
  );
};

export default StudentRoute;
