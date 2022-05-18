import React, { Component } from "react";
import { Form, Field, reduxForm } from "redux-form";
import DropZoneField from "./dropzoneField";

const imageIsRequired = value => (!value ? "Required" : undefined);

class UploadImageForm extends Component {
  state = { imageFile: [] };

  handleFormSubmit = formProps => {
    const fd = new FormData();
    fd.append("imageFile", formProps.imageToUpload[0]);
    alert(JSON.stringify(formProps, null, 4));
    // append any additional Redux form fields
    // create an AJAX request here with the created formData
  };

  handleOnDrop = newImageFile => this.setState({ imageFile: newImageFile });

  resetForm = () => this.setState({ imageFile: [] }, () => this.props.reset());

  render = () => (
    <div className="app-container">
      <h1 className="title">Upload A Video</h1>
      <hr />
      <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
        <Field
          name="imageToUpload"
          component={DropZoneField}
          type="file"
          imagefile={this.state.imageFile}
          handleOnDrop={this.handleOnDrop}
        //   validate={[imageIsRequired]}
        />
        {/* <button
          type="submit"
          className="uk-button uk-button-primary uk-button-large"
          disabled={this.props.submitting}
        >
          Submit
        </button>
        <button
          type="button"
          className="uk-button uk-button-default uk-button-large"
          disabled={this.props.pristine || this.props.submitting}
          onClick={this.resetForm}
          style={{ float: "right" }}
        >
          Clear
        </button> */}
      </Form>
      <div className="clear" />
    </div>
  );
}

export default reduxForm({ form: "UploadImageForm" })(UploadImageForm);