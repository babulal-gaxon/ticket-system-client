import React, {Component} from 'react';
import Dropzone from "react-dropzone";
import {Avatar, Button} from "antd";
import PropTypes from "prop-types";
import AddCustomerAddress from "./AddCustomerAddress";

class CustomerImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      profile_pic: null,
      type: null,
      title: ""
    }
  }

  onDrop = files => {
    files.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    this.setState({
      file: files[0],
      profile_pic: files[0].preview,
      type: files[0].type,
      title: files[0].name
    });
  };

  onUploadImage = () => {
    const data = new FormData();
    data.append('file', this.state.file);
    data.append('title', this.state.title);
    this.props.onAddImage(data);
  };

  render() {
    console.log("image data", this.props.imageAvatar)
    const {file, profile_pic} = this.state;
    const imageAvatar = this.props.imageAvatar
    return (
      <div>
        {!profile_pic ?
          <div>
            <Dropzone onDrop={this.onDrop}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />-
                    <Avatar className="gx-mr-3 gx-size-200"
                            src={imageAvatar ? imageAvatar.src : "https://via.placeholder.com/150x150"}/>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          :
          <div>
            <div>
              <Avatar className="gx-mr-3 gx-size-200" src={file ? file.preview : ""}/>
              <Button type="link" onClick={() => {
                this.setState({
                  profile_pic: '',
                  type: ''
                })
              }}>Change</Button>
            </div>
          </div>
        }
        <Button type="primary" className="gx-mt-5 gx-mr-2" onClick={this.onUploadImage}>Set Profile Image</Button>
      </div>
    )
  }
}

export default CustomerImageUpload;

CustomerImageUpload.defaultProps = {
  imageAvatar: null
};

CustomerImageUpload.propTypes = {
  imageAvatar: PropTypes.object
};