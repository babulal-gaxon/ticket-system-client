import React, {Component} from "react"
import {
  onAddTickets, onBackToList,
  onGetPriorities,
  onGetTickets,
  onSelectTicket,
  onToggleAddTicket,
  onUpdateTickets
} from "../../../appRedux/actions/TicketList";
import {Avatar, Badge, Button, DatePicker, Icon, Input, Layout, Select, Table, Tooltip} from "antd";
import Widget from "../../../components/Widget/index";
import {connect} from "react-redux";
import DropdownButton from "./DropdownButton";
import AddNewTicket from "../AddNewTicket/index";
import {onSupportStaff} from "../../../appRedux/actions/SupportStaff";
import IntlMessages from "../../../util/IntlMessages";
import TicketDetail from "./TicketDetail";
import InfoView from 'components/InfoView'
import Auxiliary from "../../../util/Auxiliary";
import Permissions from "../../../util/Permissions";


const ButtonGroup = Button.Group;
const Option = Select.Option;
const {Sider} = Layout;

class AllTickets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      itemNumbers: 10,
      current: 1,
      sideBarActive: false,
      startDate: null,
      endDate: null
    }
  }

  componentWillMount() {
    if (Permissions.canTicketView()) {
      this.props.onGetTickets();
    }
    this.props.onGetPriorities();
    this.props.onSupportStaff();
  }

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onDropdownChange = (value) => {
    this.setState({itemNumbers: value});
  };

  onCurrentIncrement = () => {
    this.setState({current: this.state.current++})
  };

  onCurrentDecrement = () => {
    this.setState({current: this.state.current--})
  };

  onSideBarActive = () => {
    this.setState({sideBarActive: !this.state.sideBarActive})
  };

  onStartDateChange = value => {
    this.setState({startDate: value})
  };

  onEndDateChange = value => {
    this.setState({endDate: value})
  };

  getSidebar = () => {
    return <Sider className="gx-module-sidenav gx-d-none gx-d-lg-flex">
      <div className="gx-module-side">
        <div className="gx-module-side-content">
          <h2>Filter Tickets</h2>
        </div>
        <div className="gx-module-nav">
          <h5>Date</h5>
          <div>
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={this.state.startDate}
              placeholder="Start Date"
              onChange={this.onStartDateChange}
            />
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={this.state.endDate}
              placeholder="End Date"
              onChange={this.onEndDateChange}
            />
          </div>
          <ul className="gx-module-nav">
            <h5>Category</h5>
            <li className="gx-module-nav-label">
              <i className="icon icon-tickets"/>
              <IntlMessages id="sidebar.dashboard.all.tickets"/>
            </li>
            <li className="gx-module-nav-label">
              <i className="icon icon-ticket-new"/>
              <IntlMessages id="sidebar.dashboard.add.new.ticket"/>
            </li>
            <li className="gx-module-nav-label">
              <i className="icon icon-schedule"/>
              <IntlMessages id="sidebar.dashboard.snoozes"/>
            </li>
          </ul>
          <ul>
            <h5>Products</h5>
            <li>
              <i className="icon icon-tag-o"/>
              <IntlMessages id="sidebar.dashboard.jumbo.react"/>
            </li>
            <li>
              <i className="icon icon-tag-o"/>
              <IntlMessages id="sidebar.dashboard.mouldify"/>
            </li>
            <li>
              <i className="icon icon-tag-o"/>
              <IntlMessages id="sidebar.dashboard.cisr.wp.theme"/>
            </li>
            <li>
              <i className="icon icon-tag-o"/>
              <IntlMessages id="sidebar.dashboard.jumbo.react"/>
            </li>
          </ul>
          <ul>
            <h5>Priority</h5>
            <li>
              <i className="icon icon-tag-new"/>
              <span> <IntlMessages id="sidebar.dashboard.critical"/></span>
            </li>
            <li>
              <i className="icon icon-tag-new"/>
              <IntlMessages id="sidebar.dashboard.moderate"/>
            </li>
            <li>
              <i className="icon icon-tag-new"/>
              <IntlMessages id="sidebar.dashboard.default"/>
            </li>
          </ul>
          <Button style={{backgroundColor: "green"}} block>
            Apply Filter
          </Button>
        </div>
      </div>
    </Sider>
  };

  getTicketItem = () => {
    const buttonWidth = 100;
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.id}</span>

        },
      },
      {
        title: 'Ticket Detail',
        dataIndex: 'title',
        render: (text, record) => {
          return ( <div className="gx-media gx-task-list-item gx-flex-nowrap">
              <div style={{width: buttonWidth}}>
                <Tooltip placement="top" title={record.assigned_by}>
                  <Avatar className="gx-mr-3 gx-size-36" src="https://via.placeholder.com/150x150"/>
                </Tooltip>
              </div>
              <div className="gx-media-body gx-task-item-content">
                <div>
                  <p className="gx-mb-0">{record.title}</p>
                  <div className="gx-text-muted">
                    this is dummy data, original data is not available.
                  </div>
                </div>
              </div>
            </div>
          )
        },

      },
      {
        title: 'Product',
        dataIndex: '',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">Not available</span>
        },
      },
      {
        title: 'Assign Date',
        dataIndex: '',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">Not available</span>
        },
      },

      {
        title: 'Assign to',
        dataIndex: '',
        render: (text, record) => {
          return (<div style={{width: buttonWidth}}>
            <Tooltip placement="top" title="dummy data">
              <Avatar className="gx-mr-3" src="https://via.placeholder.com/150x150"/>
            </Tooltip>
          </div>)
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        render: (text, record) => {
          return <Badge style={{backgroundColor: record.status_color_code}}>
            {record.status_name}
          </Badge>

        },
      },
      {
        title: 'Priority',
        dataIndex: 'priority_name',
        render: (text, record) => {
          return <Badge style={record.priority_color_code}>
            {record.priority_name}
          </Badge>
        },
      },
      {
        title: '',
        dataIndex: '',
        render: (text, record) => {
          return <DropdownButton
            options={[{id: 3, value: 'Archived'}, {id: 2, value: 'Re-Open'}, {id: 1, value: 'Change Priority'}, {
              id: 4,
              value: 'Delete'
            }]}><i className="icon icon-ellipse-h"/>
          </DropdownButton>
        },
      },
    ];
  };

  getTicketShowOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange}>
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };

  render() {
    const {selectedRowKeys} = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };


    return (
      <Auxiliary>
        {this.state.sideBarActive ? this.getSidebar() : null}
        <Auxiliary>
          <Widget
            title={<div>
              <Button type="default" shape="round" onClick={this.onSideBarActive}>
                <i className="icon icon-long-arrow-left"/>
              </Button>
              {Permissions.canTicketAdd() ? <Button type="primary" className="h4 gx-text-capitalize gx-mb-0"
                                                    onClick={this.props.onToggleAddTicket}>
                Add New
              </Button> : null}


              {this.props.showAddTicket ?
                <AddNewTicket showAddTicket={this.props.showAddTicket}
                              onToggleAddTicket={this.props.onToggleAddTicket}
                              onAddTickets={this.props.onAddTickets}
                              priorities={this.props.priorities}
                              staff={this.props.staff}/> : null}
            </div>} extra={
            <div className="gx-text-primary gx-mb-0 gx-pointer gx-d-none gx-d-sm-block">
              <Input
                placeholder="Enter keywords to search tickets"
                prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
              />
              {this.getTicketShowOptions()}
              <ButtonGroup>
                <Button type="default" onClick={this.onCurrentDecrement}>
                  <i className="icon icon-long-arrow-left"/>
                </Button>
                <Button type="default" onClick={this.onCurrentIncrement}>
                  <i className="icon icon-long-arrow-right"/>
                </Button>
              </ButtonGroup>
            </div>
          }>

            {this.props.currentTicket ?
              <TicketDetail ticket={this.props.currentTicket} onUpdateTickets={this.props.onUpdateTickets} onBackToList ={this.props.onBackToList}/> :
              <Table key={Math.random()} rowSelection={rowSelection} columns={this.getTicketItem()}
                     dataSource={this.props.tickets}
                     pagination={{pageSize: this.state.itemNumbers}}
                     className="gx-mb-4"
                     onRow={(record) => ({
                       onClick: (e) => {
                         if (Permissions.canViewTicketDetail()) {
                           this.props.onSelectTicket(record)
                         }
                       }
                     })}/>}

            <div className="gx-d-flex gx-flex-row">

              {this.getTicketShowOptions()}
            </div>
            <div>


            </div>
          </Widget>
        </Auxiliary>
        <InfoView/>
      </Auxiliary>

    );
  }
}


const mapStateToProps = ({ticketList, supportStaff}) => {
  const {tickets, showAddTicket, priorities, currentTicket} = ticketList;
  const {staff} = supportStaff;
  return {tickets, showAddTicket, priorities, staff, currentTicket};

}

export default connect(mapStateToProps, {
  onGetTickets,
  onToggleAddTicket,
  onAddTickets,
  onGetPriorities,
  onSupportStaff,
  onSelectTicket,
  onUpdateTickets,
  onBackToList
})(AllTickets);
