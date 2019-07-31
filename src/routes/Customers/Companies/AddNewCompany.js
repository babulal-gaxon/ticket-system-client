import React, {Component} from 'react';
import axios from 'util/Api'
import {Button, Form, Input, Modal, Upload} from "antd";


class AddNewCompany extends Component {
  constructor(props) {
    super(props);
    if (this.props.currentCompany === null) {
      this.state = {
        company_name: "",
        website: "",
        uploadedLogo: null,
        fileList: [],
      };
    } else {
      const selectedCompany = this.props.currentCompany;
      this.state = {
        ...selectedCompany,
        logoName: selectedCompany.avatar ? selectedCompany.avatar.title : "",
        fileList: []
      };
    }
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onSubmitForm();
      }
    });
  };

  onSubmitForm = () => {
    if (this.state.fileList.length > 0) {
      this.onLogoSelect();
    } else {
      this.onCompanyAdd();
    }
  };

  onCompanyAdd = () => {
    if (this.props.currentCompany === null) {
      this.props.onAddNewCompany({...this.state});
    } else {
      this.props.onEditCompany({...this.state});
    }
    this.props.onToggleAddCompany();
  };

  onLogoSelect = () => {
    let file = this.state.fileList[0];
    const data = new FormData();
    data.append('file', file);
    data.append('title', file.name);
    this.onAddLogo(data);
  };

  onAddLogo = (file) => {
    this.props.fetchStart();
    axios.post("/uploads/temporary/media", file, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      if (data.success) {
        this.props.fetchSuccess();
        this.setState({company_logo: data.data}, () => {
          this.onCompanyAdd();
          this.setState({fileList: []})
        })
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };

  render() {
    const {company_name, website, fileList, logoName} = this.state;
    const props = {
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
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    const {getFieldDecorator} = this.props.form;
    const {showAddNewModal, onToggleAddCompany, currentCompany} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showAddNewModal}
          title={currentCompany === null ? "Add New Company" : "Edit Company Detail"}
          onCancel={() => onToggleAddCompany()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddCompany()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Company Name">
              {getFieldDecorator('company_name', {
                initialValue: company_name,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please Enter Company Name!'}],
              })(<Input type="text" autoFocus onChange={(e) => {
                this.setState({company_name: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Website" extra="Please enter website in 'http://www.example.com' format">
              {getFieldDecorator('website', {
                initialValue: website,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please Enter Website URL!'}],
              })(<Input type="text" onChange={(e) => {
                this.setState({website: e.target.value})
              }}/>)}
            </Form.Item>

            <Form.Item label="Upload Logo" extra={fileList.length > 0 ? "" : logoName}>
              <Upload {...props}>
                <Input placeholder="Choose file..." addonAfter="Browse"/>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

AddNewCompany = Form.create({})(AddNewCompany);

export default AddNewCompany;
