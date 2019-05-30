import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio, Select} from "antd";

class AddNewDepartment extends Component {
  constructor(props) {
    super(props);
    if (this.props.departmentId === 0) {
      this.state = {
        name: "",
        desc: "",
        status: ""
      }
    }
    else {
      const selectedDept = this.props.dept.find(department => department.id === this.props.departmentId)
      console.log("selectedDepartmen", selectedDept)
      const {name, desc, status} = selectedDept;
      this.state = {
        name: name,
        desc: desc,
        status: status
      }
    }
  }

  onDepartmentAdd = () => {
    if (this.props.departmentId === 0) {
      const newDepartment = {
        name: this.state.name,
        desc: this.state.desc,
        status: this.state.status,
      }
      this.props.onAddDepartment(newDepartment)
    }

    else {
      const newDepartment = {
        name: this.state.name,
        desc: this.state.desc,
        status: this.state.status,
        id: this.props.departmentId
      }
      this.props.onEditDepartment(newDepartment)
    }
  }

  render() {
    const {name, desc, status} = this.state;
    const {showAddDepartment, onToggleAddDepartment} = this.props;
    const {Option} = Select;
    return (

      <div>

        <Modal
          visible={showAddDepartment}
          title="Add New Department"
          onCancel={onToggleAddDepartment}
          footer={[
            this.props.departmentId === 0   ?
              <Button key="submit" type="primary" onClick={this.onDepartmentAdd}>
                Add
              </Button> :
              <Button key="submit" type="primary" onClick={this.onDepartmentAdd}>
                Edit
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