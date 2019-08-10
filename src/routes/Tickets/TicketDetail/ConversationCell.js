import React from "react";
import moment from "moment";
import Widget from "../../../components/Widget";
import {Avatar, Divider, Icon} from "antd";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import {getFormattedDateTime} from "../../../util/Utills";


const ConversationCell = ({conversation}) => {
  return (
    <div>
      <div className="gx-flex-row gx-module-detail-item gx-flex-nowrap gx-pl-0">
        <div className="gx-chat-todo-avatar">
          {conversation.author.avatar ?
            <Avatar className="gx-rounded-circle gx-size-40"
                    src={conversation.author.avatar.src}/> :
            <Avatar className="gx-rounded-circle gx-size-40"
                    style={{backgroundColor: '#f56a00'}}>{conversation.author.first_name[0].toUpperCase()}</Avatar>}
        </div>
        <div className="gx-chat-toto-info">
          <div className="gx-flex-column">
            <div className="gx-name gx-mr-2">{conversation.author.display_name}</div>
            <div>
              <span className="gx-time gx-text-muted"> <IntlMessages
                id="tickets.createdAt"/> {getFormattedDateTime(conversation.created_at)}</span>
              <span className="gx-mr-2 gx-text-grey"> <IntlMessages
                id="tickets.lastUpdated"/> {moment(conversation.updated_at).fromNow()}</span>
            </div>
          </div>
          {conversation.message ? conversation.message.split("\n").map(message => <p
            style={{padding: 0, margin: 0, minHeight: 15}}>
            {message}
          </p>) : null}
          <div className="gx-d-flex">
            {conversation.attachments.map((attachment, index) => {
              return <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mt-3" key={index}>
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
