
import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio, Select} from "antd";
import PropTypes from "prop-types";

const {TextArea} = Input;
const { Option } = Select;


class RaiseTicketModal extends Component {
  constructor(props) {
    super(props);
    if (this.props.ticketId === null) {
      this.state = {
        title: "",
        content: "",
        attachment: [],
        product_id: null,
        department_id: null,
        priority_id: null,
        service_id: []
      };
      // } else {
      //   const selectedDept = this.props.dept.find(department => department.id === this.props.departmentId);
      //   this.state = {...selectedDept};
      // }
    }
  }

  onTicketAdd = () => {
    if (this.props.ticketId === 0) {
      this.props.onRaiseNewTicket({...this.state});

    } else {
      this.props.onRaiseNewTicket({...this.state});
    }
    this.props.onToggleAddTicket();
  };

  onServiceSelect = (id) => {
    this.setState({service_id: this.state.service_id.concat(id)})
  };

  onServiceRemove = (value) => {
    const updatedServices = this.state.service_id.filter(service => service !== value);
    this.setState({service_id: updatedServices})
  };

  onServiceSelectOption = () => {
    const serviceOptions = [];
    this.props.formOptions.services.map(service => {
      return serviceOptions.push(<Option value={service.id} key={service.id}>{service.title}</Option>);
    });
    return serviceOptions;
  };


  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onTicketAdd();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const serviceOptions = this.onServiceSelectOption();
    const {title, content, attachment, product_id, department_id, priority_id, service_id} = this.state;
    const {showAddTicket, onToggleAddTicket, formOptions} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showAddTicket}
          title={this.props.departmentId === 0 ? "Add New Department" : "Edit Department Detail"}
          onCancel={() => onToggleAddTicket()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddTicket()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Subject">
              {getFieldDecorator('title', {
                initialValue: title,
                rules: [{required: true, message: 'Please enter ticket subject'}],
              })(<Input type="text" className="gx-form-control-lg" onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Select Product">
              {getFieldDecorator('product', {
                initialValue: product_id,
              })(<Select type="text" onChange={(value) => {
                this.setState({product_id: value})
              }}>
                  {formOptions.products.map(product => {
                    return <Option key={product.id} value={product.id}>{product.title}</Option>
                  })}
              </Select>)}
            </Form.Item>
            <Form.Item label="Select Department">
              {getFieldDecorator('department_id', {
                initialValue: department_id,
              })(<Select type="text" onChange={(value) => {
                this.setState({department_id: value})
              }}>
                {formOptions.departments.map(department => {
                  return <Option key={department.id} value={department.id}>{department.name}</Option>
                })}
              </Select>)}
            </Form.Item>
            <Form.Item label="Select Service">
              {getFieldDecorator('service_id', {
                initialValue: service_id,
              })(<Select
                mode="multiple"
                placeholder="Please select Services"
                value={service_id}
                onSelect={this.onServiceSelect}
                onDeselect={this.onServiceRemove}>
                {serviceOptions}
              </Select>)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('content', {
                initialValue: content,
                rules: [{
                  min: 30,
                  message: 'Message should be at least 30 characters long',
                }],
              })(<TextArea rows={4} className="gx-form-control-lg" onChange={(e) => {
                this.setState({content: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Select Priority">
              {getFieldDecorator('priority_id', {
                initialValue: priority_id,
              })(<Select type="text" onChange={(value) => {
                this.setState({priority_id: value})
              }}>
                {formOptions.priorities.map(priority => {
                  return <Option key={priority.id} value={priority.id}>{priority.name}</Option>
                })}
              </Select>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}


RaiseTicketModal = Form.create({})(RaiseTicketModal);

export default RaiseTicketModal;


RaiseTicketModal.defaultProps = {
  dept: [],
  departmentId: '',
  showAddDepartment: true
};

RaiseTicketModal.propTypes = {
  dept: PropTypes.array,
  departmentId: PropTypes.number,
  showAddDepartment: PropTypes.bool,
  onToggleAddDepartment: PropTypes.func,
  onAddDepartment: PropTypes.func,
  onEditDepartment: PropTypes.func
};