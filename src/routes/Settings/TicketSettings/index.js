import React, {Component} from "react"
import Widget from "../../../components/Widget";
import {Breadcrumb, Button, Divider, Form, Input, Radio, Select, Switch} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {onGetTicketStatus} from "../../../appRedux/actions/TicketStatuses";
import {onGetTicketSettings, onSaveTicketSettings} from "../../../appRedux/actions/GeneralSettings";
import PropTypes from "prop-types";
import {onGetFilterOptions} from "../../../appRedux/actions/TicketList";
import IntlMessages from "../../../util/IntlMessages";

const {Option} = Select;

class TicketSettings extends Component {
  constructor(props) {
    super(props);
    if (this.props.ticketSettings === null) {
      this.state = {
        enable_service_selection: 0,
        enable_product_selection: 0,
        enable_department_selection: 0,
        ticket_reply_order: "",
        default_status_reply: 0,
        allowed_file_ext: "",
        max_upload_size: null,
        notify_raise: 0,
        notify_reply: 0,
        notify_status_change: 0,
        notify_priority_change: 0,
        notify_on_archive: 0,
        ticket_status_close: 0
      }
    } else {
      const {
        enable_service_selection, enable_department_selection, enable_product_selection,
        ticket_reply_order, default_status_reply, allowed_file_ext, max_upload_size, notify_raise,
        notify_reply, notify_status_change, notify_priority_change, notify_on_archive, ticket_status_close
      } = this.props.ticketSettings;
      this.state = {
        enable_service_selection: parseInt(enable_service_selection),
        enable_department_selection: parseInt(enable_department_selection),
        enable_product_selection: parseInt(enable_product_selection),
        ticket_reply_order: ticket_reply_order,
        default_status_reply: parseInt(default_status_reply),
        allowed_file_ext: allowed_file_ext,
        max_upload_size: parseInt(max_upload_size),
        notify_raise: parseInt(notify_raise),
        notify_reply: parseInt(notify_reply),
        notify_status_change: parseInt(notify_status_change),
        notify_priority_change: parseInt(notify_priority_change),
        notify_on_archive: parseInt(notify_on_archive),
        ticket_status_close: parseInt(ticket_status_close)
      }
    }
  };

