import React, {Component} from 'react';
import {Steps} from "antd";
import StepFirst from "./StepFirst";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FifthStep from "./FifthStep";
import SixthStep from "./SixthStep";
import SeventhStep from "./SeventhStep";
import EighthStep from "./EighthStep";
import NinthStep from "./NinthStep";

const {Step} = Steps;


class InitialSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  onMoveToNextStep = () => {
    const current = this.state.current + 1;
    this.setState({current});
  };

  onMoveToPrevStep = () => {
    const current = this.state.current - 1;
    this.setState({current});
  };

  render() {
    const {current} = this.state;
    return (
      <div className="gx-main-layout-content">
        <h1 className="gx-font-weight-semi-bold">Setup The System</h1>
        <div className="gx-mr-5">Follow the under shown steps to quickly setup the system.</div>
        <Steps direction="vertical" current={this.state.current} className="gx-mt-5">
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
                description={current === 9 ? <NinthStep onMoveToNextStep={this.onMoveToNextStep}
                                                          onMoveToPrevStep={this.onMoveToPrevStep}/> : null}/>
        </Steps>
      </div>
    );
  }
}

export default InitialSetup;