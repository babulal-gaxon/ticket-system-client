import React, {Component} from 'react';
import {Button, Form, Input, message, Modal, Radio, Upload} from "antd/lib/index";
import PropTypes from "prop-types";
import axios from 'util/Api'
import {getFileExtension, getFileSize} from "../../../util/Utills";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

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
        logoName: selectedProduct.avatar ? selectedProduct.avatar.title : "",
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
      this.props.onAddProduct({...this.state}, this);
    } else {
      this.props.onEditProduct({...this.state}, this);
    }
    this.props.onToggleAddProduct();
  };

  onLogoSelect = () => {
    let file = this.state.fileList[0];
    const data = new FormData();
    data.append('file', file);
    data.append('title', file.name);
    data.append('mime_type', file.type);
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
      } else {
        this.props.fetchError(data.errors[0])
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };

  render() {
    const {title, support_enable, desc, fileList, logoName} = this.state;
    const {getFieldDecorator} = this.props.form;
    const {showAddModal, onToggleAddProduct, currentProduct} = this.props;
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
          message.error('The image size is greater than allowed size!');
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
          title={currentProduct === null ? <IntlMessages id="products.new"/> : <IntlMessages id="products.edit"/>}
          onCancel={() => onToggleAddProduct()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              <IntlMessages id="common.save"/>
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddProduct()}>
              <IntlMessages id="common.cancel"/>
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label={<IntlMessages id="common.title"/>}>
              {getFieldDecorator('title', {
                initialValue: title,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: messages["validation.products.title"]}],
              })(<Input type="text" autoFocus onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.description"/>}>
              {getFieldDecorator('desc', {
                initialValue: desc,
                validateTrigger: 'onBlur',
                rules: [{
                  max: 250,
                  message: messages["validation.message.messageLength"],
                }],
              })(<TextArea rows={4} className="gx-form-control-lg" onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.uploadLogo"/>} extra={fileList.length > 0 ? "" : logoName}>
              <Upload {...props}>
                <Input placeholder={messages["common.chooseFile"]} readOnly addonAfter={<IntlMessages id="common.browse"/>}/>
              </Upload>
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.supportEnable"/>}>
              <Radio.Group value={support_enable} onChange={(e) => {
                this.setState({support_enable: e.target.value})
              }}>
                <Radio value={1}>{<IntlMessages id="common.enable"/>}</Radio>
                <Radio value={0}>{<IntlMessages id="common.disable"/>}</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

AddNewProduct = Form.create({})(AddNewProduct);

export default injectIntl(AddNewProduct);


AddNewProduct.defaultProps = {
  productsList: [],
  currentProduct: null,
  showAddModal: true
};

AddNewProduct.propTypes = {
  productsList: PropTypes.array,
  currentProduct: PropTypes.object,
  showAddModal: PropTypes.bool,
  onToggleAddProduct: PropTypes.func,
  onAddProduct: PropTypes.func,
  onEditProduct: PropTypes.func
};
