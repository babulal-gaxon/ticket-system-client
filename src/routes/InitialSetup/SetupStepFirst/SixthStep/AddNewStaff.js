import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Radio, Select, Upload} from "antd/lib/index";
import axios from 'util/Api'
import PropTypes from "prop-types";
import {getFileExtension, getFileSize} from "../../../../util/Utills";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../../util/IntlMessages";

const {Option} = Select;

class AddNewStaff extends Component {
  constructor(props) {
    super(props);
    console.log("selectedStaff", props.selectedStaff)
    if (props.selectedStaff === null) {
      this.state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        mobile: "",
        hourly_rate: "",
        account_status: 1,
        departments_ids: [],
        fileList: [],
        profile_pic: null
      }
    } else {
      const {id, first_name, last_name, email, mobile, hourly_rate, status, departments, avatar} = props.selectedStaff;
      const department_ids = departments.map(department => {
        return department.id
      });
      this.state = {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        mobile: mobile,
        hourly_rate: parseInt(hourly_rate),
        account_status: status,
        departments_ids: department_ids,
        profile_pic: null,
        fileList: [],
        logoName: avatar && avatar.title ? avatar.title : "",
      }
    }
  }

  onSubmitForm = () => {
    if (this.state.fileList.length > 0) {
      this.onImageSelect();
    } else {
      this.onStaffAdd();
    }
  };

  onStaffAdd = () => {
    if (this.props.selectedStaff === null) {
      this.props.onAddSupportStaff({...this.state}, null, this)
    } else {
      this.props.onEditSupportStaff({...this.state}, null, this);
    }
    this.props.onToggleAddModal();
  };

  onImageSelect = () => {
    let file = this.state.fileList[0];
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('title', file.name);
      data.append('mime_type', file.type);
      this.onAddImage(data);
    }
  };

  onAddImage = (file) => {
    this.props.fetchStart();
    axios.post("/uploads/temporary/media", file, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      if (data.success) {
        console.log("data.data", data.data)
        this.props.fetchSuccess();
        this.setState({profile_pic: data.data}, () => {
          this.onStaffAdd();
          this.setState({fileList: []})
        })
      } else {
        this.props.fetchError(data.errors[0])
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };

  onDepartmentSelectOption = () => {
    const deptOptions = [];
    this.props.dept.map(department => {
      return deptOptions.push(<Option value={department.id}>{department.name}</Option>);
    });
    return deptOptions;
  };

  onDepartmentSelect = (id) => {
    this.setState({departments_ids: this.state.departments_ids.concat(id)});
  };

  onDepartmentRemove = (value) => {
    const updatedDepartments = this.state.departments_ids.filter(department => department !== value);
    this.setState({departments_ids: updatedDepartments})
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onSubmitForm();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {first_name, last_name, email, password, mobile, hourly_rate, account_status, departments_ids, fileList, logoName} = this.state;
    const {showAddModal, onToggleAddModal} = this.props;
    const deptOptions = this.onDepartmentSelectOption();
    const {messages} = this.props.intl;
    const props = {
      accept: getFileExtension(),
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice(-1);
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        if (fileList.length > 0) {
          props.onRemove(fileList[0])
        }
        const isFileSize = file.size < getFileSize();
        if (!isFileSize) {
          message.error(messages["validation.message.imageSize"]);
        } else {
          this.setState(state => ({
            fileList: [...state.fileList, file],
          }));
        }
        return false;
      },
      fileList,
    };

    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showAddModal}
          title={this.props.selectedStaff === null ? <IntlMessages id="staff.addStaff"/> :
            <IntlMessages id="staff.editStaff"/>}
          onCancel={() => onToggleAddModal()}
          footer={[
            <Button key="submit" type="primary" onClick={() => this.onValidationCheck()}>
              <IntlMessages id="common.save"/>
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddModal()}>
              <IntlMessages id="common.cancel"/>
            </Button>,
          ]}>
          <Form layout="vertical">
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label={<IntlMessages id="common.firstName"/>}>
                  {getFieldDecorator('first_name', {
                    initialValue: first_name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.message.firstName"]}],
                  })(<Input type="text" autoFocus onChange={(e) => {
                    this.setState({first_name: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label={<IntlMessages id="common.lastName"/>}>
                  {getFieldDecorator('last_name', {
                    initialValue: last_name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.message.lastName"]}],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({last_name: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
            </div>
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label={<IntlMessages id="common.emailAddress"/>}>
                  {getFieldDecorator('email', {
                    initialValue: email,
                    validate: [{
                      trigger: 'onBlur',
                      rules: [
                        {
                          required: true,
                          message: messages["validation.message.email"]
                        },
                      ],
                    }, {
                      trigger: 'onChange',
                      rules: [
                        {
                          type: 'email',
                          message: messages["validation.message.emailFormat"]
                        },
                      ],
                    }],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({email: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label={<IntlMessages id="common.phoneNo."/>}>
                  {getFieldDecorator('mobile', {
                    initialValue: mobile,
                    validateTrigger: 'onBlur',
                    rules: [{
                      pattern: /^[0-9\b]+$/,
                      message: messages["validation.message.numericalValues"]
                    }],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({mobile: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
            </div>
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label={<IntlMessages id="common.password"/>}
                           extra={this.props.selectedStaff === null ? "" :
                             <IntlMessages id="validation.message.passwordUpdateNote"/>}>
                  {this.props.selectedStaff === null ?
                    getFieldDecorator('password', {
                      initialValue: password,
                      rules: [{
                        required: true,
                        message: messages["validation.message.inputPassword"]
                      },
                        {
                          min: 8,
                          message: messages["validation.message.passwordLength"],
                        }],
                    })(<Input.Password type="text" onChange={(e) => {
                      this.setState({password: e.target.value})
                    }}/>) :
                    <Input.Password type="text" onChange={(e) => {
                      this.setState({password: e.target.value})
                    }}/>}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label={<IntlMessages id="common.hourlyRate"/>}>
                  {getFieldDecorator('hourly_rate', {
                    initialValue: hourly_rate,
                    validateTrigger: 'onBlur',
                    rules: [{
                      pattern: /^[0-9\b]+$/,
                      message: messages["validation.message.numericalValues"]
                    }]
                  })(<Input type="text" addonAfter={<div>$</div>} onChange={(e) => {
                    this.setState({hourly_rate: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
            </div>
            <Form.Item label={<IntlMessages id="common.departmentHeading"/>}>
              <Select
                mode="multiple"
                style={{width: '100%'}}
                pplaceholder={messages["common.department"]}
                value={departments_ids}
                onSelect={this.onDepartmentSelect}
                onDeselect={this.onDepartmentRemove}>
                {deptOptions}
              </Select>
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.uploadProfileImage"/>}
                       extra={fileList.length > 0 ? "" : logoName}>
              <Upload {...props}>
                <Input placeholder={messages["common.chooseFile"]} readOnly
                       addonAfter={<IntlMessages id="common.browse"/>}/>
              </Upload>
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.status"/>}>
              <Radio.Group value={account_status} onChange={(e) => {
                this.setState({account_status: e.target.value})
              }}>
                <Radio value={1}>{<IntlMessages id="common.active"/>}</Radio>
                <Radio value={0}>{<IntlMessages id="common.disable"/>}</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

AddNewStaff = Form.create({})(AddNewStaff);

export default injectIntl(AddNewStaff);

AddNewStaff.defaultProps = {
  showAddModal: false,
  dept: [],
  staffList: [],
  staffId: null
};

AddNewStaff.propTypes = {
  showAddModal: PropTypes.bool,
  dept: PropTypes.array,
  staffList: PropTypes.array,
  staffId: PropTypes.number
};
