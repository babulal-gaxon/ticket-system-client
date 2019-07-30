import React, {Component} from 'react';
import {Steps} from "antd";
import SetupStepFirst from "./SetupStepFirst";
import SetupStepSecond from "./SetupStepSecond/index";
import InfoView from "components/InfoView"
import Auxiliary from "../../util/Auxiliary";

const {Step} = Steps;

class InitialSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  onMoveNextStep = () => {
    const current = this.state.current + 1;
    this.setState({current});
  };

  onMovePrevStep = () => {
    const current = this.state.current - 1;
    this.setState({current});
  };

  render() {
    const {current} = this.state;
    console.log("re render in index file");
    return (
      <Auxiliary>
        <div className="gx-main-layout-content full-page-scroll">
          <div className="gx-main-content-wrapper">
            <Steps direction="vertical" current={current}>
              <Step title={
                <div className="gx-mr-5">
                  <div className="gx-d-flex gx-justify-content-between">
                    <div className="gx-d-flex">
                      <h1 className="gx-font-weight-semi-bold gx-mr-2">Setup The System</h1>
                      {current === 2 ? <span className="gx-text-green">Completed</span> : null}
                    </div>
                    {current === 2 ?
                      <div>{<i className="icon icon-edit gx-mr-3" onClick={this.onMovePrevStep}/>}</div> : null}
                  </div>
                  <div className="gx-mr-5">Follow the under shown steps to quickly setup the system.</div>
                </div>}
                    description={current === 1 ? <SetupStepFirst onMoveNextStep={this.onMoveNextStep}
                                                                 onMovePrevStep={this.onMovePrevStep}/> : null}/>
              {current === 2 ?
                <Step title={<div><h1 className="gx-font-weight-semi-bold">Ticket System Settings</h1>
                  <div className="gx-mr-5">Follow the under shown steps to quickly setup the system.</div>
                </div>}
                      description={<SetupStepSecond onMoveNextStep={this.onMoveNextStep}
                                                    onMoveToPrevStep={this.onMovePrevStep}
                                                    history={this.props.history}/>}/>
                : null}
            </Steps>
          </div>
        </div>
        <InfoView/>
      </Auxiliary>
    );
  }
}

export default InitialSetup;
