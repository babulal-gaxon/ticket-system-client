import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio, Select} from "antd";
import PropTypes from "prop-types";

class AddNewTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      message: "",
      product: "",
      priority_id: "",
      user_id: ""
    };
  };
  render() {
    const {title, message, product, priority_id, user_id} = this.state;
    const {showAddTicket, onToggleAddTicket, onAddTickets, priorities, staff} = this.props;
    const {Option} = Select;
    return (
      <div>
        <Modal
          visible={showAddTicket}
          title="Add New Ticket"
          onCancel={onToggleAddTicket}
          footer={[
            <Button key="submit" type="primary" onClick={() => {
              onAddTickets(this.state)
            }}>
              Add Ticket
            </Button>,
            <Button key="cancel" onClick={onToggleAddTicket}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Subject">
              <Input type="text" value={title} onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="Description">
              <Input className="gx-form-control-lg" type="textarea" value={message} onChange={(e) => {
                this.setState({message: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="Select Product">
              <Select defaultValue={product} onChange={(value) => {
                this.setState({product: value})
              }}>
                <Option value="demo1">Demo 1</Option>
                <Option value="demo2">Demo 2</Option>
                <Option value="demo3">Demo 3</Option>
                <Option value="demo4">Demo 4</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Set Priority">
              <Radio.Group value={priority_id} onChange={(e) => {
                this.setState({priority_id: e.target.value})
              }}>
                {priorities.map(priority =>
                  <Radio key={priority.id} value={priority.id}>{priority.name}</Radio>
                )}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Assign Ticket To">
              <Select value={user_id} style={{ width: 250}} onChange={(value) => {
                this.setState({user_id: value})
              }}>
                {staff.map(member => {
              return <Option value={member.id} key ={member.id}>{member.staff_name}</Option>
                })}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default AddNewTicket


AddNewTicket.defaultProps = {
  staff: [],
  priorities: [],
  showAddTicket: true
};

AddNewTicket.propTypes = {
  staff: PropTypes.array,
  priorities: PropTypes.array,
  onToggleAddTicket: PropTypes.func,
  onAddTickets: PropTypes.func,
  showAddTicket: PropTypes.bool
};