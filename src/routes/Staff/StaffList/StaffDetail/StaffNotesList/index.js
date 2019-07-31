import React, {Component} from 'react';
import Widget from "../../../../../components/Widget";
import {Button, Divider, Empty, Popconfirm} from "antd";
import AddStaffNotes from "./AddStaffNotes";
import moment from "moment";

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
    return (
      <Popconfirm
        title="Are you sure to delete this Note?"
        onConfirm={() => {
          this.props.onDeleteStaffNotes(recordId);
        }}
        okText="Yes"
        cancelText="No">
        <i className="icon icon-trash"/>
      </Popconfirm>
    )
  };

  render() {
    const {staffNotes, staffId} = this.props;
    const {addNotesModal, currentNote} = this.state;
    return (
      <div className="gx-main-content">
        <Widget styleName="gx-card-filter">
          <div className="gx-d-flex gx-justify-content-between">
            <span className="gx-widget-heading">Useful Notes</span>
            <Button type="primary" ghost onClick={this.onAddButtonClick}>
              Add New
            </Button>
          </div>
          {staffNotes.length > 0 ? staffNotes.map(note => {
            return <div className="gx-mr-2" key={note.id}>
              <div className="gx-d-flex gx-justify-content-between">
                <div>
                  <div className="gx-font-weight-semi-bold">{note.title}</div>
                  <div className="gx-my-2">{note.content}</div>
                  <div>
                    <span>created by: </span>
                    <span className="gx-text-primary">{note.display_name}</span>
                    <span> - {moment(note.created_at.date).format("LL")}</span>
                  </div>
                </div>
                <div className="gx-d-flex gx-justify-content-end">
                      <span onClick={() => this.onEditClick(note)}><i className="icon icon-edit gx-mr-3"/>
                       </span>
                  {this.onDeletePopUp(note.id)}
                </div>
              </div>
              <Divider/>
            </div>
          }) : <Empty/>}
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

export default StaffNotesList;
