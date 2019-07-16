import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio} from "antd/lib/index";
import PropTypes from "prop-types";

const {TextArea} = Input;

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
      const selectedDept = this.props.dept.find(department => department.id === this.props.departmentId);
      this.state = {...selectedDept};
    }
  };

  onDepartmentAdd = () => {
    if (this.props.departmentId === 0) {
      this.props.onAddDepartment({...this.state});
      this.props.onToggleAddDepartment();

    } else {
      this.props.onEditDepartment({...this.state});
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

  render() {
    const {getFieldDecorator} = this.props.form;
    const {name, status, desc} = this.state;
    const {showAddDepartment, onToggleAddDepartment} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showAddDepartment}
          title={this.props.departmentId === 0 ? "Add New Department" : "Edit Department Detail"}
          onCancel={() => onToggleAddDepartment()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddDepartment()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [{required: true, message: 'Please Enter Department Name!'}],
              })(<Input type="text" onChange={(e) => {
                this.setState({name: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('desc', {
                initialValue: desc,
                rules: [{
                  min: 30,
                  message: 'Message should be at least 30 characters long',
                }],
              })(<TextArea rows={4} className="gx-form-control-lg" onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>)}
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