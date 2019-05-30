import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio, Select} from "antd";

class AddNewResponses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      short_title: "",
      short_code: "",
      message: "",
      status: ""
    }
  }

  render() {
    const {short_title, short_code, message, status} = this.state;
    const {showAddCanned, onToggleAddCanned, onAddCannedResponse} = this.props;
    const {Option} = Select;

    return (

      <div>

        <Modal
          visible={showAddCanned}
          title="Add New Response"
          onCancel={onToggleAddCanned}
          footer={[
            <Button key="submit" type="primary" onClick={() => {
              onAddCannedResponse(this.state)}}>
              Add
            </Button>,
            <Button key="cancel" onClick={onToggleAddCanned}>
              Cancel
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Short Title">
              <Input type="text"  value={short_title} onChange={(e) => {
                this.setState({short_title: e.target.value})
              }}/>
            </Form.Item>

            <Form.Item label="Short Code">
              <Input type="text"  value={short_code} onChange={(e) => {
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

export default AddNewResponses