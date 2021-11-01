import { ClockCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Button, Progress, Tooltip } from 'antd';

const UpdateLessonForm = ({
  current,
  setCurrent,
  handleUpdateLesson,
  uploading,
  uploadVideoButtonText,
  handleUpload,
  progress,
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleUpdateLesson}>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setCurrent({ ...current, title: e.target.value })}
          value={current.title}
          autoFocus
          required
        />

        <textarea
          cols="7"
          rows="7"
          className="form-control mt-3"
          onChange={(e) => setCurrent({ ...current, content: e.target.value })}
          value={current.content}
        ></textarea>

        <div className="d-flex justify-content-center">
          <label className="btn btn-dark w-100 text-left mt-3">
            {uploadVideoButtonText}
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={handleUpload}
            />
          </label>

          {!uploading && current.video && current.video.Location && (
            <div className="pt-2 d-flex justify-content-center">
              show video player
            </div>
          )}
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}

        <div className="d-flex justfiy-content-between">
          <span className="pt-3 badge text-secondary">Preview</span>
        </div>

        <Button
          onClick={handleUpdateLesson}
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

export default UpdateLessonForm;
