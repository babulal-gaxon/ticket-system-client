import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio} from "antd";
import PropTypes from "prop-types";


class AddNewResponses extends Component {
  constructor(props) {
    super(props);
    if(this.props.responseId === 0 ) {
      this.state = {
        short_title: "",
        short_code: "",
        message: "",
        status: ""
      };
    }
    else {
        const selectedResponse = this.props.responses.find(response => response.id === this.props.responseId);
        console.log("SelectedResponse", selectedResponse);
        const {short_title, short_code, message, status} = selectedResponse;
      this.state = {
        short_title: short_title,
        short_code: short_code,
        message: message,
        status: status
      };
    }
  };
  onResponseAdd = () => {
    if (this.props.responseId === 0) {
      const newResponse = {
        short_title: this.state.short_title,
        short_code: this.state.short_code,
        message: this.state.message,
        status: this.state.status
      };
      this.props.onAddCannedResponse(newResponse);
    } else {
      const newResponse = {
        short_title: this.state.short_title,
        short_code: this.state.short_code,
        message: this.state.message,
        status: this.state.status,
        id: this.props.responseId
      };
      this.props.onEditCannedResponse(newResponse);
    }
  };
  render() {
    const {short_title, short_code, message, status} = this.state;
    const {showAddCanned, onToggleAddCanned} = this.props;
    return (
      <div>
        <Modal
          visible={showAddCanned}
          title="Add New Response"
          onCancel={onToggleAddCanned}
          footer={[
            <Button key="submit" type="primary" onClick={this.onResponseAdd}>
              {this.props.responseId === 0 ? "Add" : "Edit"}
            </Button>,
            <Button key="cancel" onClick={onToggleAddCanned}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Short Title">
              <Input type="text" value={short_title} onChange={(e) => {
                this.setState({short_title: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="Short Code">
              <Input type="text" value={short_code} onChange={(e) => {
                this.setState({short_code: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="Message">
              <Input className="gx-form-control-lg" type="textarea" value={message} onChange={(e) => {
                this.setState({message: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="Status">
              <Radio.Group value={status} onChange={(e) => {
                this.setState({status: e.target.value})
              }}>
                <Radio value={1}>Active</Radio>
                <Radio value={0}>Disabled</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default AddNewResponses;


AddNewResponses.defaultProps = {
  showAddCanned: true,
  responseId: 0,
  responses: []
};

AddNewResponses.propTypes = {
  showAddCanned: PropTypes.bool,
  responseId: PropTypes.number,
  responses: PropTypes.array,
  onToggleAddCanned: PropTypes.func,
  onAddCannedResponse: PropTypes.func,
  onEditCannedResponse: PropTypes.func
};