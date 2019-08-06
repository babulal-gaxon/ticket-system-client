import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Breadcrumb, Button, Col, Form, Radio, Select} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {onGetLocalizationDetails, onSaveLocalizationDetails} from "../../../appRedux/actions/GeneralSettings";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

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
        this.props.onSaveLocalizationDetails({...this.state}, this);
      }
    });
  };

  render() {
    const {messages} = this.props.intl;
    const {getFieldDecorator} = this.props.form;
    const {date_format, time_format, default_language, allow_language_selection} = this.state;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading"><IntlMessages id="settings.localization.heading"/></h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/settings/general-settings"><IntlMessages id="sidebar.dashboard.settings"/></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/settings/localization" className="gx-text-primary"><IntlMessages
                id="settings.localization.title"/></Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Form layout="vertical">
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label="Date Format">
                  {getFieldDecorator('city', {
                    initialValue: date_format,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: 'Please Enter Date format!'}],
                  })(<Select style={{width: "100%"}} onChange={this.onDateSelect}>
                    <Option value="MM/DD/YY">MM/DD/YY</Option>
                    <Option value="MM/YY/DD">MM/YY/DD</Option>
                    <Option value="DD/MM/YY">DD/MM/YY</Option>
                    <Option value="DD/YY/MM">DD/YY/MM</Option>
                    <Option value="YY/DD/MM">YY/DD/MM</Option>
                    <Option value="YY/MM/DD">YY/MM/DD</Option>
                  </Select>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label={<IntlMessages id="settings.localization.timeFormat"/>}>
                  {getFieldDecorator('time_format', {
                    initialValue: time_format,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.localization.timeFormat"]}],
                  })(<Select style={{width: "100%"}} onChange={this.onTimeSelect}>
                    <Option value="24 Hours">24 <IntlMessages id="common.hours"/> (20:30)</Option>
                    <Option value="12 Hours">12 <IntlMessages id="common.hours"/> (08:30)</Option>
                  </Select>)}
                </Form.Item>
              </Col>
            </div>
            <Form.Item label={<IntlMessages id="settings.localization.language"/>} style={{width: "49%"}}>
              {getFieldDecorator('default_language', {
                initialValue: default_language,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: messages["validation.localization.language"]}],
              })(<Select style={{width: "100%"}} onChange={this.onLanguageSelect}>
                <Option value="en"><IntlMessages id="common.english"/></Option>
                <Option value="es"><IntlMessages id="common.spanish"/></Option>
                <Option value="fr"><IntlMessages id="common.french"/></Option>
                <Option value="it"><IntlMessages id="common.italian"/></Option>
              </Select>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="settings.localization.languageSelection"/>} style={{width: "49%"}}>
              {getFieldDecorator('disable_language_selection', {
                initialValue: allow_language_selection,
              })(<Radio.Group onChange={(event) => this.onChangePermission(event)}>
                <Radio value="1"><IntlMessages id="common.allowed"/></Radio>
                <Radio value="0"><IntlMessages id="common.notAllowed"/></Radio>
              </Radio.Group>)}
            </Form.Item>
            <hr/>
            <div className="gx-d-flex">
              <Button type="primary" style={{width: "150px"}} onClick={this.onValidationCheck}><IntlMessages
                id="common.save"/></Button>
            </div>
          </Form>
        </Widget>
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
})(injectIntl(Localization));

Localization.defaultProps = {
  localizationDetails: null,
};

Localization.propTypes = {
  localizationDetails: PropTypes.object
};
