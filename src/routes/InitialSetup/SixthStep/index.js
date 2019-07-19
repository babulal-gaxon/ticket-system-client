import React, {Component} from 'react';
import {Button} from "antd/lib/index";
import AddNewStaff from "./AddNewStaff";
import Widget from "../../../components/Widget";

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
        <Widget styleName="gx-card-filter gx-mr-2">
          <h3 className="gx-font-weight-bold gx-my-4">No staff member found. Get start to add your staff now!</h3>
          <Button type="primary" onClick={this.onToggleAddModal}>Add New</Button>
        </Widget>
        <div className="gx-d-flex">
          <Button type="default" onClick={() => this.props.onMoveToPrevStep()}>Previous</Button>
          <Button type="primary" onClick={() => this.props.onMoveToNextStep()}>Next</Button>
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