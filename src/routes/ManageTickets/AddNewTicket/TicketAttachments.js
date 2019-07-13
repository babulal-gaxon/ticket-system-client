import React, {Component} from 'react';
import Dropzone from "react-dropzone";

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
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


class TicketAttachments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFiles: []
    }
  }

  onDrop = (imageFiles) => {
    this.setState({
      imageFiles: imageFiles
    }, () => {

      this.state.imageFiles.map(image => {
        const data = new FormData();
        data.append('file', image);
        data.append('title', image.name);
        this.props.onAddAttachments(data);
      });
    });
  };

  onThumbShow = () => {
    return this.state.imageFiles.map(file => (
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
    return (
      <Dropzone onDrop={this.onDrop} style={{height:200}}>
        {({getRootProps, getInputProps}) => (
          <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <aside  style={thumbsContainer}>
                {this.onThumbShow()}
              </aside>
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>

          </section>
        )}
      </Dropzone>
    );
  }
}


export default TicketAttachments;