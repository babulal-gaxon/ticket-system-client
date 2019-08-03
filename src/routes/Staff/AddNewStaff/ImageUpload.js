import React, {Component} from 'react';
import {Avatar, Button, message, Upload} from "antd";
import PropTypes from "prop-types";
import {MEDIA_BASE_URL} from "../../../constants/ActionTypes";
import {getFileExtension, getFileSize} from "../../../util/Utills";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";


class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    }
  }

  onLogoSelect = () => {
    const {messages} = this.props.intl;
    let file = this.state.fileList[0];
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('title', file.name);
      this.props.onAddProfileImage(data, this.props.context);
    } else {
      message.warning(messages["validation.message.selectImage"])
    }
  };

  getImageURL = () => {
    const {imageAvatar} = this.props;
    if (this.state.fileList.length > 0) {
      return URL.createObjectURL(this.state.fileList[0]);
    } else if (imageAvatar) {
      return MEDIA_BASE_URL + imageAvatar.src;
    } else {
      return require("assets/images/placeholder.jpg")
    }
  };

  render() {
    const {fileList} = this.state;
    const {messages} = this.props.intl;
    const props = {
      accept: getFileExtension(),
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
        const isFileSize = file.size < getFileSize();
        if (!isFileSize) {
          message.error(messages["validation.message.imageSize"]);
        } else {
          this.setState(state => ({
            fileList: [...state.fileList, file],
          }));
        }
        return false;
      },
      fileList,
    };

    return (
      <div className="gx-main-layout-content">
        <Upload {...props}>
          <Avatar className="gx-size-200"
                  src={this.getImageURL()}/>
        </Upload>
        <Button type="primary" className="gx-mt-5 gx-ml-4" onClick={this.onLogoSelect}><IntlMessages id="common.uploadProfileImage"/></Button>
      </div>
    )
  }
}

export default injectIntl(ImageUpload);

ImageUpload.defaultProps = {
  imageAvatar: null
};

ImageUpload.propTypes = {
  imageAvatar: PropTypes.object,
  onAddProfileImage: PropTypes.func,
};
