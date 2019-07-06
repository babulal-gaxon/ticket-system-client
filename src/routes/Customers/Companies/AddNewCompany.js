import React, {Component} from 'react';
import {Button, Form, Input, Modal} from "antd";


class AddNewCompany extends Component {
  constructor(props) {
    super(props);
    if (this.props.companyId === 0) {
      this.state = {
        company_name: "",
        website: "",
        company_logo: this.props.companyLogoId
      };
    } else {
      setTimeout(this.onSetFieldsValue, 10);
      const selectedCompany = this.props.companiesList.find(company => company.id === this.props.companyId);
      this.state = {...selectedCompany, company_logo: this.props.companyLogoId};
    }
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({company_logo: nextProps.companyLogoId})
  }

  onSetFieldsValue = () => {
    this.props.form.setFieldsValue({
      company_name: this.state.company_name,
      website: this.state.website,
      company_logo: this.state.company_logo
    });
  };

  onCompanyAdd = () => {
    this.setState({company_logo: this.props.companyLogoId}, () => {
      if (this.props.companyId === 0) {
        this.props.onAddNewCompany({...this.state});
        this.props.onToggleAddCompany();
      } else {
        this.props.onEditCompany({...this.state});
        this.props.onToggleAddCompany();
      }
    })
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onCompanyAdd();
      }
    });
  };

  onLogoSelect = (e) => {
    let file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('title', file.name);
    this.props.onAddProfileImage(data);
  };

  render() {
    console.log("company_logo", this.props.companyLogoId);
    const {getFieldDecorator} = this.props.form;
    const {company_name, website} = this.state;
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
                initialValue: company_name,
                rules: [{required: true, message: 'Please Enter Company Name!'}],
              })(<Input type="text" onChange={(e) => {
                this.setState({company_name: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Website">
              {getFieldDecorator('website', {
                initialValue: website,
                rules: [{required: true, message: 'Please Enter Website URL!'}],
              })(<Input type="text" onChange={(e) => {
                this.setState({website: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item>
              <Input type="file" placeholder="Choose file..." onChange={this.onLogoSelect}/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

AddNewCompany = Form.create({})(AddNewCompany);

export default AddNewCompany;