import React from "react";
import moment from "moment";
import Widget from "../../../components/Widget";
import {Avatar, Divider} from "antd";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";


const ConversationCell = ({conversation}) => {
  return (
    <div>
    <div className="gx-flex-row gx-module-detail-item gx-flex-nowrap gx-pl-0">
      <div className="gx-chat-todo-avatar">
        <Avatar className="gx-rounded-circle gx-size-40" src=""
                alt="..."/>
      </div>
      <div className="gx-chat-toto-info">
        <div className="gx-flex-column">
          <div className="gx-name gx-mr-2">{conversation.author.display_name}</div>
          <div>
          <span className="gx-time gx-text-muted"> <IntlMessages id="tickets.createdAt"/> {moment(conversation.created_at.date).format('LL')}</span>
            <span className="gx-mr-2 gx-text-grey"> <IntlMessages id="tickets.lastUpdated"/> {moment(conversation.updated_at.date).fromNow()}</span>
          </div>
        </div>
        <div className="gx-message gx-my-2">{conversation.message}</div>
        <div className="gx-d-flex">
          {conversation.attachments.map((attachment, index) => {
            return <div className="gx-media gx-flex-nowrap gx-align-items-center" key={index}>
              <Widget styleName="gx-card-filter gx-mr-2">
                <div>{attachment.title}</div>
                <div>{attachment.size/1000} <IntlMessages id="common.kb"/></div>
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

export default ConversationCell;

ConversationCell.defaultProps = {
  conversation: null
};

ConversationCell.propTypes = {
  conversation: PropTypes.object
};
