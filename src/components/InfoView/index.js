import React, {PureComponent} from 'react';
import CircularProgress from "components/CircularProgress/index";
import {message} from 'antd';
import Auxiliary from "util/Auxiliary";
import {connect} from "react-redux";
import {hideMessage} from "appRedux/actions/Common";

class InfoView extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (nextProps.error || nextProps.message || nextProps.displayMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
  }

  showMessage = (displayMessage) => {
    message.success(displayMessage)
  };
  showError = (error) => {
    message.error(error)
  };

  render() {
    const {error, loading, displayMessage, styleName} = this.props;
    console.log("styleName", styleName)
    return (
      <Auxiliary>
        {loading && <div className={`gx-loader-view ${styleName}`} >
          <CircularProgress className=""/>
        </div>}

        {displayMessage && this.showMessage(displayMessage)}
        {error && this.showError(error)}

      </Auxiliary>
    );
  }
}

const mapStateToProps = ({commonData}) => {
  const {error, loading} = commonData;
  const displayMessage = commonData.message;
  return {error, loading, displayMessage};
};

export default connect(mapStateToProps, {hideMessage})(InfoView);
