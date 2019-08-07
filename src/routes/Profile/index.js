import React, {Component} from "react"
import {Button, Col, Form, Input, Row} from "antd/lib/index";
import PropTypes from "prop-types";
import Widget from "../../components/Widget";
import {connect} from "react-redux";
import {onAddProfileImage} from "../../appRedux/actions/Auth";
import {Divider, Select} from "antd";
import ImageUpload from "./ImageUpload";
import {getUserProfile, updateUserProfile} from "../../appRedux/actions";
import InfoView from "../../components/InfoView";
import {injectIntl} from "react-intl";
import IntlMessages from "../../util/IntlMessages";

const {Option} = Select;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      hourly_rate: "",
      departments_ids: [],
      profile_pic: null,
      designation: "",
      avatar: null
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const authUser = nextProps.authUser;
    const {id, first_name, last_name, email, mobile, hourly_rate, avatar, designation} = authUser;
    const department_ids = authUser.departments ? authUser.departments.map(department => {
      return department.id
    }) : [];
    this.setState({
      id: id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      mobile: mobile,
      hourly_rate: hourly_rate ? parseInt(hourly_rate) : "",
      departments_ids: department_ids,
      profile_pic: avatar ? avatar.id : null,
      designation: designation,
      avatar: avatar
    });
  }

  componentDidMount() {
    this.props.getUserProfile();
    // this.props.onGetDepartments();
  }

  goPreviousScreen = () => {
    this.props.history.goBack();
  };

  onSaveProfile = () => {
    this.props.updateUserProfile({...this.state}, this);
  };

  updateProfilePic = (profile_pic) => {
    this.setState({profile_pic})
  };

  onDepartmentSelectOption = () => {
    const deptOptions = [];
    this.props.dept.map(department => {
      return deptOptions.push(<Option value={department.id} key={department.id}>{department.name}</Option>);
    });
    return deptOptions;
  };

  onDepartmentSelect = (id) => {
    this.setState({departments_ids: this.state.departments_ids.concat(id)});
  };

  onDepartmentRemove = (value) => {
    const updatedDepartments = this.state.departments_ids.filter(department => department !== value);
    this.setState({departments_ids: updatedDepartments})
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onSaveProfile();
      }
    });
  };

  render() {
    const {messages} = this.props.intl;
    const {getFieldDecorator} = this.props.form;
    const {mobile, hourly_rate, departments_ids, first_name, last_name, email, designation, avatar} = this.state;
    const deptOptions = this.onDepartmentSelectOption();
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4
            className="ggx-widget-heading"><IntlMessages id="profile.title"/></h4>
          <hr/>
          <Row>
            <Col xl={18} lg={12} md={12} sm={12} xs={24}>
              <Form layout="vertical" style={{width: "60%"}}>
                <Form.Item label={<IntlMessages id="common.firstName"/>}>
                  {getFieldDecorator('first_name', {
                    initialValue: first_name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.message.firstName"]}],
                  })(<Input type="text" autoFocus onChange={(e) => {
                    this.setState({first_name: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.lastName"/>}>
                  {getFieldDecorator('last_name', {
                    initialValue: last_name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.message.lastName"]}],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({last_name: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.emailAddress"/>}>
                  {getFieldDecorator('email', {
                    initialValue: email,
                    validate: [{
                      trigger: 'onBlur',
                      rules: [
                        {
                          required: true,
                          message: messages["validation.message.email"]
                        },
                      ],
                    }, {
                      trigger: 'onChange',
                      rules: [
                        {
                          type: 'email',
                          message: messages["validation.message.emailFormat"]
                        },
                      ],
                    }],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({email: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.phoneNo."/>}>
                  {getFieldDecorator('mobile', {
                    initialValue: mobile,
                    validateTrigger: 'onBlur',
                    rules: [{
                      pattern: /^[0-9\b]+$/,
                      message: messages["validation.message.numericalValues"]
                    }],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({phone: e.target.value})
                  }}/>)}
                </Form.Item>

                <Form.Item label={<IntlMessages id="common.hourlyRate"/>}>
                  {getFieldDecorator('hourly_rate', {
                    initialValue: hourly_rate,
                    validateTrigger: 'onBlur',
                    rules: [{
                      pattern: /^[0-9\b]+$/,
                      message: messages["validation.message.numericalValues"]
                    }]
                  })(<Input type="text" addonAfter={<div>$</div>} onChange={(e) => {
                    this.setState({hourly_rate: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.designation"/>}>
                  <Input type="text" value={designation} onChange={(e) => {
                    this.setState({designation: e.target.value})
                  }}/>
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.departmentHeading"/>}>
                  <Select
                    mode="multiple"
                    style={{width: '100%'}}
                    placeholder={messages["common.department"]}
                    value={departments_ids}
                    onSelect={this.onDepartmentSelect}
                    onDeselect={this.onDepartmentRemove}>
                    {deptOptions}
                  </Select>
                </Form.Item>
              </Form>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <ImageUpload onAddProfileImage={this.props.onAddProfileImage}
                           context={this} imageAvatar={avatar}/>
            </Col>
          </Row>
          <Divider/>
          <div className="gx-d-flex gx-justify-content-between">
            <span>
                <Button type="primary" onClick={this.onValidationCheck} style={{width: 150}}>
                   {<IntlMessages id="common.save"/>}
                </Button>
                <Button onClick={this.goPreviousScreen} style={{width: 150}}>
                   {<IntlMessages id="common.cancel"/>}
                </Button>
            </span>
          </div>
        </Widget>
        <InfoView/>
      </div>
    )
  }
}

Profile = Form.create({})(Profile);

const mapStateToProps = ({auth}) => {
  const {authUser} = auth;
  return {authUser};
};

export default connect(mapStateToProps, {
  updateUserProfile,
  getUserProfile,
  onAddProfileImage,
})(injectIntl(Profile));

Profile.defaultProps = {
  dept: [],
  authUser: null,
  roles: []
};

Profile.propTypes = {
  dept: PropTypes.array,
  authUser: PropTypes.object,
  roles: PropTypes.array,
  updateUserProfile: PropTypes.func
};
