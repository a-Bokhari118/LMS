import { ClockCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Button, Progress, Switch, Tooltip } from 'antd';
import ReactPlayer from 'react-player';
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

        <div>
          {!uploading && current.video && current.video.Location && (
            <div className="pt-2 d-flex justify-content-center">
              <ReactPlayer
                url={current.video.Location}
                width="445px"
                height="255px"
                controls
              />
            </div>
          )}

          <label className="btn btn-dark w-100 text-left mt-3">
            {uploadVideoButtonText}
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={handleUpload}
            />
          </label>
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
          <Switch
            className="mt-2"
            style={{ marginLeft: 'auto' }}
            disabled={uploading}
            defaultChecked={current.free_preview}
            name="free_preview"
            onChange={(v) => setCurrent({ ...current, free_preview: v })}
          />
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
