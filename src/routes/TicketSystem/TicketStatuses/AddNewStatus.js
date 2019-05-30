import React, {Component} from "react"
import {Button, Checkbox, Form, Input, Modal, Radio, Select} from "antd";
import {ChromePicker, SketchPicker} from "react-color";
import reactCSS from 'reactcss'


class AddNewStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      desc: "",
      status: "",
      is_default: 0,
      checked: false,
      displayColorPicker: false,
      color_code: "",
    }
  }

  handleColorClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleColorClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleColorChange = (color) => {
    this.setState({ color_code: color.hex })
  };

  

  onCheckBoxChange = (e) => {

    this.setState({checked: e.target.checked});
    if(e.target.checked) {
      this.setState({is_default: 1})
    }
    else {
      this.setState({is_default:0})
    }
  }

  render() {
    const {name, color_code, is_default, desc, status} = this.state;
    const {showAddStatus, onToggleAddStatus, onAddTicketStatus} = this.props;
    const {Option} = Select;

    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }

    return (

      <div>

        <Modal
          visible={showAddStatus}
          title="Add New Ticket Status"
          onCancel={onToggleAddStatus}
          footer={[
            <Button key="submit" type="primary" onClick={() => {
              onAddTicketStatus(this.state)
            }}>
              Add
            </Button>,
            <Button key="cancel" onClick={onToggleAddStatus}>
              Cancel
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input type="text" value={name} onChange={(e) => {
                this.setState({name: e.target.value})
              }}/>
            </Form.Item>

            <Form.Item label="Color Code">
              {/*<div>*/}
                {/*<div className="cp-swatch" onClick={this.handleColorClick}>*/}
                  {/*<div className="cp-color"*/}
                       {/*style={{backgroundColor: background}}/>*/}
                {/*</div>*/}
                {/*{this.state.displayColorPicker ? <div className="cp-popover">*/}
                  {/*<div className="cp-cover" onClick={this.handleColorClose}/>*/}
                  {/*<SketchPicker color={color_code} onChange={this.handleColorChange}/>*/}
                {/*</div> : null}*/}

              {/*</div>*/}


              <div>
                <button onClick={ this.handleColorClick }>Pick Color</button>
                { this.state.displayColorPicker ? <div style={ popover }>
                  <div style={ cover } onClick={ this.handleColorClose }/>
                  <ChromePicker color={color_code} onChange={this.handleColorChange} />
                </div> : null }
              </div>

            </Form.Item>




            <Form.Item label="Description">
              <Input className="gx-form-control-lg" type="textarea" value={desc} onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>
            </Form.Item>

            <Form.Item >
              <Checkbox className="gx-form-control-lg" checked={this.state.checked} onChange ={this.onCheckBoxChange}>
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

export default AddNewStatus