import SingleCourseCard from '@components/cards/SingleCourseCard';
import SingleCourseLessons from '@components/cards/SingleCourseLessons';
import PreviewModal from '@components/modals/PreviewModal';

import axios from 'axios';
import { Context } from '../../context';
import { useRouter } from 'next/router';

import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';

const SingleCourse = ({ course }) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [enroll, setEnroll] = useState({});
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user && course) {
      checkEnrollment();
    }
  }, [user, course]);

  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
    console.log(data);
    setEnroll(data);
  };

  const handleFreeEnrollment = async (e) => {
    e.preventDefault();

    if (!user) router.push('/login');
    if (enroll.status) return router.push(`/user/course/${enroll.course.slug}`);
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/free-enrollment/${course._id}`);
      toast.success(data.message);
      setLoading(false);
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      console.log(err);
      toast.error('Enrollment Faild');
      setLoading(false);
    }
  };
  return (
    <>
      <SingleCourseCard
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        user={user}
        loading={loading}
        handleFreeEnrollment={handleFreeEnrollment}
        enroll={enroll}
        setEnroll={setEnroll}
      />
      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
      />
      {course?.lessons && (
        <SingleCourseLessons
          lessons={course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);

  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;
