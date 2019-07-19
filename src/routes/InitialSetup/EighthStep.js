import React, {Component} from 'react';
import {Button, Divider} from "antd";
import AddNewStatus from "../SetUp/TicketStatuses/AddNewStatus";

class EighthStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddStatus: false
    }
  }

  onToggleAddStatus = () => {
    this.setState({showAddStatus: !this.state.showAddStatus})
  };

  onAddButtonClick = () => {
    this.setState({showAddStatus: true});
  };

  render() {
    return (
      <div className="gx-flex-column gx-mt-3" style={{width: "60%"}}>
        <Divider orientation="left" className="gx-mb-4">Default Status List</Divider>
        <div className="gx-d-flex gx-justify-content-between">
          <div>
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}>Previous</Button>
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}>Next</Button>
            <Button type="link" onClick={() => this.props.onMoveToNextStep()}>Skip</Button>
          </div>
          <div><Button onClick={this.onAddButtonClick}>+Add New</Button></div>
        </div>
        {this.state.showAddStatus ?
          <AddNewStatus showAddStatus={this.state.showAddStatus}
                        onToggleAddStatus={this.onToggleAddStatus}
          /> : null}
      </div>
    );
  }
}


export default EighthStep;