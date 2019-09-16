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
import IntlMessages from "../../../util/IntlMessages";
import InfoView from "../../../components/InfoView";

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
    this.setState({isFormVisible: false})
  };

  onMoveToPrevStep = () => {
    const currentStep = this.props.currentStep - 1;
    this.props.updateSteps(currentStep);
  };

  onFormOpen = () => {
    this.setState({isFormVisible: !this.state.isFormVisible})
  };

  render() {
    const {currentStep} = this.props;

    return (
      <div className="gx-main-layout-content">
        <div className="gx-main-content-wrapper">
          <Steps direction="vertical" current={currentStep}>
            <Step title={<IntlMessages id="setup.databaseSetup"/>}
                  description={currentStep === 0 ?
                    <StepFirst initialSteps={this.props.initialSteps} onMoveToNextStep={this.onMoveToNextStep}
                               isFormVisible={this.state.isFormVisible}
                               onFormOpen={this.onFormOpen}/> : null}/>
            <Step title={<IntlMessages id="setup.superAdminAccount"/>}
                  description={currentStep === 1 ?
                    <SecondStep initialSteps={this.props.initialSteps} onMoveToNextStep={this.onMoveToNextStep}
                                onMoveToPrevStep={this.onMoveToPrevStep}
                                onFormOpen={this.onFormOpen}/> : null}/>
            <Step title={<IntlMessages id="settings.generalSetup"/>}
                  description={currentStep === 2 ? <ThirdStep initialSteps={this.props.initialSteps}
                                                              onMoveToNextStep={this.onMoveToNextStep}
                                                              onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
            <Step title={<IntlMessages id="settings.localization.heading"/>}
                  description={currentStep === 3 ? <FourthStep onMoveToNextStep={this.onMoveToNextStep}
                                                               onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
            <Step title={<IntlMessages id="departments.title"/>}
                  description={currentStep === 4 ? <FifthStep onMoveToNextStep={this.onMoveToNextStep}
                                                              onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
            <Step title={<IntlMessages id="setup.staffManagement"/>}
                  description={currentStep === 5 ? <SixthStep onMoveToNextStep={this.onMoveToNextStep}
                                                              onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
            <Step title={<IntlMessages id="setup.ticketPriority"/>}
                  description={currentStep === 6 ? <SeventhStep onMoveToNextStep={this.onMoveToNextStep}
                                                                onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
            <Step title={<IntlMessages id="setup.ticketStatus"/>}
                  description={currentStep === 7 ? <EighthStep onMoveToNextStep={this.onMoveToNextStep}
                                                               onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
            <Step title={<IntlMessages id="responses.title"/>}
                  description={currentStep === 8 ? <NinthStep onMoveToNextStep={this.props.onMoveNextStep}
                                                              onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          </Steps>
        </div>
        <InfoView/>
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
