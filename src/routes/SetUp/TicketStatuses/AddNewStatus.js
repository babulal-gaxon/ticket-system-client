import React, {Component} from "react"
import {Button, Checkbox, Form, Input, Modal, Radio} from "antd/lib/index";
import {SketchPicker} from "react-color";
import PropTypes from "prop-types";
import reactCSS from 'reactcss'
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

class AddNewStatus extends Component {
  constructor(props) {
    super(props);
    if (this.props.currentStatus === null) {
      this.state = {
        name: "",
        status: 1,
        is_default: 1,
        color_code: "#8D3C3C"
      };
    } else {
      const selectedStatus = this.props.currentStatus;
      this.state = {...selectedStatus};
    }
  };

  handleColorClick = () => {
    this.setState({displayColorPicker: !this.state.displayColorPicker});
  };

  handleColorClose = () => {
    this.setState({displayColorPicker: false});
  };

  handleColorChange = (color) => {
    this.setState({color_code: color.hex})
  };

  onStatusAdd = () => {
    if (this.props.currentStatus === null) {
      this.props.onAddTicketStatus({...this.state}, this);
    } else {
      this.props.onEditTicketStatus({...this.state}, this);
    }
    this.props.onToggleAddStatus();
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onStatusAdd();
      }
    });
  };
  onCheckBoxChange = (e) => {
    if (e.target.checked) {
      this.setState({is_default: 1})
    } else {
      this.setState({is_default: 0})
    }
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {name, color_code, status, is_default} = this.state;
    const {showAddStatus, onToggleAddStatus} = this.props;
    const {messages} = this.props.intl;
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: color_code
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showAddStatus}
          title={this.props.currentStatus === null ? <IntlMessages id="statuses.new"/> :
            <IntlMessages id="statuses.edit"/>}
          onCancel={onToggleAddStatus}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              <IntlMessages id="common.save"/>
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddStatus()}>
              <IntlMessages id="common.cancel"/>
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label={<IntlMessages id="common.name"/>}>
              {getFieldDecorator('name', {
                initialValue: name,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: messages["validation.statuses.name"]}],
              })(<Input type="text" autoFocus onChange={(e) => {
                this.setState({name: e.target.value})
              }}/>)}

            </Form.Item>
            <Form.Item label={<IntlMessages id="common.colorCode"/>}>
              <div>
                <div style={styles.swatch} onClick={this.handleColorClick} className="gx-d-flex">
                  <div style={styles.color} className="gx-mr-2"/>
                  <span>{color_code}</span>
                </div>
                {this.state.displayColorPicker ? <div style={styles.popover}>
                  <div style={styles.cover} onClick={this.handleColorClose}/>
                  <SketchPicker color={color_code} onChange={this.handleColorChange}/>
                </div> : null}
              </div>
            </Form.Item>
            <Form.Item>
              <Checkbox className="gx-form-control-lg" checked={is_default} onChange={this.onCheckBoxChange}>
                <IntlMessages id="statuses.setAsDefault"/>
              </Checkbox>
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.status"/>}>
              <Radio.Group value={status} onChange={(e) => {
                this.setState({status: e.target.value})
              }}>
                <Radio value={1}>{<IntlMessages id="common.active"/>}</Radio>
                <Radio value={0}>{<IntlMessages id="common.disable"/>}</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

AddNewStatus = Form.create({})(AddNewStatus);

export default injectIntl(AddNewStatus);


AddNewStatus.defaultProps = {
  statuses: [],
  currentStatus: null,
  showAddStatus: true,
};

AddNewStatus.propTypes = {
  statuses: PropTypes.array,
  currentStatus: PropTypes.number,
  showAddStatus: PropTypes.bool,
  onToggleAddStatus: PropTypes.func,
  onAddTicketStatus: PropTypes.func,
  onEditTicketStatus: PropTypes.func
};
