import React, {Component} from 'react';
import {Button, Form, Input, Modal} from "antd/lib/index";
import IntlMessages from "../../../../../util/IntlMessages";
import {injectIntl} from "react-intl";

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
    const {messages} = this.props.intl;
    const {title, content} = this.state;
    const {addNotesModal, currentNote, onToggleAddNoteModal} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={addNotesModal}
          title={currentNote === null ? <IntlMessages id="staff.notes.add"/> : <IntlMessages id="staff.notes.edit"/>}
          onCancel={() => onToggleAddNoteModal()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              <IntlMessages id="common.save"/>
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddNoteModal()}>
              <IntlMessages id="common.cancel"/>
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label={<IntlMessages id="common.title"/>}>
              {getFieldDecorator('title', {
                initialValue: title,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: messages["validation.message.selectTitle"]}],
              })(<Input type="text" autoFocus onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.description"/>}>
              {getFieldDecorator('content', {
                initialValue: content,
                validate: [{
                  trigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: messages["validation.labels.description"]
                    },
                  ],
                }, {
                  trigger: 'onChange',
                  rules: [
                    {
                      max: 250,
                      message: messages["common.descriptionLength"]
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

export default injectIntl(AddStaffNotes);
