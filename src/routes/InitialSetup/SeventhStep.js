import React, {Component} from 'react';
import {Button, Divider} from "antd";
import AddNewPriority from "../SetUp/TicketPriorities/AddNewPriority";

class SeventhStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddPriority: false
    }
  }

  onToggleAddPriority = () => {
    this.setState({showAddPriority: !this.state.showAddPriority})
  };

  onAddButtonClick = () => {
    this.setState({showAddPriority: true});
  };

  render() {
    return (
      <div className="gx-flex-column gx-mt-3" style={{width: "60%"}}>
        <Divider orientation="left" className="gx-mb-4">Default Priority List</Divider>
        <div className="gx-d-flex gx-justify-content-between">
          <div>
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}>Previous</Button>
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}>Next</Button>
            <Button type="link" onClick={() => this.props.onMoveToNextStep()}>Skip</Button>
          </div>
          <div><Button onClick={this.onAddButtonClick}>+Add New</Button></div>
        </div>
        {this.state.showAddPriority ?
          <AddNewPriority showAddPriority={this.state.showAddPriority}
                          onToggleAddPriority={this.onToggleAddPriority}/> : null}
      </div>
    );
  }
}

export default SeventhStep;