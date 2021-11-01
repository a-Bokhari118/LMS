import { List, Avatar } from 'antd';
const { Item } = List;
const SingleCourseLessons = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
  preview,
}) => {
  return (
    <div className="container mt-3">
      <h1>Course Content</h1>
      <div className="row">
        <div className="col lesson-list">
          {lessons && <h4>{lessons?.length} Lessons</h4>}
          <hr />
          <List
            itemLayout="horizontal"
            dataSource={lessons}
            renderItem={(item, index) => (
              <Item>
                <Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                />
                {item?.video && item?.video !== null && item.free_preview && (
                  <span
                    onClick={() => {
                      setPreview(item.video.Location);
                      setShowModal(!showModal);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    Preview
                  </span>
                )}
              </Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCourseLessons;
