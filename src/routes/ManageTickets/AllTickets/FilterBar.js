import React, {Component} from 'react';
import CustomScrollbars from "../../../util/CustomScrollbars";
import {Avatar, Button, Checkbox, DatePicker, Input, Select} from "antd";
import PropTypes from "prop-types";
import {MEDIA_BASE_URL} from "../../../constants/ActionTypes";

const {Option} = Select;

class FilterBar extends Component {
  state = {
    staffFilterText: "",
    priorityFilterText: "",
    statusFilterText: ""
  };

  onStartDateChange = value => {
    this.props.updateState({startDate: value})
  };

  onEndDateChange = value => {
    this.props.updateState({endDate: value})
  };

  onSelectStaff = checkedList => {
    this.props.updateState({selectedStaff: checkedList})
  };

  onSelectCustomer = checkedList => {
    this.props.updateState({selectedCustomers: checkedList})
  };

  onSelectPriorities = checkedList => {
    this.props.updateState({selectedPriorities: checkedList})
  };

  onSelectStatuses = checkedList => {
    this.props.updateState({selectedStatuses: checkedList})
  };

  onSetArchive = (e) => {
    this.props.updateState({archive: e.target.checked})
  };

  onStaffReset = () => {
    this.props.updateState({selectedStaff: []})
  };

  onCustomerReset = () => {
    this.props.updateState({selectedCustomers: []})
  };

  onPrioritiesReset = () => {
    this.props.updateState({selectedPriorities: []})
  };

  onStatusReset = () => {
    this.props.updateState({selectedStatuses: []})
  };

  handleSearch = (value) => {
    this.props.onSearchCustomers(value)
  };

  handleChange = (value) => {
    this.props.updateState({selectedCustomers: value})
  };

  onFilterStaff = () => {
    return this.props.staffList.filter(staff => {
      const name = staff.first_name + " " + staff.last_name;
      return (name.indexOf(this.state.staffFilterText) !== -1) ?
        staff : null
    })
  };

  render() {
    const {
      endDate, showMoreStaff, selectedStaff, selectedCustomers, selectedPriorities,
      selectedStatuses, startDate, onToggleShowMoreStaff
    } = this.props;

    const {staffFilterText, priorityFilterText, statusFilterText} = this.state
    const staffs = showMoreStaff ? this.onFilterStaff() :
      this.onFilterStaff().length > 5 ? this.onFilterStaff().slice(0, 5) : this.onFilterStaff();
    const customers = this.props.customersList;
    console.log("this.props.priorities", this.props.priorities)
    console.log("this.props.statuses", this.props.priorities)
    const priorities = this.props.priorities.filter(priority => priority.name.toLowerCase().includes(priorityFilterText.toLowerCase()));
    const statuses = this.props.statuses.filter(status => status.name.toLowerCase().includes(statusFilterText.toLowerCase()));
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
                {selectedStaff.length > 0 ? <div className="gx-link" onClick={this.onStaffReset}>
                  Reset</div> : null}
              </div>
              <Input type="text" placeholder="TYpe to search Staff here" value={staffFilterText}
                     onChange={(e) => this.setState({staffFilterText: e.target.value})}/>
              <Checkbox.Group onChange={this.onSelectStaff} value={selectedStaff}>
                {staffs.map(staff => {
                  return <div key={staff.id} className="gx-my-2"><Checkbox value={staff.id}>
                    <span>{staff.avatar ?
                      <Avatar className=" gx-size-30" src={staff.avatar.src}/> :
                      <Avatar className=" gx-size-30"
                              style={{backgroundColor: '#f56a00'}}>{staff.first_name[0].toUpperCase()}</Avatar>}</span>
                    <span className="gx-mx-2">{staff.first_name + " " + staff.last_name}</span>
                    <span>{staff.email}</span>
                  </Checkbox></div>
                })}
              </Checkbox.Group>
              <div>
                {this.onFilterStaff().length > 5 ?
                  <Button type="link" onClick={onToggleShowMoreStaff}>
                    {showMoreStaff ? "View Less" : `${this.onFilterStaff().length - 5} More`}
                  </Button> : null}
              </div>
            </div>
            <div className="gx-mb-4">
              <div className="gx-d-flex gx-justify-content-between">
                <h4>Select Customer</h4>
                {selectedCustomers.length > 0 ? <div className="gx-link" onClick={this.onCustomerReset}>
                  Reset</div> : null}
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
                  return <Option value={customer.id} style={{minHeight: 33}} key={customer.id}><span>{customer.avatar ?
                    <Avatar className=" gx-size-30" src={MEDIA_BASE_URL + customer.avatar.src}/> :
                    <Avatar className=" gx-size-30"
                            style={{backgroundColor: '#f56a00'}}>{customer.first_name[0].toUpperCase()}</Avatar>}</span>
                    <>
                      <span className="gx-mx-2 gx-inline-block">{customer.first_name + " " + customer.last_name}</span>
                      <span>{customer.email}</span>
                    </>
                  </Option>
                })}
              </Select>
            </div>
            <div className="gx-mb-4">
              <div className="gx-d-flex gx-justify-content-between">
                <h4>Priority</h4>
                {selectedPriorities.length > 0 ?
                  <Button type="link" style={{height: 20}} onClick={this.onPrioritiesReset}> Reset</Button> : null}
              </div>
              <Input type="text" placeholder="Search Priority" value={priorityFilterText}
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
              <Input type="text" placeholder="Search Status" value={statusFilterText}
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
