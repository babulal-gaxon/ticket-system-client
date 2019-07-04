import React from "react";
import {Avatar} from "antd/lib/index";
import moment from "moment";


const ConversationCell = ({conversation}) => {
  return (
    <div className="gx-flex-row gx-module-detail-item gx-flex-nowrap gx-pl-0">
      <div className="gx-chat-todo-avatar">

        <Avatar className="gx-rounded-circle gx-size-40" src=""
                alt="..."/>
      </div>
      <div className="gx-chat-toto-info">
        <div className="gx-flex-column">
          <div className="gx-name gx-mr-2">{conversation.display_name}</div>
          <div className="gx-time gx-text-muted">{moment(conversation.created_at.date).format('LLL')}</div>
        </div>
        <div className="gx-message gx-mt-2">{conversation.message}</div>
      </div>
    </div>
  )
};

export default ConversationCell;
