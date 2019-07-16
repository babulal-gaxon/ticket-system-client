import React, {Component} from 'react';
import {Button, Form, Input, Modal, Radio, Upload} from "antd/lib/index";
import PropTypes from "prop-types";
import axios from 'util/Api'

const {TextArea} = Input;

class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    if (this.props.productId === 0) {
      this.state = {
        title: "",
        desc: "",
        support_enable: 1,
        logo: null,
        uploadedLogo: null,
        logoName: ""
      };
    } else {
      const selectedProduct = this.props.productsList.find(product => product.id === this.props.productId);
      this.state = {...selectedProduct, logoName: selectedProduct.avatar.title};
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
    if(this.state.uploadedLogo) {
      this.onLogoSelect();
    }
    else {
      this.onProductAdd();
    }
  };


  onProductAdd = () => {
      if (this.props.productId === 0) {
        this.props.onAddProduct({...this.state});
      } else {
        this.props.onEditProduct({...this.state});
      }
    this.props.onToggleAddProduct();
  };

  onLogoSelect = () => {
    let file = this.state.uploadedLogo;
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
        this.setState({logo: data.data}, () => {
          this.onProductAdd();
          this.setState({uploadedLogo: null})
        })
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };

  render() {
    const props = {
      onRemove: () => {
        this.setState({uploadedLogo: null})
      },
      beforeUpload: file => {
        this.setState({uploadedLogo: file});
        return false;
      },
    };
    const {getFieldDecorator} = this.props.form;
    const {title, support_enable, desc, uploadedLogo, logoName} = this.state;
    const {showAddModal, onToggleAddProduct} = this.props;

    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showAddModal}
          title={this.props.productId === 0 ? "Add New Product" : "Edit Product Details"}
          onCancel={() => onToggleAddProduct()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddProduct()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                initialValue: title,
                rules: [{required: true, message: 'Please Enter Product title!'}],
              })(<Input type="text" onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('desc', {
                initialValue: desc,
                 rules: [{
                  min: 30,
                  message: 'Message should be at least 30 characters long',
                }],
              })(
              <TextArea rows={4} className="gx-form-control-lg" onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Upload Logo" extra={uploadedLogo ? "" : logoName}>
              {getFieldDecorator('uploadedLogo', {
                rules: [{required: true, message: 'Please Upload Company Logo!'}],
              })(
                <Upload {...props}>
                  <Input placeholder="Choose file..." addonAfter="Browse"/>
                </Upload>)}
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

AddNewProduct = Form.create({})(AddNewProduct);

export default AddNewProduct;


AddNewProduct.defaultProps = {
  productsList: [],
  productId: '',
  showAddModal: true
};

AddNewProduct.propTypes = {
  productsList: PropTypes.array,
  productId: PropTypes.number,
  showAddModal: PropTypes.bool,
  onToggleAddProduct: PropTypes.func,
  onAddProduct: PropTypes.func,
  onEditProduct: PropTypes.func
};