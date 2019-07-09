import React, {Component} from "react"
import Widget from "../../../components/Widget";
import {Breadcrumb, Button, Divider, Form, Input, Radio, Select, Switch} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {onGetTicketStatus} from "../../../appRedux/actions/TicketStatuses";
import {onGetTicketSettings, onSaveTicketSettings} from "../../../appRedux/actions/GeneralSettings";
import InfoView from "../../../components/InfoView";

const {Option} = Select;

class TicketSettings extends Component {
  constructor(props) {
    super(props);
    if (this.props.ticketSettings === null) {
      this.state = {
        allow_customer_service: 0,
        staff_access_belong_department: 0,
        open_ticket_all_customers: 0,
        customer_own_tickets: 0,
        ticket_reply_order: "desc",
        default_status_reply: null,
        allowed_file_ext: ".jpg",
        max_upload_size: null,
        notify_raise_ticket: 0,
        notify_reply_ticket: 0,
        notify_status_ticket: 0,
        notify_priority_ticket: 0,
        notify_archive_ticket: 0
      }
    } else {
      const {
        allow_customer_service, staff_access_belong_department, open_ticket_all_customers, customer_own_tickets,
        ticket_reply_order, default_status_reply, allowed_file_ext, max_upload_size, notify_raise_ticket,
        notify_reply_ticket, notify_status_ticket, notify_priority_ticket, notify_archive_ticket
      } = this.props.ticketSettings;
      this.state = {
        allow_customer_service: parseInt(allow_customer_service),
        staff_access_belong_department: parseInt(staff_access_belong_department),
        open_ticket_all_customers: parseInt(open_ticket_all_customers),
        customer_own_tickets: parseInt(customer_own_tickets),
        ticket_reply_order: ticket_reply_order,
        default_status_reply: parseInt(default_status_reply),
        allowed_file_ext: allowed_file_ext,
        max_upload_size: parseInt(max_upload_size),
        notify_raise_ticket: parseInt(notify_raise_ticket),
        notify_reply_ticket: parseInt(notify_reply_ticket),
        notify_status_ticket: parseInt(notify_status_ticket),
        notify_priority_ticket: parseInt(notify_priority_ticket),
        notify_archive_ticket: parseInt(notify_archive_ticket)
      }
    }
  };

  componentDidMount() {
    this.props.onGetTicketStatus();
    this.props.onGetTicketSettings();
  };


  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.ticketSettings) {
      const {
        allow_customer_service, staff_access_belong_department, open_ticket_all_customers, customer_own_tickets,
        ticket_reply_order, default_status_reply, allowed_file_ext, max_upload_size, notify_raise_ticket,
        notify_reply_ticket, notify_status_ticket, notify_priority_ticket, notify_archive_ticket
      } = nextProps.ticketSettings;
      if (JSON.stringify(nextProps.ticketSettings) !== JSON.stringify(this.props.ticketSettings)) {
        this.setState({
          allow_customer_service: parseInt(allow_customer_service),
          staff_access_belong_department: parseInt(staff_access_belong_department),
          open_ticket_all_customers: parseInt(open_ticket_all_customers),
          customer_own_tickets: parseInt(customer_own_tickets),
          ticket_reply_order: ticket_reply_order,
          default_status_reply: parseInt(default_status_reply),
          allowed_file_ext: allowed_file_ext,
          max_upload_size: max_upload_size,
          notify_raise_ticket: parseInt(notify_raise_ticket),
          notify_reply_ticket: parseInt(notify_reply_ticket),
          notify_status_ticket: parseInt(notify_status_ticket),
          notify_priority_ticket: parseInt(notify_priority_ticket),
          notify_archive_ticket: parseInt(notify_archive_ticket)
        })
      }
    }
  };

  onAddButtonClick = () => {
    this.props.onSaveTicketSettings({...this.state})
  };


  render() {
    const {
      allow_customer_service, staff_access_belong_department, open_ticket_all_customers, customer_own_tickets,
      ticket_reply_order, default_status_reply, allowed_file_ext, max_upload_size, notify_raise_ticket,
      notify_reply_ticket, notify_status_ticket, notify_priority_ticket, notify_archive_ticket
    } = this.state;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-font-weight-bold">Ticket Settings</h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/settings/general-settings">Settings</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary">
              <Link to="/settings/ticket-settings">Ticket Settings</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Form layout="vertical" style={{width: "50%"}}>
            <Divider orientation="left" className="gx-mb-4">General Settings</Divider>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Allow customer to Select Service</p>
                <Switch checked={!!allow_customer_service}
                        onChange={(checked) => this.setState({allow_customer_service: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Staff can only access tickets belonging to staff department</p>
                <Switch checked={!!staff_access_belong_department}
                        onChange={(checked) => this.setState({staff_access_belong_department: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>All staff members to open ticket to all contacts</p>
                <Switch checked={!!open_ticket_all_customers}
                        onChange={(checked) => this.setState({open_ticket_all_customers: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>In customer area, only show tickets related to the logged in contact</p>
                <Switch checked={!!customer_own_tickets}
                        onChange={(checked) => this.setState({customer_own_tickets: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Ticket reply order</p>
                <Radio.Group value={ticket_reply_order}
                             onChange={(e) => this.setState({ticket_reply_order: e.target.value})}>
                  <Radio value="asc">Ascending</Radio>
                  <Radio value="desc">Descending</Radio>
                </Radio.Group>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Default status when a ticket is replied</p>
                <Select style={{width: 200}} value={default_status_reply}
                        onChange={(value) => this.setState({default_status_reply: value})}>
                  {this.props.statuses.map(status => {
                    return <Option key={status.id} value={status.id}>{status.name}</Option>
                  })}
                </Select>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Allowed file extensions</p>
                <Input type="text" style={{width: 300}} value={allowed_file_ext} onChange={(e) => {
                  this.setState({allowed_file_ext: e.target.value})
                }}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Maximum File upload size(MB)</p>
                <Input type="text" value={max_upload_size} style={{width: 100}} onChange={(e) => {
                  this.setState({max_upload_size: e.target.value})
                }}/>
              </div>
              <Divider/>
            </Form.Item>
            <h6 className="gx-mb-4">Notification Settings</h6>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>New Ticket Received</p>
                <Switch checked={!!notify_raise_ticket}
                        onChange={(checked) => this.setState({notify_raise_ticket: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Reply a Ticket</p>
                <Switch checked={!!notify_reply_ticket}
                        onChange={(checked) => this.setState({notify_reply_ticket: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Ticket status change</p>
                <Switch checked={!!notify_status_ticket}
                        onChange={(checked) => this.setState({notify_status_ticket: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>On priority change</p>
                <Switch checked={!!notify_priority_ticket}
                        onChange={(checked) => this.setState({notify_priority_ticket: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>On Archive</p>
                <Switch checked={!!notify_archive_ticket}
                        onChange={(checked) => this.setState({notify_archive_ticket: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Button type="primary" style={{width: 100}} onClick={this.onAddButtonClick}>
              Save
            </Button>
          </Form>
        </Widget>
        <InfoView/>
      </div>
    );
  }
}


const mapStateToProps = ({generalSettings, ticketStatuses}) => {
  const {ticketSettings} = generalSettings;
  const {statuses} = ticketStatuses;
  return {ticketSettings, statuses};
};

export default connect(mapStateToProps, {onGetTicketStatus, onGetTicketSettings, onSaveTicketSettings})(TicketSettings);