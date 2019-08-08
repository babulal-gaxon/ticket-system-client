import React from 'react';
import {Avatar} from "antd";

const imageExtensions = ["jpg", "jpeg", "png", "svg", "gif", "ico"];
const docExtensions = ["pdf", "doc", "docx", "txt", "ppt", "pptx"];
const audioExtensions = ["mp3", "aa", "aac", "aax", "act"];
const videoExtensions = ["mp4", "avi", "3gp", "flv", "ogg", "wmv", "webm"];

const getFileExtension = file => {
  return file.title.substring(file.title.lastIndexOf('.') + 1)
};


const AttachmentsDisplay = ({attachments}) => {
  return <div>
      {attachments.length > 0 ?
        <div>
          <div className="gx-my-2">
            {attachments.map(attachment => {
              if (imageExtensions.includes(getFileExtension(attachment))) {
                console.log("image", getFileExtension(attachment));
                return <a href={ attachment.src} download target="_blank">
                  <Avatar shape="square" icon="user" key={attachment.id} src={attachment.src}
                          className="gx-mr-2 gx-size-100"/>
                </a>
              }
              else if (docExtensions.includes(getFileExtension(attachment))) {
                return <a href={attachment.src} download>
                  <div className="gx-my-2">{attachment.title}</div>
                </a>
              }
              else if (audioExtensions.includes(getFileExtension(attachment))) {
                return <audio src={attachment.src} controls/>
              }
              else {
                return <div className="gx-my-2">
                  <video controls width="100%">
                    <source src={attachment.src}/>
                  </video>
                </div>
              }
            })}
          </div>
        </div> : null}
    </div>
};

export default AttachmentsDisplay;