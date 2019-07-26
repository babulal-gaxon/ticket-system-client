import React, {Component} from 'react';
import {Steps} from "antd/lib/index";
import StepFirst from "./StepFirst";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FifthStep from "./FifthStep";
import SixthStep from "./SixthStep";
import SeventhStep from "./SeventhStep";
import EighthStep from "./EighthStep";
import NinthStep from "./NinthStep";
import {connect} from "react-redux";
import {onCheckInitialSetup} from "../../../appRedux/actions";

const {Step} = Steps;


class SetupStepFirst extends Component {
  constructor(props) {
    super(props);
    if (props.initialSteps.pending_steps && Object.keys(props.initialSteps.pending_steps).length > 0) {
      if (Object.keys(props.initialSteps.pending_steps).length > 4) {
        this.state = {
          current: 0,
          isFormVisible: false
        };
      } else if (Object.keys(props.initialSteps.pending_steps).length > 1 && Object.keys(props.initialSteps.pending_steps).length < 5) {
        this.state = {
          current: 1,
          isFormVisible: false
        };
      } else {
        this.state = {
          current: 2, isFormVisible: false
        }
      }
    } else {
      this.state = {
        current: 3, isFormVisible: false
      }
    }
  }

  onMoveToNextStep = () => {

    const current = this.state.current + 1;
    this.setState({current});
    console.log("current", current)
  };

  onMoveToPrevStep = () => {
    const current = this.state.current - 1;
    this.setState({current});
  };

  onFormOpen = () => {
    this.setState({isFormVisible: !this.state.isFormVisible})
  };

  render() {
    const {current} = this.state;

    return (
      <div className="gx-main-layout-content">
        <Steps direction="vertical" current={current} className="gx-mt-5">
          <Step title="Database Setup"
                description={current === 0 ?
                  <StepFirst initialSteps={this.props.initialSteps} onMoveToNextStep={this.onMoveToNextStep}
                             isFormVisible={this.state.isFormVisible}
                             onFormOpen={this.onFormOpen}/> : null}/>
          <Step title="Setup Super Admin Account"
                description={current === 1 ?
                  <SecondStep initialSteps={this.props.initialSteps} onMoveToNextStep={this.onMoveToNextStep}
                              onMoveToPrevStep={this.onMoveToPrevStep}
                              onFormOpen={this.onFormOpen}/> : null}/>
          <Step title="General Setup" description={current === 2 ? <ThirdStep initialSteps={this.props.initialSteps}
                                                                              onMoveToNextStep={this.onMoveToNextStep}
                                                                              onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Localization Settings"
                description={current === 3 ? <FourthStep onMoveToNextStep={this.onMoveToNextStep}
                                                         onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Departments" description={current === 4 ? <FifthStep onMoveToNextStep={this.onMoveToNextStep}
                                                                            onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Staff Management"
                description={current === 5 ? <SixthStep onMoveToNextStep={this.onMoveToNextStep}
                                                        onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Ticket Priority"
                description={current === 6 ? <SeventhStep onMoveToNextStep={this.onMoveToNextStep}
                                                          onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Ticket Status"
                description={current === 7 ? <EighthStep onMoveToNextStep={this.onMoveToNextStep}
                                                         onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Canned Responses"
                description={current === 8 ? <NinthStep onMoveToNextStep={this.props.onMoveNextStep}
                                                        onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
        </Steps>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {initialSteps} = auth;
  return {initialSteps};
};

export default connect(mapStateToProps, {
  onCheckInitialSetup
})(SetupStepFirst);
