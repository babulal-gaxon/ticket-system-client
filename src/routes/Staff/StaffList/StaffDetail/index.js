import React, {Component} from 'react';
import {Avatar, Button, Col, Divider, Popconfirm, Row, Table, Tag, Tooltip} from "antd/lib/index";
import Widget from "../../../../components/Widget";
import PropTypes from "prop-types";
import AddStaffNotes from "./AddStaffNotes";
import {connect} from "react-redux";
import {
  onAddStaffNote,
  onDeleteStaffNotes,
  onEditStaffNotes,
  onGetStaffDetail,
  onGetStaffId,
  onGetStaffNotes,
  onGetStaffTickets,
  onNullifyCurrentStaff
} from "../../../../appRedux/actions/SupportStaff";
import moment from "moment/moment";
import Permissions from "../../../../util/Permissions";
import qs from "qs";

class StaffDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      addNotesModal: false,
      noteId: null
    }
  }

  componentDidMount() {
    const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    this.props.onGetStaffDetail(queryParams.id);
    this.props.onGetStaffNotes(queryParams.id);
    this.props.onGetStaffTickets(queryParams.id);
  }

  componentWillUnmount() {
    this.props.onNullifyCurrentStaff();
  }

  onToggleAddNoteModal = () => {
    this.setState({addNotesModal: !this.state.addNotesModal})
  };

  onAddButtonClick = () => {
    this.setState({noteId: null, addNotesModal: true})
  };

  onEditClick = (id) => {
    this.setState({noteId: id, addNotesModal: true})
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onGetTableColumns = () => {
    return [
      {
        title: 'Ticket Detail',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
          return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
              {record.assigned_by ?
                <Tooltip placement="top" title={record.assigned_by.first_name + " " + record.assigned_by.last_name}>
                  {record.assigned_by.avatar ?
                    <Avatar className="gx-mr-3 gx-size-50" src={record.assigned_by.avatar.src}/> :
                    <Avatar className="gx-mr-3 gx-size-50"
                            style={{backgroundColor: '#f56a00'}}>{record.assigned_by.first_name[0].toUpperCase()}</Avatar>}
                </Tooltip> : <Avatar className="gx-size-50 gx-mr-3" src="https://via.placeholder.com/150x150"/>}
              <div className="gx-media-body">
                <span className="gx-mb-0 gx-text-capitalize">{record.title}</span>
                <Tag className="gx-ml-2" color="blue">{record.product_name}</Tag>
                <div>{record.content}</div>
              </div>
            </div>
          )
        },
      },
      {
        title: 'Assign Date',
        dataIndex: 'assignDate',
        key: 'assignDate',
        render: (text, record) => {
          return <span className="gx-text-grey">{moment(record.created_at.date).format('LL')}</span>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        key: 'status_id',
        render: (text, record) => {
          return <Tag color="green">{record.status_name}</Tag>
        },
      },
      {
        title: 'Priority',
        dataIndex: 'priority_name',
        key: 'priority_name',
        render: (text, record) => {
          return <Tag color={record.priority_color_code}> {record.priority_name}</Tag>
        },
      },
    ];
  };

  onEditProfile = () => {
    this.props.onGetStaffId(this.props.currentStaff.id);
    this.props.history.push('/staff/add-new-member')
  };

  onGetTicketDetail = record => {
    this.props.history.push(`/manage-tickets/ticket-detail?id=${record.id}`);
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

  onBackToList = () => {
    this.props.history.goBack();
  };

  render() {
    const {selectedRowKeys, addNotesModal, noteId} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const {currentStaff, staffNotes, staffTickets} = this.props;
    return (
      <div className="gx-main-layout-content">
        {currentStaff ?
          <div className="gx-main-content">
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Widget>
                  <i className="icon icon-arrow-left" onClick={this.onBackToList}/>
                  <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-4 gx-mt-3">
                    {currentStaff.avatar ?
                      <Avatar className="gx-mr-3 gx-size-80" src={currentStaff.avatar.src}/> :
                      <Avatar className="gx-mr-3 gx-size-80"
                              style={{backgroundColor: '#f56a00'}}>{currentStaff.first_name[0].toUpperCase()}</Avatar>}
                    <div className="gx-media-body">
                      <span className="gx-mb-0 gx-text-capitalize gx-font-weight-bold">
                        {currentStaff.first_name + " " + currentStaff.last_name}</span>
                      <div className="gx-mt-2">
                        <Tag color={currentStaff.status === 1 ? "green" : "red"}>
                          {currentStaff.status === 1 ? "Active" : "Disabled"}
                        </Tag>
                      </div>
                    </div>
                  </div>
                  <Row>
                    <Col span={6}>
                      Email
                    </Col>
                    <Col>{currentStaff.email}</Col>
                  </Row>
                  <Divider/>
                  <Row>
                    <Col span={6}>
                      Phone
                    </Col>
                    <Col>{currentStaff.mobile}</Col>
                  </Row>
                  <Divider/>
                  <Row>
                    <Col span={6}>
                      Hourly Rate
                    </Col>
                    <Col>{currentStaff.hourly_rate}</Col>
                  </Row>
                  <Divider/>
                  <Row>
                    <Col span={6}>
                      Departments
                    </Col>
                    <Col>{currentStaff.departments.map(department => {
                      return department.name
                    }).join()
                    }
                    </Col>
                  </Row>
                  <Divider/>
                  <Row>
                    <Col span={6}>
                      Status
                    </Col>
                    <Col>{currentStaff.account_status === 1 ? "Active" : "Disabled"}</Col>
                  </Row>
                  <Divider/>
                  <Row>
                    <Col span={6}>
                      Designation
                    </Col>
                    <Col>{currentStaff.designation}</Col>
                  </Row>
                  <Divider/>
                  {(Permissions.canStaffEdit()) ?
                    <Tag color="blue" onClick={this.onEditProfile}>
                      <i className="icon icon-edit gx-mr-3"/>Edit Profile</Tag> : null}
                </Widget>
              </Col>
              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Row>
                  <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Widget> total login time will come here</Widget>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Widget>today's login time will come here</Widget>
                  </Col>
                </Row>
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Widget>
                      <div className="gx-d-flex gx-justify-content-between">
                        <span className="gx-font-weight-bold">Useful Notes</span>
                        <Button type="primary" ghost onClick={this.onAddButtonClick}>
                          Add New
                        </Button>
                      </div>
                      {staffNotes && staffNotes.map(note => {
                        return <div className="gx-mr-2" key={note.id}>
                          <div className="gx-d-flex gx-justify-content-between">
                            <div>
                              <div className="gx-font-weight-bold">{note.title}</div>
                              <div className="gx-my-2">{note.content}</div>
                              <div>
                                <span>created by: </span>
                                <span className="gx-text-primary">{note.display_name}</span>
                                <span> - {moment(note.created_at.date).format("LL")}</span>
                              </div>
                            </div>
                            <div className="gx-d-flex gx-justify-content-end">
                      <span onClick={() => this.onEditClick(note.id)}><i className="icon icon-edit gx-mr-3"/>
                       </span>
                              {this.onDeletePopUp(note.id)}
                            </div>
                          </div>
                          <Divider/>
                        </div>
                      })}
                    </Widget>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Widget title={<span>Assigned Tickets</span>}>
              <Table rowKey="id" rowSelection={rowSelection} columns={this.onGetTableColumns()}
                     className="gx-mb-4" dataSource={staffTickets}
                     onRow={(record) => ({
                       onClick: () => {
                         if (Permissions.canViewTicketDetail()) {
                           this.onGetTicketDetail(record)
                         }
                       }
                     })}
              />
            </Widget>
            {addNotesModal ?
              <AddStaffNotes
                addNotesModal={addNotesModal}
                onToggleAddNoteModal={this.onToggleAddNoteModal}
                onAddStaffNote={this.props.onAddStaffNote}
                onEditStaffNotes={this.props.onEditStaffNotes}
                noteId={noteId}
                staffNotes={staffNotes}
                staffId={currentStaff.id}/> : null}
          </div> : null}
      </div>
    );
  }
}

const mapStateToProps = ({supportStaff, ticketList}) => {
  const {currentTicket} = ticketList;
  const {staffNotes, staffTickets, currentStaff} = supportStaff;
  return {staffNotes, staffTickets, currentTicket, currentStaff};
};


export default connect(mapStateToProps, {
  onGetStaffNotes,
  onAddStaffNote,
  onEditStaffNotes,
  onDeleteStaffNotes,
  onGetStaffTickets,
  onGetStaffId,
  onGetStaffDetail,
  onNullifyCurrentStaff
})(StaffDetail);

StaffDetail.defaultProps = {
  totalItems: null
};

StaffDetail.defaultProps = {
  staff: null
};

StaffDetail.propTypes = {
  staff: PropTypes.object,
  onBackToList: PropTypes.func,
  onGetStaffId: PropTypes.func,
  history: PropTypes.object
};
