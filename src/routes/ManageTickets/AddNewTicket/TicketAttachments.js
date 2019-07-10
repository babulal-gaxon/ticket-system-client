import React, {Component} from 'react';
import Dropzone from "react-dropzone";

class TicketAttachments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageFiles: []
    }
  }

  onDrop = (imageFiles) => {
    this.setState({
      imageFiles: imageFiles
    });
    console.log(imageFiles)
  };

  render() {

    return (
      <form>
        <Dropzone
          onDrop={this.onDrop}
          className='dropzone'
          activeClassName='active-dropzone'
          multiple={true}>
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()}>
              <input {...getInputProps({className: 'dropzone'})} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          )}
        </Dropzone>

        {this.state.imageFiles.length > 0 ? <div>
          <h2>Uploading {this.state.imageFiles.length} files...</h2>
          <div>{this.state.imageFiles.map((file) => <img src={file.preview}/>)}</div>
        </div> : null}
      </form>
    )
  }
}

export default TicketAttachments;