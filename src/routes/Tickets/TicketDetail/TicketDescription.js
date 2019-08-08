import {Avatar, Divider} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import {getFormattedDateTime} from "../../../util/Utills";
import Widget from "../../../components/Widget";
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";


const TicketDescription = ({currentTicket}) => {

  return (
    <div>
      <div className="gx-flex-row gx-module-detail-item gx-flex-nowrap gx-pl-0">

        <div className="gx-chat-todo-avatar">
          {currentTicket.assigned_by.avatar ?
            <Avatar className="gx-rounded-circle gx-size-40"
                    src={currentTicket.assigned_by.avatar.src}/> :
            <Avatar className="gx-rounded-circle gx-size-40"
                    style={{backgroundColor: '#f56a00'}}>{currentTicket.assigned_by.first_name[0].toUpperCase()}</Avatar>}
        </div>
        <div className="gx-chat-toto-info">
          <div className="gx-flex-column">
            <div className="gx-name gx-mr-2">{currentTicket.display_name}</div>
            <div>
        <span className="gx-time gx-text-muted"> <IntlMessages
             id="tickets.createdAt"/> {getFormattedDateTime(currentTicket.created_at)}</span>
              <span className="gx-mr-2 gx-text-grey"> <IntlMessages
                id="tickets.lastUpdated"/> {moment(currentTicket.updated_at).fromNow()}</span>
            </div>
          </div>
          {currentTicket.content ? currentTicket.content.split("\n").map(message => <p
            style={{padding: 0, margin: 0, minHeight: 15}}>
            {message}
          </p>) : null}
          <div className="gx-d-flex">
            {currentTicket.all_attachments.tickets.map((attachment, index) => {
              return <div className="gx-media gx-flex-nowrap gx-align-items-center" key={index}>
                <Widget styleName="gx-card-filter gx-mr-2">
                  <div>{attachment.title}</div>
                  <div>{attachment.size / 1000} <IntlMessages id="common.kb"/></div>
                </Widget>
              </div>
            })}
          </div>
        </div>
      </div>
      <Divider/>
    </div>
  )
};

export default TicketDescription;

TicketDescription.defaultProps = {
  currentTicket: null
};

TicketDescription.propTypes = {
  currentTicket: PropTypes.object
};