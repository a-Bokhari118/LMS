import { Button } from 'antd';

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleVideo,
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

        <label className="btn btn-dark w-100 text-left mt-3">
          {uploadButtonText}
          <input type="file" accept="video/*" hidden onChange={handleVideo} />
        </label>

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
