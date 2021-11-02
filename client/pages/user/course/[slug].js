import StudentRoute from '@components/routes/StudentRoute';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Avatar, Menu } from 'antd';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown';
import { CheckCircleFilled, MinusCircleFilled } from '@ant-design/icons';

const SingleCourse = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [clicked, setClicked] = useState(-1);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  useEffect(() => {
    if (course) loadCompletedLessons();
  }, [course]);

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });
    console.log('completed lessons', data);
    setCompleted(data);
  };

  const loadCourse = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user/course/${slug}`);
      setCourse(data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course?.lessons[clicked]?._id,
    });
    console.log(data);
  };
  return (
    <StudentRoute>
      <div className="row ">
        <div style={{ maxWidth: 320 }}>
          <Menu
            defaultSelectedKeys={[clicked]}
            style={{ height: 'calc(100vh - 70px)', overflowY: 'scroll' }}
          >
            {course?.lessons?.map((lesson, index) => (
              <Menu.Item
                key={index}
                icon={<Avatar>{index + 1}</Avatar>}
                onClick={() => setClicked(index)}
              >
                {lesson.title.substring(0, 30)}
                {completed.includes(lesson._id) ? (
                  <CheckCircleFilled
                    className="float-right text-primary ml-2"
                    style={{ marginTop: '13px', marginLeft: '10px' }}
                  />
                ) : (
                  <MinusCircleFilled
                    className="float-right text-danger"
                    style={{ marginTop: '13px', marginLeft: '10px' }}
                  />
                )}
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <div className="col">
          {clicked !== -1 ? (
            <>
              <div className="alert alert-primary d-flex justify-content-between align-items-center">
                <b>{course?.lessons?.[clicked]?.title.substring(0, 30)}</b>
                {completed.includes(course.lessons[clicked]._id) ? (
                  <span onClick={markIncompleted} className="pointer">
                    Mark as InCompleted
                  </span>
                ) : (
                  <span onClick={markCompleted} className="pointer">
                    Mark as Completed
                  </span>
                )}
              </div>
              {course?.lessons?.[clicked]?.video?.Location && (
                <>
                  <div className="wrapper">
                    <ReactPlayer
                      url={course?.lessons?.[clicked]?.video?.Location}
                      className="player"
                      playing={true}
                      width="100%"
                      height="100%"
                      controls
                    />
                  </div>

                  <hr />
                </>
              )}

              {course?.lessons?.[clicked]?.content && (
                <ReactMarkdown
                  children={course?.lessons?.[clicked]?.content}
                  className="singlePost"
                />
              )}
            </>
          ) : (
            <>
              <div className="alert alert-primary d-flex justify-content-between align-items-center">
                <b>{course?.lessons?.[0]?.title.substring(0, 30)}</b>
                <span onClick={markCompleted} className="pointer">
                  Mark as Completed
                </span>
              </div>
              {course?.lessons?.[0]?.video?.Location && (
                <>
                  <div className="wrapper">
                    <ReactPlayer
                      url={course?.lessons?.[0]?.video?.Location}
                      className="player"
                      playing={true}
                      width="100%"
                      height="100%"
                      controls
                    />
                  </div>

                  <hr />
                </>
              )}

              {course?.lessons?.[0]?.content && (
                <ReactMarkdown
                  children={course?.lessons?.[0]?.content}
                  className="singlePost"
                />
              )}
            </>
          )}
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
