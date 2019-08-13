import React, {Component} from 'react';
import {Divider, Steps} from "antd";
import SetupStepFirst from "./SetupStepFirst";
import SetupStepSecond from "./SetupStepSecond/index";
import InfoView from "components/InfoView"
import Auxiliary from "../../util/Auxiliary";
import IntlMessages from "../../util/IntlMessages";
import {Link, withRouter} from "react-router-dom";
import UserProfile from "../../containers/Sidebar/UserProfile";
import {connect} from "react-redux";

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
    const {token} = this.props;

    return (
      <Auxiliary>
        <div className="gx-main-layout-content full-page-scroll">
          <div className="gx-main-content-wrapper">
            <div className="gx-d-flex gx-justify-content-between gx-my-3">
            <div className="gx-pl-5"><img src={require(`assets/images/logo-white.svg`)} alt="ticksup"/></div>
              <div className="gx-d-flex">
                <div className="gx-pr-5">
            <Link to="/">
              <span><i className="icon icon-menu-right"/></span>
              <span className="gx-ml-2"><IntlMessages id="topBar.dashboard.howItWorks"/></span>
            </Link>
                </div>
                {token ?
              <UserProfile/> : null}
              </div>
            </div>
            <Divider/>
            <Steps direction="vertical" current={current}>
              <Step title={
                <div className="gx-mr-5">
                  <div className="gx-d-flex gx-justify-content-between">
                    <div className="gx-d-flex">
                      <h1 className="gx-font-weight-semi-bold gx-mr-2"><IntlMessages id="setup.setupTheSystem"/></h1>
                      {current === 2 ?
                        <span className="gx-text-green">><IntlMessages id="common.completed"/></span> : null}
                    </div>
                    {current === 2 ?
                      <div>{<i className="icon icon-edit gx-mr-3" onClick={this.onMovePrevStep}/>}</div> : null}
                  </div>
                  <div className="gx-mr-5"><IntlMessages id="setup.message.instruction"/></div>
                </div>}
                    description={current === 1 ? <SetupStepFirst onMoveNextStep={this.onMoveNextStep}
                                                                 onMovePrevStep={this.onMovePrevStep}/> : null}/>
              {current === 2 ?
                <Step title={<div><h1 className="gx-font-weight-semi-bold">Ticket System Settings</h1>
                  <div className="gx-mr-5"><IntlMessages id="setup.message.instruction"/></div>
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

const mapStateToProps = ({auth}) => {
  const {token} = auth;
  return {token}
};

export default withRouter(connect(mapStateToProps, {})(InitialSetup));


