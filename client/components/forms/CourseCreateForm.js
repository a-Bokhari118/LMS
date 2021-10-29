import { Select, Button, Avatar, Badge } from 'antd';

const { Option } = Select;

const CourseCreateForm = ({
  handleSubmit,
  handleChange,
  handleImage,
  handleImageRemove,
  values,
  setValues,
  preview,
}) => {
  const children = [];
  for (let i = 5.99; i <= 100.99; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group pt-3">
        <textarea
          name="description"
          cols="5"
          rows="5"
          className="form-control"
          placeholder="Course Description"
          value={values.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-row ">
        <div className="col">
          <div className="form-group pt-3 ">
            <Select
              onChange={(v) => setValues({ ...values, paid: !values.paid })}
              value={values.paid}
              style={{ width: '100%' }}
              size="large"
            >
              <Option value={true}>Paid</Option>
              <Option value={false}>Free</Option>
            </Select>
          </div>
        </div>
        {values.paid && (
          <div className="form-group pt-3">
            <Select
              defaultValue="$9.99"
              style={{ width: '100%' }}
              onChange={(v) => setValues({ ...values, price: v })}
              tokenSeparators={[,]}
              size="large"
            >
              {children}
            </Select>
          </div>
        )}
      </div>

      <div className="form-group pt-3">
        <input
          type="text"
          name="category"
          className="form-control"
          placeholder="Category"
          value={values.category}
          onChange={handleChange}
        />
      </div>

      <div className="form-row pt-3">
        <div className="col">
          <div className="form-group">
            <label className="btn btn-outline-secondary btn-block text-left">
              {values.loading ? 'Uploading...' : 'Upload Image'}
              <input
                type="file"
                name="image"
                onChange={handleImage}
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>

        {preview && (
          <Badge
            count="X"
            onClick={handleImageRemove}
            className="mt-3"
            style={{ cursor: 'pointer' }}
          >
            <Avatar size="large" width={200} src={preview} />
          </Badge>
        )}
      </div>

      <div className="row pt-3">
        <div className="col">
          <Button
            onClick={handleSubmit}
            disabled={values.loading || values.uploading}
            className="btn btn-primary"
            type="primary"
            size="large"
            shape="round"
            loading={values.loading}
          >
            {values.loading ? 'Saving...' : 'Save & Continue'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CourseCreateForm;
