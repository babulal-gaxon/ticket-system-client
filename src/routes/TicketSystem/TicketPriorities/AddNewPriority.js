import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio} from "antd";
import PropTypes from "prop-types";

class AddNewPriority extends Component {
  constructor(props) {
    super(props);
    if(this.props.priorityId === 0) {
      this.state = {
        name: "",
        color_code: "",
        desc: "",
        status: "",
        value: 1
      };
    }
    else {
      const selectedPriority = this.props.priorities.find(priority => priority.id === this.props.priorityId);
      console.log("selectedPriority", selectedPriority);
      const {name, desc, status, value, color_code} = selectedPriority;
      this.state = {
        name: name,
        color_code: color_code,
        desc: desc,
        status: status,
        value: value
      };
    }
  };
  onPriorityAdd = () => {
    if (this.props.priorityId === 0) {
      const newPriority = {
        name: this.state.name,
        desc: this.state.desc,
        status: this.state.status,
        value: this.state.value,
        color_code: this.state.color_code,
      };
      this.props.onAddTicketPriority(newPriority);
    } else {
      const newPriority = {
        name: this.state.name,
        desc: this.state.desc,
        status: this.state.status,
        value: this.state.value,
        color_code: this.state.color_code,
        id: this.props.priorityId
      };
      this.props.onEditTicketPriority(newPriority);
    }
  };
  render() {
    const {name, value, desc, status} = this.state;
    const {showAddPriority, onToggleAddPriority} = this.props;
    return (
      <div>

        <Modal
          visible={showAddPriority}
          title="Add New Priority"
          onCancel={onToggleAddPriority}
          footer={[
            <Button key="submit" type="primary" onClick ={this.onPriorityAdd}>
              {this.props.priorityId===0 ? "Add" : "Edit"}
            </Button>,
            <Button key="cancel" onClick={onToggleAddPriority}>
              Cancel
            </Button>,
          ]}>
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
              <Input className="gx-form-control-lg" type="text" value={value} onChange={(e) => {
                this.setState({value: e.target.value})
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

export default AddNewPriority;


AddNewPriority.defaultProps = {
  priorities: [],
  priorityId: 0,
  showAddPriority: true
};

AddNewPriority.propTypes = {
  priorities: PropTypes.array,
  priorityId: PropTypes.number,
  showAddPriority: PropTypes.bool,
  onToggleAddPriority: PropTypes.func,
  onAddTicketPriority: PropTypes.func,
  onEditTicketPriority: PropTypes.func
};
