import React, {Component} from 'react';
import {Button, Form, Radio, Select} from "antd/lib/index";
import {connect} from "react-redux";
import {onGetLocalizationDetails, onSaveLocalizationDetails} from "../../../appRedux/actions/GeneralSettings";
import PropTypes from "prop-types";

const {Option} = Select;

class FourthStep extends Component {
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
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.onSaveLocalizationDetails({...this.state});
        this.props.onMoveToNextStep();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {date_format, time_format, default_language, allow_language_selection} = this.state;
    return (
      <div className="gx-flex-column gx-mt-3">
        <Form layout="vertical" style={{width: "50%"}}>
          <Form.Item label="Date Format">
            {getFieldDecorator('city', {
              initialValue: date_format,
              validateTrigger: 'onBlur',
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
          <Form.Item label="Time Format">
            {getFieldDecorator('time_format', {
              initialValue: time_format,
              validateTrigger: 'onBlur',
              rules: [{required: true, message: 'Please Enter State Name!'}],
            })(<Select style={{width: "100%"}} onChange={this.onTimeSelect}>
              <Option value="24 Hours">24 Hours (20:30)</Option>
              <Option value="12 Hours">12 Hours (08:30)</Option>
            </Select>)}
          </Form.Item>
          <Form.Item label="Default Language">
            {getFieldDecorator('default_language', {
              initialValue: default_language,
              validateTrigger: 'onBlur',
              rules: [{required: true, message: 'Please Enter State Name!'}],
            })(<Select style={{width: "100%"}} onChange={this.onLanguageSelect}>
              <Option value="en">English</Option>
              <Option value="ar">Arabic</Option>
              <Option value="es">Spanish</Option>
              <Option value="fr">French</Option>
              <Option value="it">Italian</Option>
            </Select>)}
          </Form.Item>
          <Form.Item label="Language Selection for Customers">
            {getFieldDecorator('disable_language_selection', {
              initialValue: allow_language_selection,
              validateTrigger: 'onBlur',
              rules: [{required: true, message: 'Please Enter State Name!'}],
            })(<Radio.Group onChange={(event) => this.onChangePermission(event)}>
              <Radio value="1">Allowed</Radio>
              <Radio value="0">Not-Allowed</Radio>
            </Radio.Group>)}
          </Form.Item>
          <div className="gx-d-flex">
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}>Previous</Button>
            <Button type="primary" onClick={this.onValidationCheck}>Next</Button>
            <Button type="link" onClick={() => this.props.onMoveToNextStep()}>Skip</Button>
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
})(FourthStep);

FourthStep.defaultProps = {
  localizationDetails: []
};

FourthStep.propTypes = {
  localizationDetails: PropTypes.array,
};

