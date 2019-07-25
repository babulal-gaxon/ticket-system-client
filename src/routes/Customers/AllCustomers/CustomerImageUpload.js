import React, {Component} from 'react';
import {Avatar, Button, Upload} from "antd";
import PropTypes from "prop-types";

class CustomerImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    }
  }

  onLogoSelect = () => {
    let file = this.state.fileList[0];
    const data = new FormData();
    data.append('file', file);
    data.append('title', file.name);
    this.props.onAddImage(data);
  };

  render() {
    const imageAvatar = this.props.imageAvatar;
    const {fileList} = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice(-1);
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        if (fileList.length > 0) {
          props.onRemove(fileList[0])
        }
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    return (
      <div className="gx-main-layout-content">
        <Upload {...props}>
          <Avatar className="gx-size-200"
                  src={this.state.fileList.length > 0 ? URL.createObjectURL(this.state.fileList[0]) : imageAvatar}/>
        </Upload>
        <Button type="primary" className="gx-mt-5 gx-ml-4" onClick={this.onLogoSelect}>Add Profile Image</Button>
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