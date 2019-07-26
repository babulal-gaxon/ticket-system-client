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
    console.log("in constructor",props.initialSteps)
    super(props);
    if (Object.keys(props.initialSteps).length > 0) {
      if (Object.keys(props.initialSteps).length > 2) {
        this.state = {
          current: 1,
        };
      } else {
        this.state = {
          current: 2
        };
      }
    } else {
      this.state = {
        current: 3
      }
    }
  }

  onMoveToNextStep = () => {

    const current = this.state.current + 1;
    this.setState({current});
    console.log("current",current)
  };

  onMoveToPrevStep = () => {
    const current = this.state.current - 1;
    this.setState({current});
  };

  render() {

    const {current} = this.state;
    console.log("current in render", current)
    return (
      <div className="gx-main-layout-content">
        <Steps direction="vertical" current={current} className="gx-mt-5">
          <Step title="Database Setup"
                description={current === 1 ? <StepFirst onMoveToNextStep={this.onMoveToNextStep}/> : null}/>
          <Step title="Setup Super Admin Account"
                description={current === 2 ? <SecondStep onMoveToNextStep={this.onMoveToNextStep}
                                                         onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="General Setup" description={current === 3 ? <ThirdStep onMoveToNextStep={this.onMoveToNextStep}
                                                                              onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Localization Settings"
                description={current === 4 ? <FourthStep onMoveToNextStep={this.onMoveToNextStep}
                                                         onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Departments" description={current === 5 ? <FifthStep onMoveToNextStep={this.onMoveToNextStep}
                                                                            onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Staff Management"
                description={current === 6 ? <SixthStep onMoveToNextStep={this.onMoveToNextStep}
                                                        onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Ticket Priority"
                description={current === 7 ? <SeventhStep onMoveToNextStep={this.onMoveToNextStep}
                                                          onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Ticket Status"
                description={current === 8 ? <EighthStep onMoveToNextStep={this.onMoveToNextStep}
                                                         onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
          <Step title="Canned Responses"
                description={current === 9 ? <NinthStep onMoveToNextStep={this.props.onMoveNextStep}
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
