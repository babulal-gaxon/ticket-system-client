import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio, Select} from "antd";

class AddNewDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      status: ""

    }
  }

  render() {
    const {name, desc, status} = this.state;
    const {showAddDepartment, onToggleAddDepartment, onAddDepartment} = this.props;
    const {Option} = Select;
    return (

      <div>

        <Modal
          visible={showAddDepartment}
          title="Add New Department"
          onCancel={onToggleAddDepartment}
          footer={[
            <Button key="submit" type="primary" onClick={() => {
              onAddDepartment(this.state)
            }}>
              Add Ticket
            </Button>,
            <Button key="cancel" onClick={onToggleAddDepartment}>
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

export default AddNewDepartment