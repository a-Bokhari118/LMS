import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context';
import UserRoute from '@components/routes/UserRoute';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Avatar } from 'antd';
import { PlayCircleOutlined, SyncOutlined } from '@ant-design/icons';

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user-courses`);
      setCourses(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error('Loading courses faild');
    }
  };
  return (
    <UserRoute>
      {loading && (
        <SyncOutlined className="d-flex justify-content-center align-items-center display-1" />
      )}
      <h1 className="p-5 mb-4 bg-light text-center square">User Dashboard</h1>
      {courses?.map((course) => (
        <div key={course._id} className="d-flex align-items-center ">
          <div style={{ marginRight: '20px' }}>
            <Avatar
              size={80}
              shape="square"
              src={course?.image?.Location || '/course.png'}
            />
          </div>

          <div className="w-100">
            <div className="row">
              <div className="col">
                <Link href={`/user/course/${course.slug}`} className="pointer">
                  <a>
                    <h5 className="mt-2 text-primary">{course.name}</h5>
                  </a>
                </Link>
                <p style={{ marginTop: '-5px' }}>
                  {course?.lessons?.length} Lessons
                </p>
                <p
                  className="text-muted"
                  style={{ fontSize: '12px', marginTop: '-5px' }}
                >
                  by {course.instructor.name}
                </p>
              </div>
              <div className="col-md-3 mt-3 text-center">
                <Link href={`/user/course/${course.slug}`} className="pointer">
                  <a>
                    <PlayCircleOutlined
                      className="text-primary "
                      style={{ fontSize: '24px' }}
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </UserRoute>
  );
};

export default UserIndex;
