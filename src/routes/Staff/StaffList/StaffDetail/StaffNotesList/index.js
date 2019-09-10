import React, {Component} from 'react';
import Widget from "../../../../../components/Widget";
import {Button, Divider, Empty, Modal} from "antd";
import AddStaffNotes from "./AddStaffNotes";
import {getFormattedDate} from "../../../../../util/Utills";
import IntlMessages from "../../../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const confirm = Modal.confirm;

class StaffNotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNotesModal: false,
      currentNote: null
    }
  }

  onToggleAddNoteModal = () => {
    this.setState({addNotesModal: !this.state.addNotesModal})
  };

  onAddButtonClick = () => {
    this.setState({currentNote: null, addNotesModal: true})
  };

  onEditClick = (note) => {
    this.setState({currentNote: note, addNotesModal: true})
  };

  onDeletePopUp = (recordId) => {
    const {messages} = this.props.intl;
    confirm({
      title: messages["staff.notes.message.delete"],
      okText: messages["common.yes"],
      cancelText: messages["common.no"],
      onOk: () => {
        this.props.onDeleteStaffNotes(recordId, this);
      }
    })
  };

  render() {
    const {staffNotes, staffId} = this.props;
    const {addNotesModal, currentNote} = this.state;
    return (
      <div className="gx-main-content">
        <Widget styleName="gx-card-filter">
          <div className="gx-d-flex gx-justify-content-between">
            <span className="gx-widget-heading"><IntlMessages id="staff.notes.heading"/></span>
            <Button type="primary" ghost onClick={this.onAddButtonClick}>
              <IntlMessages id="common.addNew"/>
            </Button>
          </div>
          {staffNotes.length > 0 ? staffNotes.map(note => {
            return <div className="gx-mr-2" key={note.id}>
              <div className="gx-d-flex gx-justify-content-between">
                <div>
                  <div className="gx-font-weight-semi-bold">{note.title}</div>
                  <div className="gx-my-2">{note.content}</div>
                  <div>
                    <span><IntlMessages id="common.createdBy"/>: </span>
                    <span className="gx-text-primary">{note.display_name}</span>
                    <span> - {getFormattedDate(note.created_at)}</span>
                  </div>
                </div>
                <div className="gx-d-flex gx-justify-content-end">
                      <span onClick={() => this.onEditClick(note)}><i className="icon icon-edit gx-mr-3 gx-pointer"/>
                       </span>
                  <i className="icon icon-trash gx-pointer" onClick={() => this.onDeletePopUp(note.id)}/>
                </div>
              </div>
              <Divider/>
            </div>
          }) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
        </Widget>
        {addNotesModal ?
          <AddStaffNotes
            addNotesModal={addNotesModal}
            currentNote={currentNote}
            staffId={staffId}
            onAddStaffNote={this.props.onAddStaffNote}
            onEditStaffNotes={this.props.onEditStaffNotes}
            onToggleAddNoteModal={this.onToggleAddNoteModal}
          /> : null}
      </div>
    );
  };
}

export default injectIntl(StaffNotesList);
