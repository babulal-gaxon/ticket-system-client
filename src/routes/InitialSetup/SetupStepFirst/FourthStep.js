import React, {Component} from 'react';
import {Button, Form, Radio, Select} from "antd/lib/index";
import {connect} from "react-redux";
import {onGetLocalizationDetails, onSaveLocalizationDetails} from "../../../appRedux/actions/GeneralSettings";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const {Option} = Select;

class FourthStep extends Component {
  constructor(props) {
    super(props);
    if (props.localizationDetails === null) {
      this.state = {
        date_format: "",
        time_format: "",
        default_language: "",
        allow_language_selection: "0"
      }
    } else {
      const {date_format, time_format, default_language, allow_language_selection} = props.localizationDetails;
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
    if (this.props.localizationDetails === null && nextProps.localizationDetails) {
      const {date_format, time_format, default_language, allow_language_selection} = nextProps.localizationDetails;
      if (JSON.stringify(nextProps.localizationDetails) !== JSON.stringify(this.props.localizationDetails)) {
        this.setState({
          date_format: date_format,
          time_format: time_format,
          default_language: default_language,
          allow_language_selection: allow_language_selection
        })
      }
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
    console.log("i am here")
    this.props.form.validateFields(err => {
      if (!err) {
        console.log("err", err)
        this.props.onSaveLocalizationDetails({...this.state}, this);
        this.props.onMoveToNextStep();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {date_format, time_format, default_language, allow_language_selection} = this.state;
    const {messages} = this.props.intl;

    return (
      <div className="gx-flex-column gx-mt-3">
        <Form layout="vertical" style={{width: "50%"}}>
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
          <Form.Item label={<IntlMessages id="settings.localization.timeFormat"/>}>
            {getFieldDecorator('time_format', {
              initialValue: time_format,
              validateTrigger: 'onBlur',
              rules: [{required: true, message: messages["validation.localization.timeFormat"]}],
            })(<Select style={{width: "100%"}} onChange={this.onTimeSelect}>
              <Option value="24">24 <IntlMessages id="common.hours"/> (20:30)</Option>
              <Option value="12">12 <IntlMessages id="common.hours"/> (08:30)</Option>
            </Select>)}
          </Form.Item>
          <Form.Item label={<IntlMessages id="settings.localization.language"/>}>
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
          <Form.Item label={<IntlMessages id="settings.localization.languageSelection"/>}>
            {getFieldDecorator('disable_language_selection', {
              initialValue: allow_language_selection,
              validateTrigger: 'onBlur',
              rules: [{required: true, message: 'Please Enter State Name!'}],
            })(<Radio.Group onChange={(event) => this.onChangePermission(event)}>
              <Radio value="1"><IntlMessages id="common.allowed"/></Radio>
              <Radio value="0"><IntlMessages id="common.notAllowed"/></Radio>
            </Radio.Group>)}
          </Form.Item>
          <div className="gx-d-flex">
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}><IntlMessages
              id="common.previous"/></Button>
            <Button type="primary" onClick={this.onValidationCheck}><IntlMessages id="common.next"/></Button>
          </div>
        </Form>
      </div>
    );
  }
}

FourthStep = Form.create({})(FourthStep);

const mapStateToProps = ({generalSettings}) => {
  const {localizationDetails} = generalSettings;
  return {localizationDetails};
};

export default connect(mapStateToProps, {
  onGetLocalizationDetails,
  onSaveLocalizationDetails
})(injectIntl(FourthStep));

FourthStep.defaultProps = {
  localizationDetails: {}
};

FourthStep.propTypes = {
  localizationDetails: PropTypes.object,
};

