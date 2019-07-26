import React, {Component} from "react"
import {Button, Checkbox, Form, Input, Modal, Radio} from "antd/lib/index";
import {SketchPicker} from "react-color";
import PropTypes from "prop-types";
import reactCSS from 'reactcss'

class AddNewStatus extends Component {
  constructor(props) {
    super(props);
    if (this.props.statusId === null) {
      this.state = {
        name: "",
        status: 1,
        is_default: 1,
        color_code: "#8D3C3C"
      };
    } else {
      const selectedStatus = this.props.statuses.find(status => status.id === this.props.statusId);
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
    if (this.props.statusId === null) {
      this.props.onAddTicketStatus({...this.state});
      this.props.onToggleAddStatus();
    } else {
      this.props.onEditTicketStatus({...this.state});
      this.props.onToggleAddStatus();
    }
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
          title={this.props.statusId === null ? "Add New Ticket Status" : "Edit Ticket Status Details"}
          onCancel={onToggleAddStatus}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddStatus()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                initialValue: name,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please Enter Status Name!'}],
              })(<Input type="text" autoFocus onChange={(e) => {
                this.setState({name: e.target.value})
              }}/>)}

            </Form.Item>
            <Form.Item label="Color Code">
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
                Set as Default
              </Checkbox>
            </Form.Item>
            <Form.Item label="Status">
              <Radio.Group value={status} onChange={(e) => {
                this.setState({status: e.target.value})
              }}>
                <Radio value={1}>Active</Radio>
                <Radio value={0}>Disabled</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

AddNewStatus = Form.create({})(AddNewStatus);

export default AddNewStatus;


AddNewStatus.defaultProps = {
  statuses: [],
  statusId: null,
  showAddStatus: true,
};

AddNewStatus.propTypes = {
  statuses: PropTypes.array,
  statusId: PropTypes.number,
  showAddStatus: PropTypes.bool,
  onToggleAddStatus: PropTypes.func,
  onAddTicketStatus: PropTypes.func,
  onEditTicketStatus: PropTypes.func
};