import React, {Component} from "react"
import {Button, Checkbox, Form, Input, Modal, Radio, Select} from "antd";


class AddNewStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color_code: "",
      desc: "",
      status: "",
      is_default: 0,
      checked: false
    }
  }

  onCheckBoxChange = (e) => {

    this.setState({checked: e.target.checked})
    if(e.target.checked) {
      this.setState({is_default: 1})
    }
    else {
      this.setState({is_default:0})
    }
  }

  render() {
    const {name, color_code, is_default, desc, status} = this.state;
    const {showAddStatus, onToggleAddStatus, onAddTicketStatus} = this.props;
    const {Option} = Select;

    return (

      <div>

        <Modal
          visible={showAddStatus}
          title="Add New Ticket Status"
          onCancel={onToggleAddStatus}
          footer={[
            <Button key="submit" type="primary" onClick={() => {
              onAddTicketStatus(this.state)
            }}>
              Add
            </Button>,
            <Button key="cancel" onClick={onToggleAddStatus}>
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

            <Form.Item >
              <Checkbox className="gx-form-control-lg" checked={this.state.checked} onChange ={this.onCheckBoxChange}>
                Set as Default
              </Checkbox>
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

export default AddNewStatus