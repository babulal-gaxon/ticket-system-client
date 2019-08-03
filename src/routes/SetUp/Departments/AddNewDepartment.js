import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio} from "antd/lib/index";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const {TextArea} = Input;

class AddNewDepartment extends Component {
  constructor(props) {
    super(props);
    if (props.currentDepartment === null) {
      this.state = {
        name: "",
        desc: "",
        status: 1
      };
    } else {
      const selectedDept = props.currentDepartment;
      this.state = {...selectedDept};
    }
  };

  onDepartmentAdd = () => {
    if (this.props.currentDepartment === null) {
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
    const {messages} = this.props.intl;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showAddDepartment}
          title={this.props.currentDepartment === null ? <IntlMessages id="departments.new"/> :
            <IntlMessages id="departments.edit"/>}
          onCancel={() => onToggleAddDepartment()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              <IntlMessages id="common.save"/>
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddDepartment()}>
              <IntlMessages id="common.cancel"/>
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label={<IntlMessages id="common.name"/>}>
              {getFieldDecorator('name', {
                initialValue: name,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: messages["validation.departments.name"]}],
              })(<Input type="text" autoFocus
                        onChange={(e) => {
                          this.setState({name: e.target.value})
                        }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.description"/>}>
              {getFieldDecorator('desc', {
                initialValue: desc,
                validateTrigger: 'onBlur',
                rules: [{
                  max: 250,
                  message: messages["common.descriptionLength"]
                }],
              })(<TextArea rows={4} className="gx-form-control-lg" onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.status"/>}>
              <Radio.Group value={status} onChange={(e) => {
                this.setState({status: e.target.value})
              }}>
                <Radio value={1}><IntlMessages id="common.active"/></Radio>
                <Radio value={0}><IntlMessages id="common.disabled"/></Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}


AddNewDepartment = Form.create({})(AddNewDepartment);

export default injectIntl(AddNewDepartment);


AddNewDepartment.defaultProps = {
  dept: [],
  currentDepartment: null,
  showAddDepartment: true
};

AddNewDepartment.propTypes = {
  dept: PropTypes.array,
  currentDepartment: PropTypes.object,
  showAddDepartment: PropTypes.bool,
  onToggleAddDepartment: PropTypes.func,
  onAddDepartment: PropTypes.func,
  onEditDepartment: PropTypes.func
};
