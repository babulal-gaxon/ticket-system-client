import React, {Component} from 'react';
import CustomScrollbars from "../../../util/CustomScrollbars";
import {Avatar, Button, Checkbox, DatePicker, Input, Select} from "antd";
import PropTypes from "prop-types";

const {Option} = Select;

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      selectedStaff: [],
      selectedCustomers: [],
      selectedPriorities: [],
      selectedStatuses: [],
      staffFilterText: "",
      priorityFilterText: "",
      statusFilterText: "",
      showMoreStaff: false,
      archive: false
    }
  }

  onToggleShowMoreStaff = () => {
    this.setState({showMoreStaff: !this.state.showMoreStaff});
  };

  onToggleShowMoreCustomer = () => {
    this.setState({showMoreCustomer: !this.state.showMoreCustomer});
  };

  onStartDateChange = value => {
    const {endDate, selectedStaff, selectedCustomers, selectedPriorities, selectedStatuses, archive} = this.state;
    const {current, itemNumbers, filterText, sortParam} = this.props;
    this.setState({startDate: value}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, sortParam, this.state.startDate, endDate, selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, archive)
    });
  };

  onEndDateChange = value => {
    const {startDate, selectedStaff, selectedCustomers, selectedPriorities, selectedStatuses, archive} = this.state;
    const {current, itemNumbers, filterText, sortParam} = this.props;
    this.setState({endDate: value}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, sortParam, startDate, this.state.endDate, selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, archive)
    });
  };

  onSelectStaff = checkedList => {
    const {endDate, startDate, selectedCustomers, selectedPriorities, selectedStatuses, archive} = this.state;
    const {current, itemNumbers, filterText, sortParam} = this.props;
    this.setState({selectedStaff: checkedList}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, sortParam, startDate, endDate, this.state.selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, archive)
    });
  };

  onSelectCustomer = checkedList => {
    const {endDate, selectedStaff, startDate, selectedPriorities, selectedStatuses, archive} = this.state;
    const {current, itemNumbers, filterText, sortParam} = this.props;
    this.setState({selectedCustomers: checkedList}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, sortParam, startDate, endDate, selectedStaff,
        this.state.selectedCustomers, selectedPriorities, selectedStatuses, archive)
    });
  };

  onSelectPriorities = checkedList => {
    const {endDate, selectedStaff, selectedCustomers, startDate, selectedStatuses, archive} = this.state;
    const {current, itemNumbers, filterText, sortParam} = this.props;
    this.setState({selectedPriorities: checkedList}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, sortParam, startDate, endDate, selectedStaff,
        selectedCustomers, this.state.selectedPriorities, selectedStatuses, archive)
    });
  };

  onSelectStatuses = checkedList => {
    const {endDate, selectedStaff, selectedCustomers, selectedPriorities, startDate, archive} = this.state;
    const {current, itemNumbers, filterText, sortParam} = this.props;
    this.setState({selectedStatuses: checkedList}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, sortParam, startDate, endDate, selectedStaff,
        selectedCustomers, selectedPriorities, this.state.selectedStatuses, archive)
    });
  };

  onSetArchive = (e) => {
    const {endDate, selectedStaff, selectedCustomers, selectedPriorities, selectedStatuses, startDate} = this.state;
    const {current, itemNumbers, filterText, sortParam} = this.props;
    this.setState({archive: e.target.checked}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, sortParam, startDate, endDate, selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, this.state.archive)
    });
  };

  onStaffReset = () => {
    const {endDate, selectedCustomers, selectedPriorities, selectedStatuses, startDate, archive} = this.state;
    const {current, itemNumbers, filterText, sortParam} = this.props;
    this.setState({selectedStaff: []}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, sortParam, startDate, endDate,
        this.state.selectedStaff, selectedCustomers, selectedPriorities, selectedStatuses, archive)
    })
  };

  onCustomerReset = () => {
    const {endDate, selectedPriorities, selectedStaff, selectedStatuses, startDate, archive} = this.state;
    const {current, itemNumbers, filterText, sortParam} = this.props;
    this.setState({selectedCustomers: []}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, sortParam, startDate, endDate,
        selectedStaff, this.state.selectedCustomers, selectedPriorities, selectedStatuses, archive)
    })
  };

  onPrioritiesReset = () => {
    const {endDate, selectedCustomers, selectedStaff, selectedStatuses, startDate, archive} = this.state;
    const {current, itemNumbers, filterText, sortParam} = this.props;
    this.setState({selectedPriorities: []}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, sortParam, startDate, endDate,
        selectedStaff, selectedCustomers, this.state.selectedPriorities, selectedStatuses, archive)
    })
  };

  onStatusReset = () => {
    const {endDate, selectedCustomers, selectedStaff, selectedPriorities, startDate, archive} = this.state;
    const {current, itemNumbers, filterText, sortParam} = this.props;
    this.setState({selectedStatuses: []}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, sortParam, startDate, endDate,
        selectedStaff, selectedCustomers, selectedPriorities, this.state.selectedStatuses, archive)
    })
  };

  handleSearch = (value) => {
    this.props.onGetCustomersData(null, null, value)
  };

  handleChange = (value) => {
    const {endDate, selectedStatuses, selectedStaff, selectedPriorities, startDate, archive} = this.state;
    const {current, itemNumbers, filterText, sortParam} = this.props;
    this.setState({selectedCustomers: value}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, sortParam, startDate, endDate,
        selectedStaff, this.state.selectedCustomers, selectedPriorities, selectedStatuses, archive)
    });
  };

  render() {
    const {
      endDate, showMoreStaff, selectedStaff, selectedCustomers, selectedPriorities,
      selectedStatuses, startDate, staffFilterText,
      priorityFilterText, statusFilterText
    } = this.state;
    const staffs = showMoreStaff ?
      this.props.staffList.filter(staff => staff.first_name.indexOf(staffFilterText) !== -1)
      : this.props.staffList.filter(staff => staff.first_name.indexOf(staffFilterText) !== -1).slice(0, 5);
    const customers = this.props.customersList;
    const priorities = this.props.priorities.filter(priority => priority.name.indexOf(priorityFilterText) !== -1);
    const statuses = this.props.statuses.filter(status => status.name.indexOf(statusFilterText) !== -1);
    return (
      <div className="gx-main-layout-sidenav gx-d-none gx-d-lg-flex">
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <div className="gx-main-layout-side">
            <div className="gx-main-layout-side-header">
              <h4 className="gx-font-weight-medium">Filter Tickets</h4>
            </div>
            <div className="gx-main-layout-nav">
              <label>Filter By Date</label>
              <div>
                <DatePicker
                  value={startDate}
                  placeholder="Select"
                  onChange={this.onStartDateChange}
                  className="gx-my-3"
                  style={{width: "100%"}}
                  format='YYYY/MM/DD'/>
                <DatePicker
                  value={endDate}
                  placeholder="Updated"
                  onChange={this.onEndDateChange}
                  style={{width: "100%"}}/>
              </div>
            </div>
            <Checkbox className="gx-my-4" onChange={this.onSetArchive}>
              Show Archived Tickets
            </Checkbox>
            <div className="gx-mb-4">
              <div className="gx-d-flex gx-justify-content-between">
                <h4>Filter By Staff</h4>
                {selectedStaff.length > 0 ? <Button type="link" onClick={this.onStaffReset}>
                  Reset</Button> : null}
              </div>
              <Input type="text" value={staffFilterText}
                     onChange={(e) => this.setState({staffFilterText: e.target.value})}/>
              <Checkbox.Group onChange={this.onSelectStaff} value={selectedStaff}>
                {staffs.map(staff => {
                  return <div key={staff.id} className="gx-my-2"><Checkbox value={staff.id}>
                    {staff.first_name + " " + staff.last_name}</Checkbox></div>
                })}
              </Checkbox.Group>
              <div>
                <Button type="link" onClick={this.onToggleShowMoreStaff}>
                  {showMoreStaff ? "View Less" : `${this.props.staffList.length - 5} More`}
                </Button>
              </div>
            </div>
            <div className="gx-mb-4">
              <div className="gx-d-flex gx-justify-content-between">
                <h4>Select Customer</h4>
                {selectedCustomers.length > 0 ? <Button type="link" onClick={this.onCustomerReset}>
                  Reset</Button> : null}
              </div>
              <Select
                style={{width: "100%"}}
                mode="multiple"
                showSearch
                placeholder="Type to search Customers"
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
              >
                {customers.map(customer => {
                  return <Option value={customer.id} key={customer.id}><span>{customer.avatar ?
                    <Avatar className=" gx-size-30" src={customer.avatar.src}/> :
                    <Avatar className=" gx-size-30"
                            style={{backgroundColor: '#f56a00'}}>{customer.first_name[0].toUpperCase()}</Avatar>}</span>
                    <span className="gx-mx-2">{customer.first_name + " " + customer.last_name}</span>
                    <span>{customer.email}</span></Option>
                })}
              </Select>
            </div>
            <div className="gx-mb-4">
              <div className="gx-d-flex gx-justify-content-between">
                <h4>Priority</h4>
                {selectedPriorities.length > 0 ?
                  <Button type="link" onClick={this.onPrioritiesReset}> Reset</Button> : null}
              </div>
              <Input type="text" value={priorityFilterText}
                     onChange={(e) => this.setState({priorityFilterText: e.target.value})}/>
              <Checkbox.Group onChange={this.onSelectPriorities} value={selectedPriorities}>
                {priorities.map(priority => {
                  return <div className="gx-my-2" key={priority.id}>
                    <Checkbox value={priority.id}>{priority.name}</Checkbox>
                  </div>
                })}
              </Checkbox.Group>
            </div>
            <div className="gx-mb-4">
              <div className="gx-d-flex gx-justify-content-between">
                <h4>Status</h4>
                {selectedStatuses.length > 0 ? <Button type="link" onClick={this.onStatusReset}> Reset</Button> : null}
              </div>
              <Input type="text" value={statusFilterText}
                     onChange={(e) => this.setState({statusFilterText: e.target.value})}/>
              <Checkbox.Group onChange={this.onSelectStatuses} value={selectedStatuses}>
                {statuses.map(status => {
                  return <div className="gx-my-2" key={status.id}>
                    <Checkbox value={status.id}>{status.name}</Checkbox>
                  </div>
                })}
              </Checkbox.Group>
            </div>

          </div>
        </CustomScrollbars>
      </div>
    );
  }
}

export default FilterBar;

FilterBar.defaultProps = {
  current: 1,
  itemNumbers: 10,
  filterText: "",
  sortParam: "",
  staffList: [],
  customersList: [],
  priorities: [],
  statuses: []
};

FilterBar.propTypes = {
  current: PropTypes.number,
  itemNumbers: PropTypes.number,
  filterText: PropTypes.string,
  sortParam: PropTypes.string,
  staffList: PropTypes.array,
  customersList: PropTypes.array,
  priorities: PropTypes.array,
  statuses: PropTypes.array
};