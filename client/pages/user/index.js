import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context';
import UserRoute from '@components/routes/UserRoute';
import { toast } from 'react-toastify';

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data } = await axios.get(`/api/user-courses`);
      setCourses(data);
    } catch (err) {
      console.log(err);
      toast.error('Loading courses faild');
    }
  };
  return (
    <UserRoute>
      <h1 className="p-5 mb-4 bg-light text-center square">User Dashboard</h1>
      <pre>{JSON.stringify(courses, null, 4)}</pre>
    </UserRoute>
  );
};

export default UserIndex;
