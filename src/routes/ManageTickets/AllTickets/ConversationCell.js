import React from "react";
import Widget from "../../../components/Widget";
import {Avatar} from "antd";
import PropTypes from "prop-types";
import {MEDIA_BASE_URL} from "../../../constants/ActionTypes";
import {getFormattedDateTime} from "../../../util/Utills";


const ConversationCell = ({conversation}) => {
  return (
    <div className="gx-flex-row gx-module-detail-item gx-flex-nowrap gx-pl-0">
      <div className="gx-chat-todo-avatar">
        {
          conversation.author.avatar ?
            <Avatar className="gx-rounded-circle gx-size-40" src={MEDIA_BASE_URL + conversation.author.avatar.src}
                    alt={conversation.author.display_name}/> :
            <Avatar className="gx-mr-3 gx-size-50"
                    style={{backgroundColor: '#f56a00'}}>{conversation.author.display_name[0].toUpperCase()}</Avatar>
        }
      </div>
      <div className="gx-chat-toto-info">
        <div className="gx-flex-column">
          <div className="gx-name gx-mr-2">{conversation.author.display_name}</div>
          <div className="gx-time gx-text-muted">{getFormattedDateTime(conversation.created_at)}</div>
        </div>
        <div className="gx-message gx-my-2">{conversation.message}</div>
        <div className="gx-d-flex">
          {conversation.attachments.map(attachment => {
            return <div className="gx-media gx-flex-nowrap gx-align-items-center" key={attachment.id}>
              <Widget styleName="gx-card-filter gx-mr-2">
                <div>{attachment.title}</div>
                <div>{attachment.size / 1000} kb</div>
              </Widget>
            </div>
          })}
        </div>
      </div>
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
