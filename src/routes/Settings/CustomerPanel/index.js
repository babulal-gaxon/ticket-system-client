import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Breadcrumb, Button, Divider, Form, Select, Switch} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
  onGetCountriesList,
  onGetCustomerPanelDetails,
  onSaveCustomerPanelDetails
} from "../../../appRedux/actions/GeneralSettings";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const {Option} = Select;

class CustomerPanelForm extends Component {
  constructor(props) {
    super(props);
    if (this.props.customerPanelDetails === null) {
      this.state = {
        theme: "",
        registration_enable: 0
      }
    } else {
      const {theme, registration_enable} = this.props.customerPanelDetails;
      this.state = {
        theme: theme,
        registration_enable: parseInt(registration_enable)
      }
    }
  }

  componentDidMount() {
    this.props.onGetCustomerPanelDetails();
    this.props.onGetCountriesList();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.customerPanelDetails) {
      const {theme, registration_enable} = nextProps.customerPanelDetails;
      if (JSON.stringify(nextProps.customerPanelDetails) !== JSON.stringify(this.props.customerPanelDetails)) {
        this.setState({
          theme: theme,
          registration_enable: parseInt(registration_enable)
        })
      }
    }
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.onSaveCustomerPanelDetails({...this.state}, this);
      }
    });
  };

  onSelectTheme = value => {
    this.setState({theme: value})
  };

  render() {
    console.log("hello")
    const {messages} = this.props.intl;
    const {getFieldDecorator} = this.props.form;
    const {theme, registration_enable} = this.state;
    console.log("registration_enable", registration_enable, !!registration_enable)
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading"><IntlMessages id="settings.customerPanel.title"/></h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/settings/general-settings"><IntlMessages id="sidebar.dashboard.settings"/></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/settings/customer-panel" className="gx-text-primary"><IntlMessages
                id="settings.customerPanel.name"/></Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Form layout="vertical" style={{width: "50%"}}>
            <Form.Item label={<IntlMessages id="settings.customerPanel.theme"/>}>
              {getFieldDecorator('theme', {
                initialValue: theme,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: messages["validation.customerPanel.theme"]}],
              })(<Select onChange={this.onSelectTheme} autoFocus>
                <Option value="dark">DARK</Option>
                <Option value="semi_dark">SEMI DARK</Option>
                <Option value="light">LIGHT</Option>
              </Select>)}
            </Form.Item>
            <Divider orientation="left" className="gx-mb-4"><IntlMessages
              id="settings.customerPanel.permissions"/></Divider>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.customerPanel.customerRegister"/></p>
                <Switch checked={!!registration_enable}
                        onChange={(checked) => this.setState({registration_enable: Number(checked)})}/>
              </div>
            </Form.Item>
          </Form>
          <hr/>
          <div className="gx-d-flex">
            <Button type="primary" style={{width: "150px"}} onClick={this.onValidationCheck}><IntlMessages
              id="common.save"/></Button>
          </div>
        </Widget>
      </div>
    );
  }
}

const CustomerPanel = Form.create({})(CustomerPanelForm);

const mapStateToProps = ({generalSettings}) => {
  const {customerPanelDetails, countriesList} = generalSettings;
  return {customerPanelDetails, countriesList};
};

export default connect(mapStateToProps, {
  onGetCustomerPanelDetails,
  onSaveCustomerPanelDetails,
  onGetCountriesList
})(injectIntl(CustomerPanel));

CustomerPanel.defaultProps = {
  countriesList: [],
  customerPanelDetails: null
};

CustomerPanel.propTypes = {
  countriesList: PropTypes.array,
  customerPanelDetails: PropTypes.object
};
