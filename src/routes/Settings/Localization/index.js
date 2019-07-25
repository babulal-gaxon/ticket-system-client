import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Breadcrumb, Button, Col, Form, Radio, Select} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {onGetLocalizationDetails, onSaveLocalizationDetails} from "../../../appRedux/actions/GeneralSettings";
import InfoView from "../../../components/InfoView";
import PropTypes from "prop-types";

const {Option} = Select;

class Localization extends Component {
  constructor(props) {
    super(props);
    if (this.props.localizationDetails === null) {
      this.state = {
        date_format: "",
        time_format: "",
        default_language: "",
        allow_language_selection: "0"
      }
    } else {
      const {date_format, time_format, default_language, allow_language_selection} = this.props.localizationDetails;
      this.state = {
        date_format: date_format,
        time_format: time_format,
        default_language: default_language,
        allow_language_selection: allow_language_selection
      }
    }
  }

  componentDidMount() {
    this.props.onGetLocalizationDetails();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {date_format, time_format, default_language, allow_language_selection} = nextProps.localizationDetails;
    if (JSON.stringify(nextProps.localizationDetails) !== JSON.stringify(this.props.localizationDetails)) {
      this.setState({
        date_format: date_format,
        time_format: time_format,
        default_language: default_language,
        allow_language_selection: allow_language_selection
      })
    }
  };

  onDateSelect = value => {
    this.setState({date_format: value})
  };
  onTimeSelect = value => {
    this.setState({time_format: value})
  };
  onLanguageSelect = value => {
    this.setState({default_language: value})
  };
  onChangePermission = event => {
    this.setState({allow_language_selection: event.target.value})
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.onSaveLocalizationDetails({...this.state});
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {date_format, time_format, default_language, allow_language_selection} = this.state;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-font-weight-bold">Localization Settings</h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/settings/general-settings">Settings</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/settings/localization" className="gx-text-primary">Localization</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Form layout="vertical">
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label="Date Format">
                  {getFieldDecorator('date_format', {
                    initialValue: date_format,
                    rules: [{required: true, message: 'Please Enter Date format!'}],
                  })(<Select style={{width: "100%"}} onChange={this.onDateSelect}>
                    <Option value="mm/dd/yy">MM/DD/YY</Option>
                    <Option value="mm/yy/dd">MM/YY/DD</Option>
                    <Option value="dd/mm/yy">DD/MM/YY</Option>
                    <Option value="dd/yy/mm">DD/YY/MM</Option>
                    <Option value="yy/dd/mm">YY/DD/MM</Option>
                    <Option value="yy/mm/dd">YY/MM/DD</Option>
                  </Select>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label="Time Format">
                  {getFieldDecorator('time_format', {
                    initialValue: time_format,
                    rules: [{required: true, message: 'Please Enter State Name!'}],
                  })(<Select style={{width: "100%"}} onChange={this.onTimeSelect}>
                    <Option value="24 Hours">24 Hours (20:30)</Option>
                    <Option value="12 Hours">12 Hours (08:30)</Option>
                  </Select>)}
                </Form.Item>
              </Col>
            </div>
            <Form.Item label="Default Language" style={{width: "49%"}}>
              {getFieldDecorator('default_language', {
                initialValue: default_language,
                rules: [{required: true, message: 'Please Enter State Name!'}],
              })(<Select style={{width: "100%"}} onChange={this.onLanguageSelect}>
                <Option value="en">English</Option>
                <Option value="ar">Arabic</Option>
                <Option value="es">Spanish</Option>
                <Option value="fr">French</Option>
                <Option value="it">Italian</Option>
              </Select>)}
            </Form.Item>
            <Form.Item label="Language Selection for Customers" style={{width: "49%"}}>
              {getFieldDecorator('disable_language_selection', {
                initialValue: allow_language_selection,
                rules: [{required: true, message: 'Please Enter State Name!'}],
              })(<Radio.Group onChange={(event) => this.onChangePermission(event)}>
                <Radio value="1">Allowed</Radio>
                <Radio value="0">Not-Allowed</Radio>
              </Radio.Group>)}
            </Form.Item>
            <hr/>
            <div className="gx-d-flex">
              <Button type="primary" style={{width: "150px"}} onClick={this.onValidationCheck}>Save</Button>
            </div>
          </Form>
        </Widget>
        <InfoView/>
      </div>
    );
  }
}

Localization = Form.create({})(Localization);

const mapStateToProps = ({generalSettings}) => {
  const {localizationDetails} = generalSettings;
  return {localizationDetails};
};

export default connect(mapStateToProps, {
  onGetLocalizationDetails,
  onSaveLocalizationDetails
})(Localization);

Localization.defaultProps = {
  localizationDetails: null,
};

Localization.propTypes = {
  localizationDetails: PropTypes.object
};