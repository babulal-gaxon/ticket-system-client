import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio, message} from "antd";
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
      setTimeout(this.onSetFieldsValue,10);
      const selectedDept = this.props.dept.find(department => department.id === this.props.departmentId)
      console.log("selectedDepartment", selectedDept)
      this.state = {...selectedDept};
    }

  };
  onSetFieldsValue=()=>{
    this.props.form.setFieldsValue({
      name : this.state.name,
      description: this.state.desc
    });
  };
  onDepartmentAdd = () => {
    if (this.props.departmentId === 0) {
      this.props.onAddDepartment({...this.state}, this.onAddSuccess)
      this.props.onToggleAddDepartment();

    } else {
      this.props.onEditDepartment({...this.state},  this.onEditSuccess)
      this.props.onToggleAddDepartment();
    }
  };
  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onDepartmentAdd();
      }
    });
  };
  onAddSuccess = () => {
    message.success('New department has been added successfully.');
  };
  onEditSuccess = () => {
    message.success('The department has been updated successfully.');
  };
  render() {
    const {getFieldDecorator} = this.props.form;
    const {name, desc, status} = this.state;
    const {showAddDepartment, onToggleAddDepartment} = this.props;
    return (
      <div>
        <Modal
          visible={showAddDepartment}
          title={this.props.departmentId === 0 ? "Add New Department" : "Edit Department Detail"}
          onCancel={() => onToggleAddDepartment()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck} >
              Save
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddDepartment()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                rules: [{required: true, message: 'Please Enter Department Name!'}],
              })(<Input type="text" value={name} onChange={(e) => {
                this.setState({name: e.target.value}) }}/>)}
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

AddNewDepartment = Form.create({})(AddNewDepartment);

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