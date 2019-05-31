import React, {Component} from "react"
import {Avatar, Badge, Col, Input, Row} from "antd";
import PropTypes from "prop-types";

import CustomScrollbars from "../../../util/CustomScrollbars";

class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: this.props.ticket,
      editTitle: false,
      title: "",
    }
  };
  onEditTitle = () => {
    if (this.state.editTitle) {
      const ticket = this.state.ticket;
      ticket.title = this.state.title;
      this.props.onUpdateTickets(ticket)
    }
    this.setState({
      editTitle: !this.state.editTitle
    });
  };
  render() {
    const {ticket, editTitle} = this.state;
    return (
      <div className="gx-module-detail gx-module-list">
        <CustomScrollbars className="gx-todo-detail-content-scroll">
          <div className="gx-module-detail-item gx-module-detail-header">
            <i className="gx-icon-btn icon icon-arrow-left" onClick={this.props.onBackToList}/>
            <Row>
              <Col xs={24} sm={12} md={17} lg={12} xl={17}>
                <div className="gx-flex-row">
                  <div className="gx-user-name gx-mr-md-4 gx-mr-2 gx-my-1">
                    <div className="gx-flex-row gx-align-items-center gx-pointer">
                      <Avatar className="gx-mr-3 gx-size-36" src="https://via.placeholder.com/150x150"/>
                      <h4 className="gx-mb-0">Assigned to</h4>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={7} lg={12} xl={7}>
                <div className="gx-flex-row gx-justify-content-between">
                  <i className="gx-icon-btn icon icon-trash"/>
                  <span className="gx-d-block">
                    <i className="gx-icon-btn icon icon-star"/>
                  </span>
                  <span className="gx-d-block">
                    <i className="gx-icon-btn icon icon-important"/>
                  </span>
                  <span className="gx-d-block">
                    <i className="gx-icon-btn icon icon-tag"/>
                  </span>
                </div>
              </Col>
            </Row>
          </div>
          <div className="gx-module-detail-item">
            <div className="gx-mb-md-4 gx-mb-2">
              <Badge style={ticket.priority_color_code}>
                {ticket.priority_name}
              </Badge>
            </div>
            <div className="gx-form-group gx-flex-row gx-align-items-center gx-mb-0 gx-flex-nowrap">
              <div>
                <span
                  className="gx-border-2 gx-size-30 gx-rounded-circle gx-text-muted gx-border-grey gx-d-block gx-text-center gx-pointer">
                    <i className="icon icon-check"/>
                </span>
              </div>
              {editTitle ?
                <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                  <div className="gx-col">
                    <Input
                      fullWidth
                      className="gx-task-title"
                      id="required"
                      placeholder="Title"
                      onChange={(event) => this.setState({title: event.target.value})}
                      defaultValue={ticket.title}/>
                  </div>
                  <span className="gx-d-block gx-size-40 gx-text-center gx-pointer" onClick={this.onEditTitle}>
                    <i className="gx-icon-btn icon icon-edit"/>
                  </span>
                </div> :
                <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                  <div className="gx-task-title gx-col">
                    {ticket.title}
                  </div>
                  <span className="gx-d-block gx-size-40 gx-text-center gx-pointer" onClick={this.onEditTitle}>
                    <i className="gx-icon-btn icon icon-edit"/>
                  </span>
                </div>}
            </div>
            <div className="gx-module-detail-item gx-mb-md-4 gx-mb-2">
              <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                <div className="gx-task-input gx-col">
                  <Input
                    fullWidth
                    id="required"
                    placeholder="Note"
                    defaultValue={ticket.message}/>
                </div>
                <span className="gx-d-block gx-size-40 gx-text-center gx-pointer">
                    <i className="gx-icon-btn icon icon-edit"/>
                </span>
              </div>
              <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                <div className="gx-task-des gx-col">
                  {ticket.message === '' ? 'Add note here' : ticket.message}
                </div>
                <span className="gx-d-block gx-size-40 gx-text-center gx-pointer">
                  <i className="gx-icon-btn icon icon-edit"/>
                </span>
              </div>
            </div>
            <div className="gx-module-detail-item">
              <h3 className="gx-mb-0 gx-mb-sm-1">Comments</h3>
            </div>
          </div>
        </CustomScrollbars>
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