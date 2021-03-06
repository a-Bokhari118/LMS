import { LoadingOutlined, SafetyOutlined } from '@ant-design/icons';
import { Badge, Button } from 'antd';
import ReactPlayer from 'react-player';
import { currencyFormatter } from '../../utils/helpers';

const SingleCourseCard = ({
  course,
  showModal,
  setShowModal,
  preview,
  setPreview,
  handleFreeEnrollment,
  handlePaidEnrollment,
  loading,
  user,
  enroll,
  setEnroll,
}) => {
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;

  return (
    <div
      className="p-5"
      style={{
        background:
          'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(14,125,175,1) 35%, rgba(0,212,255,1) 100%)',
        minHeight: '30vh',
      }}
    >
      <div className="row container mx-auto">
        <div className="col-md-8 ">
          <div style={{ width: '60%' }}>
            <h1 className="text-light font-weigth-bold">{name}</h1>
            <p className="lead text-white">
              {description?.substring(0, 180)}...
            </p>
            <Badge count={category} style={{ padding: '0px 20px' }} />
            <p className="text-light mt-3 p-2">Created by: {instructor.name}</p>
            <p className="text-light mt-2 p-2">
              Last Update in {new Date(updatedAt).toLocaleDateString()}
            </p>
            <h4 className="text-light">
              {paid
                ? currencyFormatter({
                    amount: price,
                    currency: 'usd',
                  })
                : 'Free'}
            </h4>
          </div>
        </div>
        <div className="col-md-4">
          {lessons[0]?.video?.Location ? (
            <div
              onClick={() => {
                setPreview(lessons[0]?.video?.Location);
                setShowModal(!showModal);
              }}
            >
              <ReactPlayer
                className="react-player-div"
                url={lessons[0]?.video?.Location}
                light={image.Location}
                width="100%"
                height="225px"
              />
            </div>
          ) : (
            <>
              <img src={image?.Location} alt={name} className="img img-fluid" />
            </>
          )}

          {loading ? (
            <div className="d-flex justify-content-center">
              <LoadingOutlined className="h1 text-danger" />
            </div>
          ) : (
            <Button
              className="mt-4"
              type="danger"
              block
              shape="round"
              icon={<SafetyOutlined />}
              size="large"
              disabled={loading}
              onClick={handleFreeEnrollment}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {user
                ? enroll.status
                  ? 'Go To Course'
                  : 'Enroll'
                : 'Login to Enroll'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCourseCard;
