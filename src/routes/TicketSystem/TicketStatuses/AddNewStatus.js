import React, {Component} from "react"
import {Button, Checkbox, Form, Input, Modal, Radio} from "antd";
import {ChromePicker} from "react-color";
import PropTypes from "prop-types";

class AddNewStatus extends Component {
  constructor(props) {
    super(props);
    if (this.props.statusId === 0) {
      this.state = {
        name: "",
        desc: "",
        status: "",
        is_default: 0,
        checked: false,
        displayColorPicker: false,
        color_code: "",
      };
    }
    else {
      const selectedStatus = this.props.statuses.find(status => status.id === this.props.statusId);
      console.log("selectedstatus", selectedStatus);
      const {name, desc, status, is_default, color_code} = selectedStatus;
      this.state = {
        name: name,
        desc: desc,
        status: status,
        is_default: is_default,
        displayColorPicker: false,
        color_code: color_code,
        checked: is_default
      };
    }
  };
  handleColorClick = () => {
    this.setState({displayColorPicker: !this.state.displayColorPicker});
  };
  handleColorClose = () => {
    this.setState({displayColorPicker: false});
  };
  handleColorChange = (color) => {
    this.setState({color_code: color.hex.toUpperCase()})
  };
  onStatusAdd = () => {
    if (this.props.statusId === 0) {
      const newStatus = {
        name: this.state.name,
        desc: this.state.desc,
        status: this.state.status,
        is_default: this.state.is_default,
        color_code: this.state.color_code,
      };
      this.props.onAddTicketStatus(newStatus);
    } else {
      const newStatus = {
        name: this.state.name,
        desc: this.state.desc,
        status: this.state.status,
        is_default: this.state.is_default,
        color_code: this.state.color_code,
        id: this.props.statusId
      };
      this.props.onEditTicketStatus(newStatus);
    }
  };
  onCheckBoxChange = (e) => {
    this.setState({checked: e.target.checked});
    if (e.target.checked) {
      this.setState({is_default: 1})
    } else {
      this.setState({is_default: 0})
    }
  };
  render() {
    const {name, color_code, desc, status} = this.state;
    const {showAddStatus, onToggleAddStatus} = this.props;
    const popover = {
      position: 'absolute',
      zIndex: '2',
    };
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    };
    return (
      <div>
        <Modal
          visible={showAddStatus}
          title="Add New Ticket Status"
          onCancel={onToggleAddStatus}
          footer={[
            <Button key="submit" type="primary" onClick={this.onStatusAdd}>
              {this.props.statusId === 0 ? "Add" : "Edit"}
            </Button>,
            <Button key="cancel" onClick={onToggleAddStatus}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input type="text" value={name} onChange={(e) => {
                this.setState({name: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="Color Code">
              <div>
                <button onClick={this.handleColorClick}>Pick Color</button>
                {this.state.displayColorPicker ? <div style={popover}>
                  <div style={cover} onClick={this.handleColorClose}/>
                  <ChromePicker color={color_code} onChange={this.handleColorChange}/>
                </div> : null}
              </div>
            </Form.Item>
            <Form.Item label="Description">
              <Input className="gx-form-control-lg" type="textarea" value={desc} onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item>
              <Checkbox className="gx-form-control-lg" checked={this.state.checked} onChange={this.onCheckBoxChange}>
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

export default AddNewStatus;


AddNewStatus.defaultProps = {
  statuses: [],
  statusId: '',
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