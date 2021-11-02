import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SingleCourse = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });

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
    <div>
      <pre>{JSON.stringify(course, null, 4)}</pre>
    </div>
  );
};

export default SingleCourse;
