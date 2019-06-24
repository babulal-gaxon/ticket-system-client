import React, {Component} from 'react';
import {Button, Form, Input, message, Modal} from "antd";

class AddNewCompany extends Component {
  constructor(props) {
    super(props);
    if (this.props.companyId === 0) {
      this.state = {
        company_name: "",
        website: "",
        company_logo: null,
        title: ""
      };
    } else {
      setTimeout(this.onSetFieldsValue, 10);
      const selectedCompany = this.props.companiesList.find(company => company.id === this.props.companyId);
      console.log("selectedCompany", selectedCompany)
      this.state = {...selectedCompany};
    }
  };

  onSetFieldsValue = () => {
    this.props.form.setFieldsValue({
      company_name: this.state.company_name,
      website: this.state.website,
      company_logo: this.state.company_logo
    });
  };
  onCompanyAdd = () => {
    // let data = new FormData();
    // console.log("formdata", data);
    // data.append('company_logo', this.state.company_logo);
    // data.append('company_name', this.state.company_name);
    // data.append('website', this.state.website);
    if (this.props.companyId === 0) {
      const dataToUpload = {
        company_name: this.state.company_name,
        website: this.state.website,
        company_logo: this.props.companyLogoId
      }
      this.props.onAddNewCompany(dataToUpload, this.onAddSuccess);
      this.props.onToggleAddCompany();
    }
    // else {
    //   console.log(" i am in edit function")
    //   this.props.onEditCompany(dataToUpload, this.onEditSuccess);
    //   this.props.onToggleAddCompany();
    // }
  };
  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onCompanyAdd();
      }
    });
  };
  onAddSuccess = () => {
    message.success('New Company has been added successfully.');
  };
  onEditSuccess = () => {
    message.success('The Company details has been updated successfully.');
  };
  onLogoSelect = (e) => {
    this.setState({company_logo : e.target.files[0], title: e.target.files[0].name}, () => {this.onLogoUpload()});
  };
  onLogoUpload = () => {
    console.log("thislogod", this.state.company_logo);
    const data = new FormData();
    data.append('file', this.state.company_logo);
    data.append('title', this.state.title);
    this.props.onAddProfileImage(data);
  }

  render() {
    console.log("file of lofo",this.props.companyLogoId);
    console.log("state", this.state);
    const {getFieldDecorator} = this.props.form;
    const {company_name, website, company_logo} = this.state;
    const {showAddNewModal, onToggleAddCompany} = this.props;
    return (
      <div>
        <Modal
          visible={showAddNewModal}
          title={this.props.companyId === 0 ? "Add New Company" : "Edit Company Detail"}
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
                rules: [{required: true, message: 'Please Enter Company Name!'}],
              })(<Input type="text" onChange={(e) => {
                this.setState({company_name: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Website">
              {getFieldDecorator('website', {
                rules: [{required: true, message: 'Please Enter Website URL!'}],
              })(<Input type="text" onChange={(e) => {
                this.setState({website: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('company_logo', {
                rules: [{required: true, message: 'Please Select Logo!'}],
              })(<Input type="file" placeholder="Choose file..." onChange = {this.onLogoSelect}/>)}

            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

AddNewCompany = Form.create({})(AddNewCompany);

export default AddNewCompany;