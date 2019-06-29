import React, {Component} from 'react';
import {Button, Form, Input, Modal, Radio} from "antd";
import PropTypes from "prop-types";

const {TextArea} = Input;

class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    this.inputOpenFileRef = React.createRef();
    if (this.props.productId === 0) {
      this.state = {
        title: "",
        desc: "",
        support_enable: 1,
        logo: null
      };
    } else {
      const selectedProduct = this.props.productsList.find(product => product.id === this.props.productId);
      console.log("selected Service", selectedProduct)
      this.state = {...selectedProduct};
    }
  };

  onProductAdd = () => {
    this.setState({logo: this.props.productLogoId}, () => {
      if (this.props.productId === 0) {
        this.props.onAddProduct({...this.state});
        this.props.onToggleAddProduct();

      } else {
        this.props.onEditProduct({...this.state});
        this.props.onToggleAddProduct();
      }
    })
  };

  onLogoSelect = (e) => {
    let file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('title', file.name);
    this.props.onAddProductLogo(data);
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onProductAdd();
      }
    });
  };

  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click()
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {title, support_enable, desc} = this.state;
    const {showAddModal, onToggleAddProduct} = this.props;
    return (
      <div>
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
              <TextArea rows={4} className="gx-form-control-lg" value={desc} onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item>
              <Input type="file" placeholder="Choose file..." addonAfter="Browse" onChange={this.onLogoSelect}
                     ref={this.inputOpenFileRef} />
              <Button onClick={this.showOpenFileDlg}>Choose Picture</Button>
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