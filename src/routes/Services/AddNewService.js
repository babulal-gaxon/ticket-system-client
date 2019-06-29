import React, {Component} from 'react';
import {Button, Form, Input, Modal, Radio} from "antd";
import PropTypes from "prop-types";

const {TextArea} = Input;

class AddNewService extends Component {
  constructor(props) {
    super(props);
    if (this.props.serviceId === 0) {
      this.state = {
        title: "",
        desc: "",
        support_enable: 1
      };
    } else {
      const selectedService = this.props.servicesList.find(service => service.id === this.props.serviceId)
      console.log("selected Service", selectedService)
      this.state = {...selectedService};
    }
  };

  onServiceAdd = () => {
    if (this.props.serviceId === 0) {
      this.props.onAddService({...this.state});
      this.props.onToggleAddService();

    } else {
      this.props.onEditService({...this.state});
      this.props.onToggleAddService();
    }
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onServiceAdd();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {title, support_enable, desc} = this.state;
    const {showAddModal, onToggleAddService} = this.props;
    return (
      <div>
        <Modal
          visible={showAddModal}
          title={this.props.serviceId === 0 ? "Add New Service" : "Edit Service Details"}
          onCancel={() => onToggleAddService()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddService()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                initialValue: title,
                rules: [{required: true, message: 'Please Enter Service title!'}],
              })(<Input type="text" onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Description">
              <TextArea rows={4} className="gx-form-control-lg" value={desc} onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="Support Enable">
              <Radio.Group value={support_enable} onChange={(e) => {
                this.setState({support_enable: e.target.value})
              }}>
                <Radio value={1}>Enable</Radio>
                <Radio value={0}>Disable</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

AddNewService = Form.create({})(AddNewService);

export default AddNewService;


AddNewService.defaultProps = {
  servicesList: [],
  serviceId: '',
  showAddModal: true
};

AddNewService.propTypes = {
  servicesList: PropTypes.array,
  serviceId: PropTypes.number,
  showAddModal: PropTypes.bool,
  onToggleAddService: PropTypes.func,
  onAddService: PropTypes.func,
  onEditService: PropTypes.func
};