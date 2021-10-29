import { SyncOutlined } from '@ant-design/icons';
import InstructorNav from '@components/nav/InstructorNav';
import UserNav from '@components/nav/UserNav';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const InstructorRoute = ({ children }) => {
  const router = useRouter();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const { data } = await axios.get('/api/current-instructor');
        if (data.ok) setOk(true);
      } catch (err) {
        console.log(err);
        setOk(false);
        router.push('/');
      }
    };
    fetchInstructor();
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
          <div className="container-fluid px-5 py-2">
            <div className="row">
              <div className="col-md-2">
                <InstructorNav />
              </div>
              <div className="col-md-10">{children}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default InstructorRoute;
