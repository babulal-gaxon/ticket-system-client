import React, {Component} from 'react';
import axios from 'util/Api'
import {Button, Form, Input, message, Modal, Upload} from "antd";
import {getFileSize} from "../../../util/Utills";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";


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
      this.props.onAddNewCompany({...this.state}, this);
    } else {
      this.props.onEditCompany({...this.state}, this);
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
      } else {
        this.props.fetchError(data.errors[0])
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };

  render() {
    const {messages} = this.props.intl;
    const {company_name, website, fileList, logoName} = this.state;
    const props = {
      accept: ".png",
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
          }))
        }
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
          title={currentCompany === null ? <IntlMessages id="companies.addNew"/> :
            <IntlMessages id="companies.editDetail"/>}
          onCancel={() => onToggleAddCompany()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              <IntlMessages id="common.save"/>
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddCompany()}>
              <IntlMessages id="common.cancel"/>
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label={<IntlMessages id="companies.companyName"/>}>
              {getFieldDecorator('company_name', {
                initialValue: company_name,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: messages["validation.message.companyName"]}],
              })(<Input type="text" autoFocus onChange={(e) => {
                this.setState({company_name: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.website"/>}
                       extra={<IntlMessages id="common.websiteFormatMessage"/>}>
              {getFieldDecorator('website', {
                initialValue: website,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: messages["validation.message.website"]}],
              })(<Input type="text" onChange={(e) => {
                this.setState({website: e.target.value})
              }}/>)}
            </Form.Item>

            <Form.Item label={<IntlMessages id="common.uploadLogo"/>} extra={fileList.length > 0 ? "" : logoName}>
              <Upload {...props}>
                <Input placeholder={messages["common.chooseFile"]} addonAfter={<IntlMessages id="common.browse"/>}/>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

AddNewCompany = Form.create({})(AddNewCompany);

export default injectIntl(AddNewCompany);
