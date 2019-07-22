import React, {Component} from 'react';
import {Button, Divider, Form, Input, Radio, Select, Switch} from "antd/lib/index";
import InfoView from "../../../components/InfoView";
import {connect} from "react-redux";
import {onGetTicketStatus} from "../../../appRedux/actions/TicketStatuses";
import {onGetTicketSettings, onSaveTicketSettings} from "../../../appRedux/actions/GeneralSettings";
import {onGetFilterOptions} from "../../../appRedux/actions/TicketList";
import PropTypes from "prop-types";

const {Option} = Select;

class SetupStepSecond extends Component {
  constructor(props) {
    super(props);
    if (this.props.ticketSettings === null) {
      this.state = {
        enable_service_selection: 0,
        staff_access_own_department: 0,
        ticket_reply_order: "",
        default_status_reply: null,
        allowed_file_ext: "",
        max_upload_size: null,
        notify_raise: 0,
        notify_reply: 0,
        notify_status_change: 0,
        notify_priority_change: 0,
        notify_on_archive: 0,
        ticket_status_close: null
      }
    } else {
      const {
        enable_service_selection, staff_access_own_department,
        ticket_reply_order, default_status_reply, allowed_file_ext, max_upload_size, notify_raise,
        notify_reply, notify_status_change, notify_priority_change, notify_on_archive, ticket_status_close
      } = this.props.ticketSettings;
      this.state = {
        enable_service_selection: parseInt(enable_service_selection),
        staff_access_own_department: parseInt(staff_access_own_department),
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
        enable_service_selection, staff_access_own_department,
        ticket_reply_order, default_status_reply, allowed_file_ext, max_upload_size, notify_raise,
        notify_reply, notify_status_change, notify_priority_change, notify_on_archive, ticket_status_close
      } = nextProps.ticketSettings;
      if (JSON.stringify(nextProps.ticketSettings) !== JSON.stringify(this.props.ticketSettings)) {
        this.setState({
          enable_service_selection: parseInt(enable_service_selection),
          staff_access_own_department: parseInt(staff_access_own_department),
          ticket_reply_order: ticket_reply_order,
          default_status_reply: default_status_reply,
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
    this.props.onSaveTicketSettings({...this.state}, this.props.history);
  };

  render() {
    const {
      enable_service_selection, staff_access_own_department,
      ticket_reply_order, default_status_reply, allowed_file_ext, max_upload_size, notify_raise,
      notify_reply, notify_status_change, notify_priority_change, notify_on_archive, ticket_status_close
    } = this.state;
    return (
      <div className="gx-main-layout-content gx-mt-5">
        <Form layout="vertical" style={{width: "60%"}}>
          <Divider orientation="left" className="gx-mb-4">General Settings</Divider>
          <Form.Item>
            <div className="gx-d-flex gx-justify-content-between">
              <p>Enable service selection while creating a ticket</p>
              <Switch checked={!!enable_service_selection}
                      onChange={(checked) => this.setState({enable_service_selection: Number(checked)})}/>
            </div>
            <Divider/>
          </Form.Item>
          <Form.Item>
            <div className="gx-d-flex gx-justify-content-between">
              <p>Enable department selection while creating a ticket</p>
              <Switch checked={!!staff_access_own_department}
                      onChange={(checked) => this.setState({staff_access_own_department: Number(checked)})}/>
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
              <Select style={{width: 200}} defaultValue={default_status_reply}
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
              <p>Choose the status to consider a ticket closed</p>
              <Select style={{width: 200}} defaultValue={ticket_status_close}
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
              <p>Allowed file extensions</p>
              <Input type="text" style={{width: 300}} value={allowed_file_ext} onChange={(e) => {
                this.setState({allowed_file_ext: e.target.value})
              }}/>
            </div>
            <div>"Enter the formats separated by comma, example - .jpg, .png"</div>
            <Divider/>
          </Form.Item>
          <Form.Item>
            <div className="gx-d-flex gx-justify-content-between">
              <p>Maximum File upload size(MB)</p>
              <Input type="text" value={max_upload_size} style={{width: 100}} onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                  this.setState({max_upload_size: e.target.value})
                }
              }}/>
            </div>
            <Divider/>
          </Form.Item>
          <h6 className="gx-mb-4">Notification Settings</h6>
          <Form.Item>
            <div className="gx-d-flex gx-justify-content-between">
              <p>New Ticket Received</p>
              <Switch checked={!!notify_raise}
                      onChange={(checked) => this.setState({notify_raise: Number(checked)})}/>
            </div>
            <Divider/>
          </Form.Item>
          <Form.Item>
            <div className="gx-d-flex gx-justify-content-between">
              <p>Reply a Ticket</p>
              <Switch checked={!!notify_reply}
                      onChange={(checked) => this.setState({notify_reply: Number(checked)})}/>
            </div>
            <Divider/>
          </Form.Item>
          <Form.Item>
            <div className="gx-d-flex gx-justify-content-between">
              <p>Ticket status change</p>
              <Switch checked={!!notify_status_change}
                      onChange={(checked) => this.setState({notify_status_change: Number(checked)})}/>
            </div>
            <Divider/>
          </Form.Item>
          <Form.Item>
            <div className="gx-d-flex gx-justify-content-between">
              <p>On priority change</p>
              <Switch checked={!!notify_priority_change}
                      onChange={(checked) => this.setState({notify_priority_change: Number(checked)})}/>
            </div>
            <Divider/>
          </Form.Item>
          <Form.Item>
            <div className="gx-d-flex gx-justify-content-between">
              <p>On Archive</p>
              <Switch checked={!!notify_on_archive}
                      onChange={(checked) => this.setState({notify_on_archive: Number(checked)})}/>
            </div>
            <Divider/>
          </Form.Item>
          <Button type="primary" style={{width: 100}} onClick={this.onAddButtonClick}>
            Save
          </Button>
        </Form>
        <InfoView/>
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
})(SetupStepSecond);

SetupStepSecond.defaultProps = {
  ticketSettings: {},
  filterData: {
    status: []
  }
};

SetupStepSecond.propTypes = {
  responses: PropTypes.object,
  filterData: PropTypes.object
};





