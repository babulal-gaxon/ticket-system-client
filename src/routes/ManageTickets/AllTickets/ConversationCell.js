import React from "react";
import Widget from "../../../components/Widget";
import {Avatar, Icon} from "antd";
import PropTypes from "prop-types";
import {getFormattedDateTime} from "../../../util/Utills";


const ConversationCell = ({conversation}) => {
  return (
    <div className="gx-flex-row gx-module-detail-item gx-flex-nowrap gx-pl-0">
      <div className="gx-chat-todo-avatar">
        {conversation.author.avatar ?
          <Avatar className="gx-rounded-circle gx-size-40" src={conversation.author.avatar.src}
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
        <div className="gx-mb-3">
        {conversation.message ? conversation.message.split("\n").map((message, index) => <p
          style={{padding: 0, margin: 0, minHeight: 15}} key={index}>
           {message}
        </p>) : null}
        </div>
        <div className="gx-d-flex">
          {conversation.attachments.map(attachment => {
            return <div className="gx-media gx-flex-nowrap gx-align-items-center" key={attachment.id}>
              <Widget styleName="gx-card-filter gx-mr-2">
                <a href={ attachment.src} download target="_blank">
                  <div className="gx-d-flex">
                    <div>
                      <div className="gx-text-black" style={{fontSize:16}}>{attachment.title}</div>
                      <div className="gx-text-grey">{attachment.size /1024 > 1024 ?
                        `${(attachment.size/1024/1024).toFixed(1)} MB` : `${(attachment.size/1024).toFixed(1)} KB`
                      }</div>
                    </div>
                    <div className="gx-ml-md-5 gx-ml-2"><Icon type="vertical-align-bottom" style={{fontSize:22,color:"#545454"}}/></div>
                  </div>
                </a>
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
  conversation: {}
};

ConversationCell.propTypes = {
  conversation: PropTypes.object
};
