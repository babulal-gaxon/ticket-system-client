import React, {Component} from 'react';
import Dropzone from "react-dropzone";
import {Avatar, Button} from "antd";
import PropTypes from "prop-types";


class ImageUpload extends Component {
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
    console.log("files", files)
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
    const data = new FormData()
    data.append('file', this.state.file);
    data.append('title', this.state.title);
    this.props.onAddProfileImage(data);
  };

  render() {
    const imageAvatar = this.props.imageAvatar;
    const {file, profile_pic} = this.state;
    return (
      <div>
        {!profile_pic ?
          <div>
            <Dropzone onDrop={this.onDrop}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {imageAvatar ? <Avatar className="gx-mr-3 gx-size-200" src={imageAvatar.src}/> :
                      <Avatar className="gx-mr-3 gx-size-200" icon="user"/>}
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          :
          <div>
            <div>
              <Avatar className="gx-mr-3 gx-size-200" alt="" src={file ? file.preview : ""}/>
              <span onClick={() => {
                this.setState({
                  profile_pic: '',
                  type: ''
                })
              }}>Change</span>
            </div>
          </div>
        }
        <Button type="primary" className="gx-mt-5" onClick={this.onUploadImage}>Add Profile Image</Button>
      </div>
    )
  }
}

export default ImageUpload;

ImageUpload.defaultProps = {
  imageAvatar: null
};

ImageUpload.propTypes = {
  imageAvatar: PropTypes.object,
  onAddProfileImage: PropTypes.func,
};