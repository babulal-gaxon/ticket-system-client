import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio, Select} from "antd";

class AddNewPriority extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color_code: "",
      desc: "",
      priority_value: "",
      status: "",
      value: 0
    }
  }

  render() {
    const {name, color_code, value, desc, priority_value, status} = this.state;
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
              onAddTicketPriority(this.state)
            }}>
              Add
            </Button>,
            <Button key="cancel" onClick={onToggleAddPriority}>
              Cancel
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input type="text" value={name} onChange={(e) => {
                this.setState({name: e.target.value})
              }}/>
            </Form.Item>


            <Form.Item label="Description">
              <Input className="gx-form-control-lg" type="textarea" value={desc} onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>
            </Form.Item>

            <Form.Item label="Priority Value">
              <Input className="gx-form-control-lg" type="textarea" value={desc} onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>
            </Form.Item>

            <Form.Item label="Status">
              <Radio.Group value={value} onChange={(e) => {
                this.setState({value: e.target.value})
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