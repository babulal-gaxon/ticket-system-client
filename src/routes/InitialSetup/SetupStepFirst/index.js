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
import {onCheckInitialSetup, updateSteps} from "../../../appRedux/actions";

const {Step} = Steps;


class SetupStepFirst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormVisible: false
    }
  }

  onMoveToNextStep = () => {
    const currentStep = this.props.currentStep + 1;
    this.props.updateSteps(currentStep);
    console.log("currentStep", currentStep)
  };

  onMoveToPrevStep = () => {
    const currentStep = this.props.currentStep - 1;
    console.log("currentStep", currentStep)
    this.props.updateSteps(currentStep);
  };

  onFormOpen = () => {
    this.setState({isFormVisible: !this.state.isFormVisible})
  };

  render() {
    const {currentStep} = this.props;
    console.log("currentStep: ", currentStep)
    return (
      <div className="gx-main-layout-content">
        <Steps direction="vertical" current={currentStep} className="gx-mt-5">
          <Step title="Database Setup"
                description={currentStep === 0 ?
                  <StepFirst initialSteps={this.props.initialSteps} onMoveToNextStep={this.onMoveToNextStep}
                             isFormVisible={this.state.isFormVisible}
                             onFormOpen={this.onFormOpen}/> : null}/>
          <Step title="Setup Super Admin Account"
                description={currentStep === 1 ?
                  <SecondStep initialSteps={this.props.initialSteps} onMoveToNextStep={this.onMoveToNextStep}
                              onMoveToPrevStep={this.onMoveToPrevStep}
                              onFormOpen={this.onFormOpen}/> : null}/>
          <Step title="General Setup" description={currentStep === 2 ? <ThirdStep initialSteps={this.props.initialSteps}
                                                                                  onMoveToNextStep={this.onMoveToNextStep}
                                                                                  onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Localization Settings"
                description={currentStep === 3 ? <FourthStep onMoveToNextStep={this.onMoveToNextStep}
                                                             onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Departments" description={currentStep === 4 ? <FifthStep onMoveToNextStep={this.onMoveToNextStep}
                                                                                onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Staff Management"
                description={currentStep === 5 ? <SixthStep onMoveToNextStep={this.onMoveToNextStep}
                                                            onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Ticket Priority"
                description={currentStep === 6 ? <SeventhStep onMoveToNextStep={this.onMoveToNextStep}
                                                              onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Ticket Status"
                description={currentStep === 7 ? <EighthStep onMoveToNextStep={this.onMoveToNextStep}
                                                             onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Canned Responses"
                description={currentStep === 8 ? <NinthStep onMoveToNextStep={this.props.onMoveNextStep}
                                                            onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
        </Steps>
      </div>
    );
  }
}

const mapStateToProps = ({initialSetup}) => {
  const {initialSteps, currentStep} = initialSetup;
  return {initialSteps, currentStep};
};

export default connect(mapStateToProps, {
  onCheckInitialSetup,
  updateSteps
})(SetupStepFirst);
