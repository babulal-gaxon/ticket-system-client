import React, {Component} from "react"
import {Breadcrumb, Button, Col, Dropdown, Input, Menu, Row, Select} from "antd";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {Link} from "react-router-dom";
import moment from "moment";

const Option = Select.Option;
const {TextArea} = Input;

class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      message: '',
      conversation: [],
      selectedPriority: null,
      selectedStatus: null
    }
  };

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitComment();
    }
  };

  // submitComment() {
  //   if (this.state.message !== '') {
  //     const updatedConversation = this.state.conversation.concat({
  //       'name': this.props.user.name,
  //       'thumb': this.props.user.avatar,
  //       'message': this.state.message,
  //       // 'sentAt': Moment().format('ddd DD, YYYY, hh:mm:ss A'),
  //     });
  //     this.setState({
  //       conversation: updatedConversation,
  //       message: '',
  //     });
  //   }
  // }

  onPriorityChange = value => {
    this.setState({selectedPriority: value})
  };

  onStatusChange = value => {
    this.setState({selectedStatus: value})
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">
          Edit
        </Menu.Item>
        <Menu.Item key="2" onClick={() => {
        }}>
          Delete
        </Menu.Item>
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <i className="icon icon-ellipse-h"/>
      </Button>
    </Dropdown>
  };

  render() {

    console.log("current priorities", this.props.priorities);
    const {currentTicket, priorities, statuses} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h3>Tickets</h3>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/manage-tickets/all-tickets">Manage Tickets</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Tickets</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col xl={18} lg={12} md={12} sm={12} xs={24}>
              <div className="gx-d-flex">
                <Select defaultValue={currentTicket.priority_id} onChange={this.onPriorityChange} style={{width: 120}}>
                  {priorities.map(priority => {
                    return <Option value={priority.id} key={priority.name}>{priority.name}</Option>
                  })}
                </Select>
                <Select className="gx-mx-3" defaultValue={currentTicket.status_id} style={{width: 120}}
                        onChange={this.onStatusChange}>
                  {statuses.map(status => {
                    return <Option value={status.id} key={status.name}>{status.name}</Option>
                  })}
                </Select>
                {this.onSelectOption()}
              </div>
              <div>#{currentTicket.id}</div>
              <h2 className="gx-my-2 gx-font-weight-bold">{currentTicket.title}</h2>
              <p>created at {moment(currentTicket.created_at).format("LL")}</p>

            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              data will come soon
            </Col>
          </Row>
        </Widget>
      </div>
    )
  }
}

export default TicketDetail

TicketDetail.defaultProps = {
  onUpdateTickets: "",
  onBackToList: ""
};

TicketDetail.propTypes = {
  onUpdateTickets: PropTypes.func,
  onBackToList: PropTypes.func
};