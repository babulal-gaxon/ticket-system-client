import React, {Component} from 'react';
import {Button} from "antd/lib/index";
import AddNewStaff from "./AddNewStaff";

class SixthStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false
    }
  }

  onToggleAddModal = () => {
    this.setState({showAddModal: !this.state.showAddModal})
  };

  render() {
    const {showAddModal} = this.state;
    return (
      <div className="gx-flex-column gx-mt-3">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <h3 className="gx-font-weight-bold gx-my-4">No staff member found. Get start to add your staff now!</h3>
          <Button type="primary" onClick={this.onToggleAddModal}>Add New</Button>
        </div>
        {showAddModal ?
          <AddNewStaff showAddModal={showAddModal}
                       onToggleAddModal={this.onToggleAddModal}
                       onMoveToNextStep={this.props.onMoveToNextStep}/> : null}
      </div>
    );
  }
}

export default SixthStep;