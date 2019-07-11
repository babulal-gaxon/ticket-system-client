import React, {Component} from 'react';
import {Avatar, Button, Col, Divider, Row, Table, Tag} from "antd";
import Widget from "../../../components/Widget";
import PropTypes from "prop-types";
import AddStaffNotes from "./AddStaffNotes";

class StaffDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            addNotesModal: false
        }
    }

    componentDidMount() {
        this.props.onGetStaffNotes();
    }

    onToggleAddNoteModal = () => {
        this.setState({addNotesModal: !this.state.addNotesModal})
    };

    onSelectChange = selectedRowKeys => {
        this.setState({selectedRowKeys});
    };
    onGetTableColumns = () => {
        return [
            {
                title: 'Ticket Detail',
                dataIndex: 'ticketDetail',
                key: 'ticketDetail',
                render: (text, record) => {
                    return <span className="gx-email gx-d-inline-block gx-mr-2">Demo</span>
                },
            },
            {
                title: 'Product',
                dataIndex: 'product',
                key: 'product',
                render: (text, record) => {
                    return <span className="gx-email gx-d-inline-block gx-mr-2">Demo Product</span>
                },
            },
            {
                title: 'Assign Date',
                dataIndex: 'assignDate',
                key: 'assignDate',
                render: (text, record) => {
                    return <Tag color={record.color_code}>Demo Date</Tag>
                },
            },
            {
                title: 'Status',
                dataIndex: 'status_id',
                key: 'Status',
                render: (text, record) => {
                    return <Tag color="blue">
                        status
                    </Tag>
                },
            },
            {
                title: 'Priority',
                dataIndex: 'priority',
                key: 'priority',
                render: (text, record) => {
                    return <Tag color="red">
                        Priority
                    </Tag>
                },
            },
            {
                title: '',
                dataIndex: '',
                key: 'empty',
                render: (text, record) => {
                    return <span><i className="icon icon-edit gx-mr-3"/>
            <i className="icon icon-trash"/>
          </span>
                },
            },
        ];
    };
    onEditProfile = () => {
        this.props.onGetStaffId(this.props.staff.id);
        this.props.history.push('/staff/add-new-member')
    };

    render() {
        const {selectedRowKeys, addNotesModal} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        const staff = this.props.staff;
        return (
            <div className="gx-main-content">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                        <Widget>
                            <i className="icon icon-arrow-left" onClick={() => this.props.onBackToList()}/>
                            <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
                                {staff.avatar ?
                                    <Avatar className="gx-mr-3 gx-size-50" src={staff.avatar.src}/> :
                                    <Avatar className="gx-mr-3 gx-size-50"
                                            style={{backgroundColor: '#f56a00'}}>{staff.first_name[0].toUpperCase()}</Avatar>}
                                <div className="gx-media-body">
                                    <span
                                        className="gx-mb-0 gx-text-capitalize">{staff.first_name + " " + staff.last_name}</span>
                                    <div className="gx-mt-2">
                                        <Tag color={staff.account_status === 1 ? "green" : "red"}>
                                            {staff.account_status === 1 ? "Active" : "Disabled"}
                                        </Tag>
                                    </div>
                                </div>
                            </div>
                            <Row>
                                <Col span={6}>
                                    Email
                                </Col>
                                <Col>{staff.email}</Col>
                            </Row>
                            <Divider/>
                            <Row>
                                <Col span={6}>
                                    Phone
                                </Col>
                                <Col>{staff.mobile}</Col>
                            </Row>
                            <Divider/>
                            <Row>
                                <Col span={6}>
                                    Hourly Rate
                                </Col>
                                <Col>{staff.hourly_rate}</Col>
                            </Row>
                            <Divider/>
                            <Row>
                                <Col span={6}>
                                    Departments
                                </Col>
                                <Col>{staff.departments.map(department => {
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
                                <Col>{staff.account_status === 1 ? "Active" : "Disabled"}</Col>
                            </Row>
                            <Divider/>
                            <Row>
                                <Col span={6}>
                                    Designation
                                </Col>
                                <Col>{staff.designation}</Col>
                            </Row>
                            <Divider/>
                            <Tag color="blue" onClick={this.onEditProfile}>
                                <i className="icon icon-edit gx-mr-3"/>Edit Profile</Tag>
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
                                        <Button type="primary" ghost onClick={this.onToggleAddNoteModal}>
                                            Add New
                                        </Button>
                                    </div>
                                </Widget>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Widget title={<span>Assigned Tickets</span>}>
                    <Table rowSelection={rowSelection} columns={this.onGetTableColumns()}
                           className="gx-mb-4"
                    />
                </Widget>
                {addNotesModal ? <AddStaffNotes
                    addNotesModal={addNotesModal}
                    onToggleAddNoteModal={this.onToggleAddNoteModal}/> : null}
            </div>
        );
    }
}

export default StaffDetail;

StaffDetail.defaultProps = {
    staff: null
};

StaffDetail.propTypes = {
    staff: PropTypes.object,
    onBackToList: PropTypes.func,
    onGetStaffId: PropTypes.func,
    history: PropTypes.object
};