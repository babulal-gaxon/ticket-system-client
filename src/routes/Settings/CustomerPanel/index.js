import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Breadcrumb, Button, Divider, Form, Input, Select, Switch} from "antd";
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
        country: "",
        registration_enable: 0,
        register_verification: 0,
        allow_primary_contact_view: 0,
        delete_own_files: 0
      }
    } else {
      const {theme, country, registration_enable, register_verification, allow_primary_contact_view, delete_own_files} = this.props.customerPanelDetails;
      this.state = {
        theme: theme,
        country: parseInt(country),
        registration_enable: parseInt(registration_enable),
        register_verification: parseInt(register_verification),
        allow_primary_contact_view: parseInt(allow_primary_contact_view),
        delete_own_files: parseInt(delete_own_files)
      }
    }
  }

  componentDidMount() {
    this.props.onGetCustomerPanelDetails();
    this.props.onGetCountriesList();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.customerPanelDetails) {
      const {theme, country, registration_enable, register_verification, allow_primary_contact_view, delete_own_files} = nextProps.customerPanelDetails;
      if (JSON.stringify(nextProps.customerPanelDetails) !== JSON.stringify(this.props.customerPanelDetails)) {
        this.setState({
          theme: theme,
          country: parseInt(country),
          registration_enable: parseInt(registration_enable),
          register_verification: parseInt(register_verification),
          allow_primary_contact_view: parseInt(allow_primary_contact_view),
          delete_own_files: parseInt(delete_own_files)
        })
      }
    }
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.onSaveCustomerPanelDetails({...this.state});
      }
    });
  };

  onCountrySelect = value => {
    this.setState({country: value})
  };

  render() {
    const {messages} = this.props.intl;
    const {getFieldDecorator} = this.props.form;
    const {theme, country, registration_enable, register_verification, allow_primary_contact_view, delete_own_files} = this.state;
    console.log("countriesList", this.props.countriesList);
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading"><IntlMessages id="settings.customerPanel.title"/></h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/settings/general-settings"><IntlMessages id="sidebar.dashboard.settings"/></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/settings/customer-panel" className="gx-text-primary"><IntlMessages id="settings.customerPanel.name"/></Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Form layout="vertical" style={{width: "50%"}}>
            <Form.Item label={<IntlMessages id="settings.customerPanel.theme"/>}>
              {getFieldDecorator('theme', {
                initialValue: theme,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: messages["validation.customerPanel.theme"]}],
              })(<Input type="text" autoFocus onChange={(e) => this.setState({theme: e.target.value})}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="settings.customerPanel.country"/>}>
              {getFieldDecorator('country', {
                initialValue: country,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: messages["validation.message.country"]}],
              })(<Select showSearchstyle={{width: "100%"}} onChange={this.onCountrySelect}
                         showSearch
                         filterOption={(input, option) =>
                           option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                         }>
                {this.props.countriesList.map(country => {
                  return <Option value={country.id} key={country.id}>{country.name}</Option>
                })}
              </Select>)}
            </Form.Item>
            <Divider orientation="left" className="gx-mb-4"><IntlMessages id="settings.customerPanel.permissions"/></Divider>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.customerPanel.customerRegister"/></p>
                <Switch checked={!!registration_enable}
                        onChange={(checked) => this.setState({registration_enable: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.customerPanel.registration"/></p>
                <Switch checked={!!register_verification}
                        onChange={(checked) => this.setState({register_verification: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.customerPanel.billing"/></p>
                <Switch checked={!!allow_primary_contact_view}
                        onChange={(checked) => this.setState({allow_primary_contact_view: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.customerPanel.deleteFiles"/></p>
                <Switch checked={!!delete_own_files}
                        onChange={(checked) => this.setState({delete_own_files: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
          </Form>
          <hr/>
          <div className="gx-d-flex">
            <Button type="primary" style={{width: "150px"}} onClick={this.onValidationCheck}><IntlMessages id="common.save"/></Button>
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
