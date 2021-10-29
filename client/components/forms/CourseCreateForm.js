import { useState, useEffect } from 'react';
import { Select, Button } from 'antd';

const { Option } = Select;

const CourseCreateForm = ({
  handleSubmit,
  handleChange,
  handleImage,
  values,
  setValues,
}) => (
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

    <div className="form-row pt-3">
      <div className="col">
        <div className="form-group">
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

export default CourseCreateForm;
