import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio} from "antd";
import PropTypes from "prop-types";
import {SketchPicker} from "react-color";
import reactCSS from 'reactcss';

class AddNewPriority extends Component {
  constructor(props) {
    super(props);
    if (this.props.priorityId === 0) {
      this.state = {
        name: "",
        color_code: "#8D3C3C",
        desc: "",
        status: 1,
        value: 1
      };
    } else {
      const selectedPriority = this.props.priorities.find(priority => priority.id === this.props.priorityId);
      console.log("selectedPriority", selectedPriority);
      const {name, desc, status, value, color_code} = selectedPriority;
      this.state = {
        name: name,
        color_code: color_code,
        desc: desc,
        status: status,
        value: value
      };
    }
  };
  onPriorityAdd = () => {
    if (this.props.priorityId === 0) {
      const newPriority = {
        name: this.state.name,
        desc: this.state.desc,
        status: this.state.status,
        value: this.state.value,
        color_code: this.state.color_code,
      };
      this.props.onAddTicketPriority(newPriority);
    } else {
      const newPriority = {
        name: this.state.name,
        desc: this.state.desc,
        status: this.state.status,
        value: this.state.value,
        color_code: this.state.color_code,
        id: this.props.priorityId
      };
      this.props.onEditTicketPriority(newPriority);
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

  render() {
    const {name, value, desc, status, color_code} = this.state;
    const {showAddPriority, onToggleAddPriority} = this.props;
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
      <div>
        <Modal
          visible={showAddPriority}
          title="Add New Priority"
          onCancel={onToggleAddPriority}
          footer={[
            <Button key="submit" type="primary" onClick={this.onPriorityAdd}>
              {this.props.priorityId === 0 ? "Add" : "Edit"}
            </Button>,
            <Button key="cancel" onClick={onToggleAddPriority}>
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
                <div style={styles.swatch} onClick={this.handleColorClick}>
                  <div style={styles.color}/>
                  <span>{color_code}</span>
                </div>
                {this.state.displayColorPicker ? <div style={styles.popover}>
                  <div style={styles.cover} onClick={this.handleColorClose}/>
                  <SketchPicker color={color_code} onChange={this.handleColorChange}/>
                </div> : null}
              </div>
            </Form.Item>
            <Form.Item label="Description">
              <Input className="gx-form-control-lg" type="textarea" value={desc} onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="Priority Value">
              <Input className="gx-form-control-lg" type="text" value={value} onChange={(e) => {
                this.setState({value: e.target.value})
              }}/>
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

export default AddNewPriority;


AddNewPriority.defaultProps = {
  priorities: [],
  priorityId: 0,
  showAddPriority: true
};

AddNewPriority.propTypes = {
  priorities: PropTypes.array,
  priorityId: PropTypes.number,
  showAddPriority: PropTypes.bool,
  onToggleAddPriority: PropTypes.func,
  onAddTicketPriority: PropTypes.func,
  onEditTicketPriority: PropTypes.func
};
