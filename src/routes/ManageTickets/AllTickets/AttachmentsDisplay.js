import React from 'react';
import {Avatar, Divider} from "antd";
import {injectIntl} from "react-intl";

const imageExtensions = ["jpg", "jpeg", "png", "svg", "gif", "ico"];
const docExtensions = ["pdf", "doc", "docx", "txt", "ppt", "pptx", "xls"];
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
          {attachments.map((attachment, index) => {
            if (imageExtensions.includes(getFileExtension(attachment))) {
              return (
                <div key={index}>
                  <a href={attachment.src} download target="_blank">
                    <Avatar shape="square" icon="user" key={attachment.id} src={attachment.src}
                            className="gx-mr-2 gx-size-150 gx-p-1 gx-border gx-border-grey"/>
                  </a>
                  <Divider/>
                </div>
              )
            } else if (docExtensions.includes(getFileExtension(attachment))) {
              if (getFileExtension(attachment) === "ppt" || getFileExtension(attachment) === "pptx") {
                return (
                  <div key={index}>
                    <div className="gx-d-flex gx-my-2">
                      <div><img src={require("assets/images/icon-ppt.png")} alt="doc"/></div>
                      <a href={attachment.src} download>
                        <div className="gx-ml-2">
                          <div className="gx-text-black" style={{fontSize: 16}}>{attachment.title}</div>
                          <div className="gx-text-grey">{attachment.size / 1024 > 1024 ?
                            `${(attachment.size / 1024 / 1024).toFixed(1)} MB` : `${(attachment.size / 1024).toFixed(1)} KB`
                          }</div>
                        </div>
                      </a>
                    </div>
                    <Divider/>
                  </div>
                )
              } else if (getFileExtension(attachment) === "xls") {
                return (
                  <div key={index}>
                    <div className="gx-d-flex gx-my-2">
                      <div><img src={require("assets/images/icon-xls.png")} alt="doc"/></div>
                      <a href={attachment.src} download>
                        <div className="gx-ml-2">
                          <div className="gx-text-black" style={{fontSize: 16}}>{attachment.title}</div>
                          <div className="gx-text-grey">{attachment.size / 1024 > 1024 ?
                            `${(attachment.size / 1024 / 1024).toFixed(1)} MB` : `${(attachment.size / 1024).toFixed(1)} KB`
                          }</div>
                        </div>
                      </a>
                    </div>
                    <Divider/>
                  </div>
                )
              } else {
                return (
                  <div key={index}>
                    <div className="gx-d-flex gx-my-2">
                      <div><img src={require("assets/images/icon-doc.png")} alt="doc"/></div>
                      <a href={attachment.src} download>
                        <div className="gx-ml-2">
                          <div className="gx-text-black" style={{fontSize: 16}}>{attachment.title}</div>
                          <div className="gx-text-grey">{attachment.size / 1024 > 1024 ?
                            `${(attachment.size / 1024 / 1024).toFixed(1)} MB` : `${(attachment.size / 1024).toFixed(1)} KB`
                          }</div>
                        </div>
                      </a>
                    </div>
                    <Divider/>
                  </div>
                )
              }
            } else if (audioExtensions.includes(getFileExtension(attachment))) {
              return (
                <div key={index}>
                  <audio src={attachment.src} controls/>
                  <Divider/>
                </div>
              )
            } else {
              return <div className="gx-my-2" key={index}>
                <video controls width="100%">
                  <source src={attachment.src}/>
                </video>
                <Divider/>
              </div>
            }
          })}

        </div>
      </div> : null}
  </div>
};

export default injectIntl(AttachmentsDisplay);