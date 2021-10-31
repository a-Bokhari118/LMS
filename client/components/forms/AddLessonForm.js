import { ClockCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Button, Progress, Tooltip } from 'antd';

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleVideo,
  progress,
  handleVideoRemove,
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleAddLesson}>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          placeholder="Title"
          autoFocus
          required
        />

        <textarea
          cols="7"
          rows="7"
          className="form-control mt-3"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={values.content}
          placeholder="Content"
        ></textarea>

        <div className="d-flex justify-content-center">
          <label className="btn btn-dark w-100 text-left mt-3">
            {uploadButtonText}
            <input type="file" accept="video/*" hidden onChange={handleVideo} />
          </label>

          {!uploading && values.video.Location && (
            <Tooltip title="Remove">
              <span
                onClick={handleVideoRemove}
                className="pt-1 "
                style={{ paddingLeft: '10px', cursor: 'pointer' }}
              >
                <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4" />
              </span>
            </Tooltip>
          )}
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}

        <Button
          onClick={handleAddLesson}
          className=" mt-3 w-100"
          size="large"
          type="primary"
          loading={uploading}
          shape="round"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default AddLessonForm;
