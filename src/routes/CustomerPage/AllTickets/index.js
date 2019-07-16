import React, {Component} from 'react';
import {onGetFormOptions, onGetRaisedTickets, onRaiseNewTicket} from "../../../appRedux/actions/CustomerDetails";
import {connect} from "react-redux";
import {Button, Input, Select, Table, Tag} from "antd";
import Widget from "../../../components/Widget";
import RaiseTicketModal from "./RaiseTicketModal";

const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;

class AllTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      filterText: "",
      itemNumbers: 10,
      current: 1,
      showAddTicket: false,
      selectedTickets: [],
      ticketId: null
    };
  }

  componentDidMount() {
    this.onGetTicketsData(this.state.current, this.state.itemNumbers, this.state.filterText);
    this.props.onGetFormOptions();
  }

  onGetTicketsData = (currentPage, itemsPerPage, filterData) => {
    this.props.onGetRaisedTickets(currentPage, itemsPerPage, filterData);
  };

  onToggleAddTicket = () => {
    this.setState({showAddTicket: !this.state.showAddTicket})
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalTickets / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetTicketsData(this.state.current, this.state.itemNumbers, this.state.filterText)
      });
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetTicketsData(this.state.current, this.state.itemNumbers, this.state.filterText)
      });
    }
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetTicketsData(1, this.state.itemNumbers, this.state.filterText)
    })
  };

  onAddButtonClick = () => {
    this.setState({showAddTicket: true});
  };

  onGetTableColumns = () => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.id}</span>
        }
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
        render: (text, record) => {
          return <div className="gx-d-flex gx-justify-content-start">
          <span>{record.title}</span>
            <span className="gx-ml-2">
              <Tag color="blue">{record.product_name}</Tag>
            </span>
          </div>
        },
      },
      {
        title: 'Assign to',
        dataIndex: 'assignTo',
        key: 'assignTo',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">dummy</span>
        },
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.department_name}</span>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        key: 'Status',
        render: (text, record) => {

          return <Tag color="green" >
            {record.status_name}
          </Tag>
        },
      },
      {
        title: 'Last Activity',
        dataIndex: 'lastActivity',
        key: 'lastActivity',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">Last Activity</span>
        },
      },
    ];
  };

  onPageChange = page => {
    this.setState({current: page}, () => {
      this.onGetTicketsData(this.state.current, this.state.itemNumbers, this.state.filterText)
    });
  };

  onShowItemOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange}>
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };

  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetTicketsData(this.state.current, this.state.itemNumbers, this.state.filterText)
    })
  };

  render() {
    const {selectedRowKeys, filterText, showAddTicket, ticketId} = this.state;
    const {raisedTickets, formOptions} = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedTickets: ids, selectedRowKeys: selectedRowKeys})
      }
    };
    return (
      <div className="gx-main-layout-content">
        {raisedTickets.length > 0 ?
         <div>
            <div className="gx-d-flex gx-justify-content-between">
              <div className="gx-d-flex">
                <Button type="primary" className="gx-btn-lg" onClick={this.onToggleAddTicket}>
                  Raise a Ticket</Button>
              </div>
              <div className="gx-d-flex">
                <Search
                  placeholder="Enter keywords to search Tickets"
                  style={{width: 350}}
                  value={filterText}
                  onChange={this.onFilterTextChange}/>
                <div className="gx-ml-3">
                  {this.onShowItemOptions()}
                </div>
                <ButtonGroup className="gx-ml-3">
                  <Button type="default" onClick={this.onCurrentDecrement}>
                    <i className="icon icon-long-arrow-left"/>
                  </Button>
                  <Button type="default" onClick={this.onCurrentIncrement}>
                    <i className="icon icon-long-arrow-right"/>
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            <Table rowSelection={rowSelection} columns={this.onGetTableColumns()}
                   dataSource={raisedTickets} className="gx-mb-4"
                   pagination={{
                     pageSize: this.state.itemNumbers,
                     current: this.state.current,
                     total: this.props.totalItems,
                     showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                     onChange: this.onPageChange
                   }}/>
          </div> : <div className="gx-main-layout-content">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 700
            }}>
              <div>No records Found</div>
              <h3 className="gx-font-weight-bold gx-my-4">You have not raised any support request</h3>
              <Button type="primary" onClick={this.onToggleAddTicket}>Raise a Ticket</Button>
            </div>
          </div>}
        {showAddTicket ? <RaiseTicketModal ticketId={ticketId}
                                           formOptions={formOptions}
                                           onToggleAddTicket={this.onToggleAddTicket}
                                           showAddTicket={showAddTicket}
                                           onRaiseNewTicket={this.props.onRaiseNewTicket}
        /> : null}
      </div>
    );
  }
}

const mapPropsToState = ({customerDetails}) => {
  const {raisedTickets, totalTickets, formOptions} = customerDetails;
  return {raisedTickets, totalTickets, formOptions};
};

export default connect(mapPropsToState, {onGetRaisedTickets, onGetFormOptions, onRaiseNewTicket})(AllTickets);
