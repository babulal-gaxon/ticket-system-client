import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio} from "antd/lib/index";
import PropTypes from "prop-types";
import {SketchPicker} from "react-color";
import reactCSS from 'reactcss';

const {TextArea} = Input;

class AddNewPriority extends Component {
  constructor(props) {
    super(props);
    if (this.props.priorityId === null) {
      this.state = {
        name: "",
        color_code: "#8D3C3C",
        desc: "",
        status: 1,
        value: 1
      };
    } else {
      const selectedPriority = this.props.priorities.find(priority => priority.id === this.props.priorityId);
      this.state = {
        ...selectedPriority
      };
    }
  };

  onPriorityAdd = () => {
    if (this.props.priorityId === null) {
      this.props.onAddTicketPriority({...this.state});
      this.props.onToggleAddPriority();
    } else {
      this.props.onEditTicketPriority({...this.state});
      this.props.onToggleAddPriority();
    }
  };
  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onPriorityAdd();
      }
    });
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
    const {getFieldDecorator} = this.props.form;
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
      <div className="gx-main-layout-content">
        <Modal
          visible={showAddPriority}
          title={this.props.priorityId === null ? "Add New Priority" : "Edit Priority Details"}
          onCancel={onToggleAddPriority}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddPriority()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                initialValue: name,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please Enter Priority Name!'}],
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
            <Form.Item label="Description">
              {getFieldDecorator('desc', {
                initialValue: desc,
                validate: [{
                  trigger: 'onBlur',
                  rules: [
                    { required: true,
                      message: 'Please Enter Description!' },
                  ],
                }, {
                  trigger: 'onChange',
                  rules: [
                    {max: 250,
                      message: 'Description length should not exceed 250 characters' },
                  ],
                }],
              })(<TextArea rows={4} className="gx-form-control-lg" type="textarea" onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Priority Weight">
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

AddNewPriority = Form.create({})(AddNewPriority);

export default AddNewPriority;


AddNewPriority.defaultProps = {
  priorities: [],
  priorityId: null,
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
