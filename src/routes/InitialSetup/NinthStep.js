import React, {Component} from 'react';
import {Button, Divider} from "antd";
import AddNewResponses from "../SetUp/CannedResponses/AddNewResponses";

class NinthStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddCanned: false
    }
  }

  onToggleAddCanned = () => {
    this.setState({showAddCanned: !this.state.showAddCanned})
  };

  onAddButtonClick = () => {
    this.setState({showAddCanned: true});
  };

  render() {
    return (
      <div className="gx-flex-column gx-mt-3" style={{width: "60%"}}>
        <Divider orientation="left" className="gx-mb-4">Default Canned Responses</Divider>
        <div className="gx-d-flex gx-justify-content-between">
          <div>
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}>Previous</Button>
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}>Next</Button>
            <Button type="link" onClick={() => this.props.onMoveToNextStep()}>Skip</Button>
          </div>
          <div><Button onClick={this.onAddButtonClick}>+Add New</Button></div>
        </div>
        {this.state.showAddCanned ?
          <AddNewResponses showAddCanned={this.state.showAddCanned}
                           onToggleAddCanned={this.onToggleAddCanned}
          /> : null}
      </div>
    );
  }
}

export default NinthStep;