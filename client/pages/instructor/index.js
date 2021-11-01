import InstructorRoute from '@components/routes/InstructorRoute';
import axios from 'axios';
import { Context } from '../../context';
import { useContext, useEffect, useState } from 'react';
import { Avatar, Tooltip } from 'antd';
import Link from 'next/link';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data } = await axios.get('/api/instructor-courses');
      setCourses(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <InstructorRoute>
      <div className="p-5 mb-4 bg-primary text-center square">
        Instructor Dashboard
      </div>

      {courses?.map((course) => (
        <>
          <div className="d-flex pt-2 align-items-center ">
            <div style={{ marginRight: '15px' }}>
              <Avatar
                size={80}
                src={course.image ? course.image.Location : '/coures.png'}
              />
            </div>

            <div className=" pl-2 " style={{ width: '100%' }}>
              <div className="row d-flex ">
                <div className="col ">
                  <div className="d-flex flex-column  pl-3 ">
                    <Link
                      href={`/instructor/course/view/${course.slug}`}
                      className="pointer"
                    >
                      <a className="mt-2 text-primary">
                        <h5>{course.name}</h5>
                      </a>
                    </Link>
                    <p>
                      <b>{course.lessons.length} Lessons</b>
                    </p>

                    {course.lessons.length < 5 ? (
                      <p className="text-warning">
                        At least 5 lessons are required to publish a course
                      </p>
                    ) : course.published ? (
                      <p className="text-success">Your course is Live!</p>
                    ) : (
                      <p className="text-success">
                        Your course is ready to be published
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-3 mt-3 justify-content-end ">
                  {course.published ? (
                    <Tooltip title="Published">
                      <CheckCircleOutlined className="h5 pointer text-success" />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Unpublished">
                      <CloseCircleOutlined className="h5 pointer text-warning" />
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </InstructorRoute>
  );
};

export default InstructorIndex;
