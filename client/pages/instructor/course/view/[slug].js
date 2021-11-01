import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import InstructorRoute from '@components/routes/InstructorRoute';
import axios from 'axios';
import { Avatar, Button, Modal, Tooltip, List } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  QuestionOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import AddLessonForm from '@components/forms/AddLessonForm';
import { toast } from 'react-toastify';
import Item from 'antd/lib/list/Item';

const CourseView = () => {
  const [course, setCourse] = useState({});
  const router = useRouter();
  const { slug } = router.query;

  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState('Upload Video');
  const [progress, setProgress] = useState(0);
  const [values, setValues] = useState({
    title: '',
    content: '',
    video: {},
  });
  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course?.instructor?._id}`,
        values
      );
      setValues({ ...values, title: '', content: '', video: {} });
      setVisible(false);
      setUploadButtonText('Upload Video');
      setCourse(data);
      console.log(data);
      toast.success('Lesson Added Successfuly');
    } catch (err) {
      console.log(err);
      toast.error('lesson faild');
    }
  };

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append('video', file);
      // progress bar
      const { data } = await axios.post(
        `/api/course/video-upload/${course?.instructor?._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );

      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (err) {
      console.log(err);
      toast.error('Uploading Faild, try again!');
      setUploading(false);
    }
  };

  const handleVideoRemove = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/remove-video/${course?.instructor?._id}`,
        values.video
      );
      console.log(data);
      setValues({ ...values, video: {} });
      setUploading(false);
      setUploadButtonText('Upload Video');
    } catch (err) {
      console.log(err);
      toast.error('Removing Faild, try again!');
      setUploading(false);
    }
  };

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        'Are you Sure you want to publish this course?'
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/publish/${courseId}`);
      toast.success('Your course is live');
    } catch (err) {
      console.log(err);
      toast.error('Publish Faild, try again!');
    }
  };

  const handleUnpublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        'Are you Sure you want to Unpublish this course?'
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);
      toast.success('Your course is not live');
    } catch (err) {
      console.log(err);
      toast.error('unpublish Faild, try again!');
    }
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
                    onClick={() =>
                      router.push(`/instructor/course/edit/${slug}`)
                    }
                  />
                </Tooltip>

                {course?.lessons?.length < 5 ? (
                  <Tooltip title="Min 5 lessons required to publish">
                    <QuestionOutlined className="h5 pointer text-danger" />
                  </Tooltip>
                ) : course.published ? (
                  <Tooltip title="Unpublish">
                    <CloseOutlined
                      className="h5 pointer text-danger"
                      onClick={(e) => handleUnpublish(e, course._id)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Publish">
                    <CheckOutlined
                      className="h5 pointer text-success"
                      onClick={(e) => handlePublish(e, course._id)}
                    />
                  </Tooltip>
                )}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <h3>Course Description</h3>
                <ReactMarkdown children={course?.description} />
              </div>
            </div>
            <br />
            <div className="row">
              <Button
                onClick={() => setVisible(true)}
                className="col-md-6 offset-md-3 text-center"
                type="primary"
                shape="round"
                icon={<UploadOutlined />}
                size="large"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Add Lesson
              </Button>
            </div>

            <Modal
              title="Add Lesson"
              centered
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <AddLessonForm
                values={values}
                setValues={setValues}
                handleAddLesson={handleAddLesson}
                uploading={uploading}
                uploadButtonText={uploadButtonText}
                handleVideo={handleVideo}
                progress={progress}
                handleVideoRemove={handleVideoRemove}
              />
            </Modal>

            <div className="row pb-5">
              <div className="col lesson-list">
                <h4>{course?.lessons?.length} Lessons</h4>
                <List
                  itemLayout="horizontal"
                  dataSource={course?.lessons}
                  renderItem={(item, index) => (
                    <Item>
                      <Item.Meta
                        className="d-flex align-items-center "
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.title}
                      ></Item.Meta>
                    </Item>
                  )}
                ></List>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
