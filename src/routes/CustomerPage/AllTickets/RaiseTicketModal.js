import React, {Component} from "react"
import {Button, Form, Input, Modal, Select, Upload} from "antd";
import axios from 'util/Api'
import PropTypes from "prop-types";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const {TextArea} = Input;
const {Option} = Select;


class RaiseTicketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      attachment: [],
      product_id: null,
      department_id: null,
      priority_id: null,
      service_id: [],
      fileList: []
    }
  }

  onServiceSelect = (id) => {
    this.setState({service_id: this.state.service_id.concat(id)})
  };

  onServiceRemove = (value) => {
    const updatedServices = this.state.service_id.filter(service => service !== value);
    this.setState({service_id: updatedServices})
  };

  onServiceSelectOption = () => {
    const serviceOptions = [];
    this.props.formOptions.services.map(service => {
      return serviceOptions.push(<Option value={service.id} key={service.id}>{service.title}</Option>);
    });
    return serviceOptions;
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
      this.handleUpload()
    } else {
      this.onTicketAdd();
    }
  };

  handleUpload = () => {
    let formData = new FormData();
    this.state.fileList.map(file => {
      formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name);
      this.imageUpload(formData);
      return file
    });
  };

  imageUpload = (file) => {
    this.props.fetchStart();
    axios.post("/uploads/temporary/media", file, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      if (data.success) {
        this.props.fetchSuccess();
        this.setState({attachment: this.state.attachment.concat(data.data)}, () => {
          if (this.state.attachment.length === this.state.fileList.length) {
            this.onTicketAdd();
            this.setState({fileList: []})
          }
        })
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };

  onTicketAdd = () => {
    this.props.onRaiseNewTicket({...this.state});
    this.props.onToggleAddTicket();
    this.setState({fileList: []});
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const serviceOptions = this.onServiceSelectOption();
    const {title, content, product_id, department_id, priority_id, service_id, fileList} = this.state;
    const {showAddTicket, onToggleAddTicket, formOptions} = this.props;
    const {messages} = this.props.intl;
    const props = {
      multiple: true,
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showAddTicket}
          title={<IntlMessages id="tickets.addNew"/>}
          onCancel={() => onToggleAddTicket()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              <IntlMessages id="tickets.save"/>
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddTicket()}>
              <IntlMessages id="tickets.cancel"/>
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label={<IntlMessages id="tickets.subject"/>}>
              {getFieldDecorator('title', {
                initialValue: title,
                rules: [{required: true, message: messages["validation.tickets.subject"]}],
              })(<Input type="text" className="gx-form-control-lg" onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="tickets.selectProduct"/>}>
              {getFieldDecorator('product', {
                initialValue: product_id,
              })(<Select type="text" onChange={(value) => {
                this.setState({product_id: value})
              }}>
                {formOptions.products.map(product => {
                  return <Option key={product.id} value={product.id}>{product.title}</Option>
                })}
              </Select>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="tickets.selectDepartment"/>}>
              {getFieldDecorator('department_id', {
                initialValue: department_id,
              })(<Select type="text" onChange={(value) => {
                this.setState({department_id: value})
              }}>
                {formOptions.departments.map(department => {
                  return <Option key={department.id} value={department.id}>{department.name}</Option>
                })}
              </Select>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="tickets.selectService"/>}>
              {getFieldDecorator('service_id', {
                initialValue: service_id,
              })(<Select
                mode="multiple"
                placeholder={messages["tickets.services.placeholder"]}
                onSelect={this.onServiceSelect}
                onDeselect={this.onServiceRemove}>
                {serviceOptions}
              </Select>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="tickets.description"/>}>
              {getFieldDecorator('content', {
                initialValue: content,
                rules: [{
                  min: 30,
                  message: messages["validation.tickets.description"],
                }],
              })(<TextArea rows={4} className="gx-form-control-lg" onChange={(e) => {
                this.setState({content: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="tickets.selectPriority"/>}>
              {getFieldDecorator('priority_id', {
                initialValue: priority_id,
              })(<Select type="text" onChange={(value) => {
                this.setState({priority_id: value})
              }}>
                {formOptions.priorities.map(priority => {
                  return <Option key={priority.id} value={priority.id}>{priority.name}</Option>
                })}
              </Select>)}
            </Form.Item>
            <Form.Item>
              <Upload {...props}>
                <Input placeholder={messages["tickets.files.upload"]}
                       prefix={<i className="icon gx-icon-attachment"/>}/>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}


RaiseTicketModal = Form.create({})(RaiseTicketModal);

export default injectIntl(RaiseTicketModal);


RaiseTicketModal.defaultProps = {
  formOptions: {
    services: [],
    departments: [],
    products: [],
    priorities: [],
    status: []
  },
  showAddTicket: false
};

RaiseTicketModal.propTypes = {
  formOptions: PropTypes.object,
  showAddTicket: PropTypes.bool
};