  componentDidMount() {
    this.props.onGetFilterOptions();
    this.props.onGetTicketSettings();
  };


  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.ticketSettings) {
      const {
        enable_service_selection, enable_department_selection, enable_product_selection,
        ticket_reply_order, default_status_reply, allowed_file_ext, max_upload_size, notify_raise,
        notify_reply, notify_status_change, notify_priority_change, notify_on_archive, ticket_status_close
      } = nextProps.ticketSettings;
      if (JSON.stringify(nextProps.ticketSettings) !== JSON.stringify(this.props.ticketSettings)) {
        this.setState({
          enable_service_selection: parseInt(enable_service_selection),
          enable_department_selection: parseInt(enable_department_selection),
          enable_product_selection: parseInt(enable_product_selection),
          ticket_reply_order: ticket_reply_order,
          default_status_reply: parseInt(default_status_reply),
          allowed_file_ext: allowed_file_ext,
          max_upload_size: max_upload_size,
          notify_raise: parseInt(notify_raise),
          notify_reply: parseInt(notify_reply),
          notify_status_change: parseInt(notify_status_change),
          notify_priority_change: parseInt(notify_priority_change),
          notify_on_archive: parseInt(notify_on_archive),
          ticket_status_close: parseInt(ticket_status_close)
        })
      }
    }
  };

  onAddButtonClick = () => {
    this.props.onSaveTicketSettings({...this.state})
  };

  render() {
    const {
      enable_service_selection, enable_department_selection, enable_product_selection,
      ticket_reply_order, default_status_reply, allowed_file_ext, max_upload_size, notify_raise,
      notify_reply, notify_status_change, notify_priority_change, notify_on_archive, ticket_status_close
    } = this.state;

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading"><IntlMessages id="sidebar.dashboard.ticket.settings"/></h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/settings/general-settings"><IntlMessages id="sidebar.dashboard.settings"/></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/settings/ticket-settings" className="gx-text-primary"><IntlMessages
                id="sidebar.dashboard.ticket.settings"/></Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Form layout="vertical" style={{width: "50%"}}>
            <Divider orientation="left" className="gx-mb-4"><IntlMessages
              id="sidebar.dashboard.general.setting"/></Divider>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.ticket.serviceSelection"/></p>
                <Switch checked={!!enable_service_selection}
                        onChange={(checked) => this.setState({enable_service_selection: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.ticket.departmentSelection"/></p>
                <Switch checked={!!enable_department_selection}
                        onChange={(checked) => this.setState({enable_department_selection: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.ticket.productSelection"/></p>
                <Switch checked={!!enable_product_selection}
                        onChange={(checked) => this.setState({enable_product_selection: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.ticket.replyOrder"/></p>
                <Radio.Group value={ticket_reply_order}
                             onChange={(e) => this.setState({ticket_reply_order: e.target.value})}>
                  <Radio value="asc"><IntlMessages id="common.ascending"/></Radio>
                  <Radio value="desc"><IntlMessages id="common.descending"/></Radio>
                </Radio.Group>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.ticket.replyStatus"/></p>
                <Select style={{width: 200}} value={default_status_reply}
                        onChange={(value) => this.setState({default_status_reply: value})}>
                  {this.props.filterData.status.map(status => {
                    return <Option key={status.id} value={status.id}>{status.name}</Option>
                  })}
                </Select>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.ticket.closeStatus"/></p>
                <Select style={{width: 200}} value={ticket_status_close}
                        onChange={(value) => this.setState({ticket_status_close: value})}>
                  {this.props.filterData.status.map(status => {
                    return <Option key={status.id} value={status.id}>{status.name}</Option>
                  })}
                </Select>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.ticket.fileExtensions"/></p>
                <Input type="text" style={{width: 300}} value={allowed_file_ext} onChange={(e) => {
                  this.setState({allowed_file_ext: e.target.value})
                }}/>
              </div>
              <div><IntlMessages id="settings.ticket.fileFormat"/></div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.ticket.fileSize"/></p>
                <Input type="text" value={max_upload_size} style={{width: 100}} onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === '' || re.test(e.target.value)) {
                    this.setState({max_upload_size: e.target.value})
                  }
                }}/>
              </div>
              <Divider/>
            </Form.Item>
            <h6 className="gx-mb-4"><IntlMessages id="settings.ticket.notifications"/></h6>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.ticket.ticketReceived"/></p>
                <Switch checked={!!notify_raise}
                        onChange={(checked) => this.setState({notify_raise: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.ticket.ticketReply"/></p>
                <Switch checked={!!notify_reply}
                        onChange={(checked) => this.setState({notify_reply: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.ticket.ticketStatus"/></p>
                <Switch checked={!!notify_status_change}
                        onChange={(checked) => this.setState({notify_status_change: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.ticket.ticketPriority"/></p>
                <Switch checked={!!notify_priority_change}
                        onChange={(checked) => this.setState({notify_priority_change: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p><IntlMessages id="settings.ticket.onArchive"/></p>
                <Switch checked={!!notify_on_archive}
                        onChange={(checked) => this.setState({notify_on_archive: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Button type="primary" style={{width: 100}} onClick={this.onAddButtonClick}>
              <IntlMessages id="common.save"/>
            </Button>
          </Form>
        </Widget>
      </div>
    );
  }
}


const mapStateToProps = ({generalSettings, ticketList}) => {
  const {ticketSettings} = generalSettings;
  const {filterData} = ticketList;
  return {ticketSettings, filterData};
};

export default connect(mapStateToProps, {
  onGetTicketStatus,
  onGetTicketSettings,
  onSaveTicketSettings,
  onGetFilterOptions
})(TicketSettings);

TicketSettings.defaultProps = {
  ticketSettings: null,
  filterData: {
    status: []
  }
};

TicketSettings.propTypes = {
  ticketSettings: PropTypes.object,
  filterData: PropTypes.object
};
