import React, {Component} from 'react';
import {Button, Form, Input, Modal} from "antd/lib/index";

const {TextArea} = Input;

class AddStaffNotes extends Component {
  constructor(props) {
    super(props);
    if (this.props.noteId === null) {
      this.state = {
        title: "",
        content: ""
      };
    } else {
      const selectedNote = this.props.staffNotes.find(note => note.id === this.props.noteId);
      this.state = {...selectedNote};
    }
  };

  onNotesAdd = () => {
    if (this.props.noteId === null) {
      this.props.onAddStaffNote(this.props.staffId, {...this.state});
    } else {
      this.props.onEditStaffNotes({...this.state});
    }
    this.props.onToggleAddNoteModal();
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onNotesAdd();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {title, content} = this.state;
    const {addNotesModal, onToggleAddNoteModal, noteId} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={addNotesModal}
          title={noteId === null ? "Add New Note" : "Edit Note Details"}
          onCancel={() => onToggleAddNoteModal()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddNoteModal()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                initialValue: title,
                rules: [{required: true, message: 'Please Enter Title!'}],
              })(<Input type="text" onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Description">
              <TextArea rows={4} className="gx-form-control-lg" value={content} onChange={(e) => {
                this.setState({content: e.target.value})
              }}/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

AddStaffNotes = Form.create({})(AddStaffNotes);

export default AddStaffNotes;