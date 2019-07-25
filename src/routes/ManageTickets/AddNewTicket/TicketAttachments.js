import React, {Component} from 'react';
import {Upload} from "antd";
import PropTypes from "prop-types";

const {Dragger} = Upload;

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  //flexWrap: 'wrap',
  marginTop: 16,
  overflow: "hidden"
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

class Testing extends Component {
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

  onThumbShow = () => {
    return this.state.fileList.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={URL.createObjectURL(file)}
            alt=""
            style={img}
          />
        </div>
      </div>
    ));
  };

  render() {
    const {fileList} = this.state;
    const props = {
      multiple: true,
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        }, () => this.props.onSelectFiles(this.state.fileList));
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }), () => this.props.onSelectFiles(this.state.fileList));
        return false;
      },
      fileList,
    };
    return (
      <div className="gx-main-layout-content">
        <Dragger {...props}>
          {this.state.fileList.length === 0 ?
            <span>Drag 'n' drop files to upload</span> : null}
          <aside style={thumbsContainer}>
            {this.onThumbShow()}
          </aside>
        </Dragger>
      </div>
    )
  }
}

export default Testing;

Testing.defaultProps = {
  imageAvatar: null
};

Testing.propTypes = {
  imageAvatar: PropTypes.object
};