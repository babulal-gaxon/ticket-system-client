import React, {Component} from 'react';
import {Button, Divider} from "antd";
import AddNewDepartment from "../SetUp/Departments/AddNewDepartment";

class FifthStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddDepartment: false
    }
  }

  onToggleAddDepartment = () => {
    this.setState({showAddDepartment: !this.state.showAddDepartment})
  };

  onAddButtonClick = () => {
    this.setState({showAddDepartment: true});
  };

  render() {
    return (
      <div className="gx-flex-column gx-mt-3" style={{width: "60%"}}>
        <Divider orientation="left" className="gx-mb-4">Default Department List</Divider>
        <div className="gx-d-flex gx-justify-content-between">
          <div>
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}>Previous</Button>
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}>Next</Button>
            <Button type="link" onClick={() => this.props.onMoveToNextStep()}>Skip</Button>
          </div>
          <div><Button onClick={this.onAddButtonClick}>+Add New</Button></div>
        </div>
        {this.state.showAddDepartment ?
          <AddNewDepartment showAddDepartment={this.state.showAddDepartment}
                            onToggleAddDepartment={this.onToggleAddDepartment}
          /> : null}
      </div>
    );
  }
}

export default FifthStep;