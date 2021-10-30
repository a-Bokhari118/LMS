import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import InstructorRoute from '@components/routes/InstructorRoute';
import axios from 'axios';
import { Avatar, Tooltip } from 'antd';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';

const CourseView = () => {
  const [course, setCourse] = useState({});
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };
  return (
    <InstructorRoute>
      <div className="container-fluid py-3">
        {course && (
          <div className="container-fluid pt-1">
            <div className="d-flex pt-2" style={{ width: '100%' }}>
              <div style={{ marginRight: '15px' }}>
                <Avatar
                  size={80}
                  src={course?.image?.Location || '/course.png'}
                />
              </div>
              <div className="pl-2 " style={{ marginRight: 'auto' }}>
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primary">{course?.name}</h5>
                    <p style={{ marginTop: '-9px' }}>
                      {course?.lessons?.length} Lessons
                    </p>
                    <p style={{ marginTop: '-14px' }}>{course.category}</p>
                  </div>
                </div>
              </div>

              <div className="d-flex">
                <Tooltip title="Edit">
                  <EditOutlined
                    className="h5  text-warning"
                    style={{ marginRight: '20px', cursor: 'pointer' }}
                  />
                </Tooltip>
                <Tooltip title="Publish">
                  <CheckOutlined
                    className="h5 pointer text-success"
                    style={{ cursor: 'pointer' }}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
