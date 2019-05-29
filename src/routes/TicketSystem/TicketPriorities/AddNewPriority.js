import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio, Select} from "antd";

class AddNewPriority extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color_code: "",
      message: "",
      priority_value: "",
      status: ""
    }
  }

  render() {
    const {name, short_code, color_code, message, priority_value, status} = this.state;
    const {showAddPriority, onToggleAddPriority, onAddTicketPriority} = this.props;
    const {Option} = Select;

    return (

      <div>

        <Modal
          visible={showAddPriority}
          title="Add New Priority"
          onCancel={onToggleAddPriority}
          footer={[
            <Button key="submit" type="primary" onClick={() => {
              onAddTicketPriority(this.state)}}>
              Add
            </Button>,
            <Button key="cancel" onClick={onToggleAddPriority}>
              Cancel
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Short Title">
              <Input type="text" value={name} onChange={(e) => {
                this.setState({name: e.target.value})
              }}/>
            </Form.Item>

            {/*<Form.Item label="Short Code">*/}
              {/*<Input type="text" value={short_code} onChange={(e) => {*/}
                {/*this.setState({short_code: e.target.value})*/}
              {/*}}/>*/}
            {/*</Form.Item>*/}

            <Form.Item label="Description">
              <Input className="gx-form-control-lg" type="textarea" value={message} onChange={(e) => {
                this.setState({message: e.target.value})
              }}/>
            </Form.Item>

            <Form.Item label="Priority Value">
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

export default AddNewPriority