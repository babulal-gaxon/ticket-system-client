import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Radio, Select, Upload} from "antd/lib/index";
import axios from 'util/Api'
import PropTypes from "prop-types";
import {getFileExtension, getFileSize} from "../../../../util/Utills";

const {Option} = Select;

class AddNewStaff extends Component {
  constructor(props) {
    super(props);
    console.log("staffList", this.props.staffList);
    if (this.props.staffId === null) {
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
      const selectedStaff = this.props.staffList.find(staff => staff.id === this.props.staffId);
      const {id, first_name, last_name, email, mobile, hourly_rate, status,} = selectedStaff;
      const department_ids = selectedStaff.departments.map(department => {
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
        fileList: []
      }
    }
  }

  onSubmitForm = () => {
    if (this.state.fileList.length>0) {
      this.onImageSelect();
    } else {
      this.onStaffAdd();
    }
  };

  onStaffAdd = () => {
    if (this.props.staffId === null) {
      this.props.onAddSupportStaff({...this.state})
    } else {
      this.props.onEditSupportStaff({...this.state});
    }
    this.props.onToggleAddModal();
  };

  onImageSelect = () => {
    let file = this.state.fileList[0];
    if(file) {
      const data = new FormData();
      data.append('file', file);
      data.append('title', file.name);
      this.onAddImage(data);
    }
  };

  onAddImage = (file, context) => {
    this.props.fetchStart();
    axios.post("/uploads/temporary/media", file, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      if (data.success) {
        this.props.fetchSuccess();
        this.setState({profile_pic: data.data}, () => {
          this.onStaffAdd();
          this.setState({uploadedFile: null})
        })
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
    const {first_name, last_name, email, password, mobile, hourly_rate, account_status, departments_ids, fileList} = this.state;
    const {showAddModal, onToggleAddModal} = this.props;
    const deptOptions = this.onDepartmentSelectOption();
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
          message.error('The image size is greater than allowed size!');
        }
        else {
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
          title={this.props.staffId === null ? "Add Staff" : "Edit Staff Details"}
          onCancel={() => onToggleAddModal()}
          footer={[
            <Button key="submit" type="primary" onClick={() => this.onValidationCheck()}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddModal()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label="First Name">
                  {getFieldDecorator('first_name', {
                    initialValue: first_name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: 'Please Enter First Name!'}],
                  })(<Input type="text" autoFocus onChange={(e) => {
                    this.setState({first_name: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label="Last Name">
                  {getFieldDecorator('last_name', {
                    initialValue: last_name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: 'Please Enter Last Name!'}],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({last_name: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
            </div>
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label="Email Address">
                  {getFieldDecorator('email', {
                    initialValue: email,
                    validate: [{
                      trigger: 'onBlur',
                      rules: [
                        {
                          required: true,
                          message: 'Please Enter Email!'
                        },
                      ],
                    }, {
                      trigger: 'onChange',
                      rules: [
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                      ],
                    }],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({email: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label="Phone Number">
                  {getFieldDecorator('mobile', {
                    initialValue: mobile,
                    validateTrigger: 'onBlur',
                    rules: [{
                      pattern: /^[0-9\b]+$/,
                      message: 'Please enter only numerical values',
                    }],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({phone: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
            </div>
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label="Password"
                           extra={this.props.staffId === null ? "" : "Note: Leave it blank if you don't want to update password."}>
                  {this.props.staffId === null ?
                    getFieldDecorator('password', {
                      initialValue: password,
                      rules: [{
                        required: true,
                        message: 'Please Enter Password!'
                      },
                        {
                          min: 8,
                          message: 'Length should be at least 8 characters long',
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
                <Form.Item label="Hourly Rate">
                  {getFieldDecorator('hourly_rate', {
                    initialValue: hourly_rate,
                    validateTrigger: 'onBlur',
                    rules: [{
                      pattern: /^[0-9\b]+$/,
                      message: 'Please enter only numerical values',
                    }]
                  })(<Input type="text" addonAfter={<div>$</div>} onChange={(e) => {
                    this.setState({hourly_rate: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
            </div>
            <Form.Item label="Department">
              <Select
                mode="multiple"
                style={{width: '100%'}}
                placeholder="Please select Department"
                value={departments_ids}
                onSelect={this.onDepartmentSelect}
                onDeselect={this.onDepartmentRemove}>
                {deptOptions}
              </Select>
            </Form.Item>
            <Form.Item label="Upload Profile Picture">
              <Upload {...props}>
                <Input placeholder="Choose file..." addonAfter="Browse"/>
              </Upload>
            </Form.Item>
            <Form.Item label="Status">
              <Radio.Group value={account_status} onChange={(e) => {
                this.setState({account_status: e.target.value})
              }}>
                <Radio value={1}>Active</Radio>
                <Radio value={0}>Disabled</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

AddNewStaff = Form.create({})(AddNewStaff);

export default AddNewStaff;

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
