import React, {Component} from 'react';
import {Breadcrumb, Button, Col, Form, Select} from "antd";
import Widget from "../../../components/Widget";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {onGetLocalizationDetails, onSaveLocalizationDetails} from "../../../appRedux/actions/GeneralSettings";
import InfoView from "../../../components/InfoView";

const {Option} = Select;

class Email extends Component {
  constructor(props) {
    super(props);
    if (this.props.localizationDetails === null) {
      this.state = {
        date_format: "",
        time_format: "",
        default_language: "",

      }
    } else {
      const {date_format, time_format, default_language} = this.props.localizationDetails;
      this.state = {
        date_format: date_format,
        time_format: time_format,
        default_language: default_language,
      }
    }
  }

  componentWillMount() {
    this.props.onGetLocalizationDetails();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {date_format, time_format, default_language, disable_language_selection} = nextProps.localizationDetails;
    if (JSON.stringify(nextProps.localizationDetails) !== JSON.stringify(this.props.localizationDetails)) {
      this.setState({
        date_format: date_format,
        time_format: time_format,
        default_language: default_language,
        disable_language_selection: disable_language_selection
      })
    }
  }

  onDateSelect = value => {
    this.setState({date_format: value})
  };
  onTimeSelect = value => {
    this.setState({time_format: value})
  };
  onLanguageSelect = value => {
    this.setState({default_language: value})
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
    const {date_format, time_format, default_language} = this.state;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h3>Email</h3>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/settings/general-settings">Settings</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary">
              <Link to="/settings/email">Email</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Form layout="vertical">
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label="Date Format">
                  {getFieldDecorator('city', {
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

Email = Form.create({})(Email);

const mapStateToProps = ({generalSettings}) => {
  const {localizationDetails} = generalSettings;
  return {localizationDetails};
};

export default connect(mapStateToProps, {
  onGetLocalizationDetails,
  onSaveLocalizationDetails
})(Email);

