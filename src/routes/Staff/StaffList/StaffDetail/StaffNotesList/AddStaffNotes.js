import React, {Component} from 'react';
import {Button, Form, Input, Modal} from "antd/lib/index";

const {TextArea} = Input;

class AddStaffNotes extends Component {
  constructor(props) {
    super(props);
    if (this.props.currentNote === null) {
      this.state = {
        title: "",
        content: ""
      };
    } else {
      const selectedNote = this.props.currentNote;
      this.state = {...selectedNote};
    }
  };

  onNotesAdd = () => {
    if (this.props.currentNote === null) {
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
    const {addNotesModal, currentNote, onToggleAddNoteModal} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={addNotesModal}
          title={currentNote === null ? "Add New Note" : "Edit Note Details"}
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
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please Enter Title!'}],
              })(<Input type="text" autoFocus onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('content', {
                initialValue: content,
                validate: [{
                  trigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter Description!'
                    },
                  ],
                }, {
                  trigger: 'onChange',
                  rules: [
                    {
                      max: 250,
                      message: 'Description length should not exceed 250 characters'
                    },
                  ],
                }],
              })(<TextArea rows={4} onChange={(e) => {
                this.setState({content: e.target.value})
              }}/>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

AddStaffNotes = Form.create({})(AddStaffNotes);

export default AddStaffNotes;
