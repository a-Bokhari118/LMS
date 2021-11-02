import StudentRoute from '@components/routes/StudentRoute';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Avatar, Menu } from 'antd';
import { useEffect, useState } from 'react';

const SingleCourse = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({});
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

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
  return (
    <StudentRoute>
      <div className="row">
        <div style={{ maxWidth: '320px' }}>
          <Menu
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            style={{ height: 'calc(100vh - 70px)', overflowY: 'scroll' }}
          >
            {course?.lessons?.map((lesson, index) => (
              <Menu.Item
                key={index}
                icon={<Avatar>{index + 1}</Avatar>}
                onClick={() => setClicked(index)}
              >
                {lesson.title.substring(0, 30)}
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <div className="col">
          {clicked !== -1 ? (
            <>{JSON.stringify(course?.lessons[clicked])}</>
          ) : (
            <>{JSON.stringify(course?.lessons?.[0])}</>
          )}
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
