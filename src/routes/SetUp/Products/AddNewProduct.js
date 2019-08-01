import React, {Component} from 'react';
import {Button, Form, Input, message, Modal, Radio, Upload} from "antd/lib/index";
import PropTypes from "prop-types";
import axios from 'util/Api'
import {getFileExtension, getFileSize} from "../../../util/Utills";

const {TextArea} = Input;

class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    if (props.currentProduct === null) {
      this.state = {
        title: "",
        desc: "",
        support_enable: 1,
        logo: null,
        fileList: [],
      };
    } else {
      const selectedProduct = props.currentProduct;
      this.state = {
        ...selectedProduct,
        logoName: selectedProduct.avatar.title,
        fileList: [],
        logo: selectedProduct.avatar ? selectedProduct.avatar.id : null
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
      this.onProductAdd();
    }
  };


  onProductAdd = () => {
    if (this.props.currentProduct === null) {
      this.props.onAddProduct({...this.state});
    } else {
      this.props.onEditProduct({...this.state});
    }
    this.props.onToggleAddProduct();
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
        this.setState({logo: data.data}, () => {
          this.onProductAdd();
          this.setState({fileList: []})
        })
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };

  render() {
    const {title, support_enable, desc, fileList, logoName} = this.state;
    const {getFieldDecorator} = this.props.form;
    const {showAddModal, onToggleAddProduct, currentProduct} = this.props;
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
          title={currentProduct === null ? "Add New Product" : "Edit Product Details"}
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
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please Enter Product title!'}],
              })(<Input type="text" autoFocus onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('desc', {
                initialValue: desc,
                validateTrigger: 'onBlur',
                rules: [{
                  max: 250,
                  message: 'Message length should not exceed 250 characters',
                }],
              })(<TextArea rows={4} className="gx-form-control-lg" onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Upload Logo" extra={fileList.length > 0 ? "" : logoName}>
              <Upload {...props}>
                <Input placeholder="Choose file..." addonAfter="Browse"/>
              </Upload>
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
  currentProduct: null,
  showAddModal: true
};

AddNewProduct.propTypes = {
  productsList: PropTypes.array,
  currentProduct: PropTypes.number,
  showAddModal: PropTypes.bool,
  onToggleAddProduct: PropTypes.func,
  onAddProduct: PropTypes.func,
  onEditProduct: PropTypes.func
};
