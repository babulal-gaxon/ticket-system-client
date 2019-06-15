import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio} from "antd";
import PropTypes from "prop-types";

class AddNewDepartment extends Component {
  constructor(props) {
    super(props);
    if (this.props.departmentId === 0) {
      this.state = {
        name: "",
        desc: "",
        status: 1
      };
    } else {
      const selectedDept = this.props.dept.find(department => department.id === this.props.departmentId)
      console.log("selectedDepartment", selectedDept)
      this.state = {...selectedDept};
    }
  };
  onDepartmentAdd = () => {
    if (this.props.departmentId === 0) {
      this.props.onAddDepartment({...this.state})
      this.props.onToggleAddDepartment();
    } else {
      this.props.onEditDepartment({...this.state})
      this.props.onToggleAddDepartment();
    }
  };
  render() {
    const {name, desc, status} = this.state;
    const {showAddDepartment, onToggleAddDepartment} = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          visible={showAddDepartment}
          title={this.props.departmentId === 0 ? "Add New Department" : "Edit Department Detail"}
          onCancel={() => onToggleAddDepartment()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onDepartmentAdd}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddDepartment()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please enter department name!', whitespace: true }],
              })(<Input type="text" value={name} onChange={(e) => {
                this.setState({name: e.target.value})
              }}/>)}


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


export default AddNewDepartment;


AddNewDepartment.defaultProps = {
  dept: [],
  departmentId: '',
  showAddDepartment: true
};

AddNewDepartment.propTypes = {
  dept: PropTypes.array,
  departmentId: PropTypes.number,
  showAddDepartment: PropTypes.bool,
  onToggleAddDepartment: PropTypes.func,
  onAddDepartment: PropTypes.func,
  onEditDepartment: PropTypes.func
};