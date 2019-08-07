import React, {Component} from 'react';
import {connect} from "react-redux";
import {onVerifyAccountEmail} from "../appRedux/actions";
import qs from "qs";
import InfoView from "../components/InfoView";
import {injectIntl} from "react-intl";

class VerifyEmail extends Component {
  componentWillMount() {
    const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    this.props.onVerifyAccountEmail(queryParams.token, this.props.history, this)
  }

  render() {
    return (
      <div>
        <InfoView/>
      </div>
    );
  }
}

export default connect(null, {onVerifyAccountEmail})(injectIntl(VerifyEmail));
