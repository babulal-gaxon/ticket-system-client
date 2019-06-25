import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {
  Avatar,
  Button,
  Checkbox,
  Dropdown,
  Icon,
  Input,
  Menu,
  message,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tag
} from "antd";
import {
  getCustomerId,
  onDeleteCustomers,
  onDisableCustomer,
  onGetCustomersData
} from "../../../appRedux/actions/Customers";
import moment from "moment";
import CustomerDetails from "./CustomerDetails";
import {onGetLabelData} from "../../../appRedux/actions/Labels";
import {onGetCompaniesData} from "../../../appRedux/actions/Companies";
import {connect} from "react-redux";
import InfoView from "../../../components/InfoView";

const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;


class AllCustomers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      selectedRowKeys: [],
      itemNumbers: 10,
      current: 1,
      selectedCustomers: [],
      sideBarActive: false,
      selectedCompanies: [],
      currentCustomer: null,
      currentCustomerCompany: null,
      selectedLabels: [],
      filterStatusActive: false,
      filterStatusDisabled: false
    }
  }
  componentWillMount() {
    this.onGetPaginatedData(this.state.current, this.state.itemNumbers);
    this.props.onGetCompaniesData();
    this.props.onGetLabelData();
  }
  onGetPaginatedData = (currentPage, itemsPerPage) => {
    this.props.onGetCustomersData(currentPage, itemsPerPage);
  };
  onSideBarShow = () => {
    this.setState({sideBarActive: !this.state.sideBarActive})
  };
  onFilterData = () => {
    console.log(" in filter data", this.props.customersList);
    return this.props.customersList.filter(customer => {
      let flag = true;
      const name = customer.first_name + " " + customer.last_name;
      if (this.state.selectedCompanies.indexOf(customer.company.id) !== -1) {
        return customer;
      }
      if (name.indexOf(this.state.filterText) !== -1) {
        return customer;
      }
      // if (flag && this.state.selectedLabels.indexOf(customer.label_id) === -1) {
      //   flag = false;
      // }
      // if (flag && (this.state.filterStatusDisabled && customer.account_status === 1)) {
      //   flag = false;
      // }
      // if (flag && (this.state.filterStatusActive && customer.account_status === 0)) {
      //   flag = false;
      // }
      // if (flag) {
      //   return customer;
      // }
    });
  };
  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value})
  };
  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };
  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers)
    });

  };
  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetPaginatedData(this.state.current, this.state.itemNumbers)
      });
    } else {
      return null;
    }
  };
  onCurrentDecrement = () => {
    if (this.state.current !== 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetPaginatedData(this.state.current, this.state.itemNumbers)
      });
    } else {
      return null;
    }
  };
  onGetCustomersShowOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange} className="gx-mx-2">
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };
  onAddButtonClick = () => {
    this.props.history.push('/customers/add-customers');
    this.props.getCustomerId(0);
  };
  onCustomersRowData = () => {
    return [
      {
        title: 'Customer',
        dataIndex: 'title',
        render: (text, record) => {
          return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
              <Avatar className="gx-mr-3 gx-size-50" src="https://via.placeholder.com/150x150"/>
              <div className="gx-media-body">
                <span className="gx-mb-0 gx-text-capitalize">{record.first_name + " " + record.last_name}</span>
                <div className="gx-mt-1">
                  <Tag color="#fc895f">{record.company.company_name}</Tag>
                </div>
              </div>
            </div>
          )
        }
      },
      {
        title: 'Email',
        dataIndex: 'email',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.email ? record.email : "NA"}</span>
        },
      },
      {
        title: 'Phone no.',
        dataIndex: 'phone',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.phone ? record.phone : "NA"}</span>
        },
      },
      {
        title: 'Labels',
        dataIndex: 'labels',
        render: (text, record) => {
          return (record.labels && record.labels.length > 0) ?
            record.labels.map(label=> {
              return <Tag>{label.name}</Tag>
            }) : "NA"
        },
      },
      {
        title: 'Date Created',
        dataIndex: 'dateCreated',
        render: (text, record) => {
          return <span className="gx-text-grey">{moment(record.created_at).format('LL')}</span>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <span onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}>
            {this.onShowRowDropdown(record.id)}
      </span>
        },
      },
    ];
  };
  onShowRowDropdown = (customerId) => {
    const menu = (
      <Menu>
        <Menu.Item key="2" onClick={() => {
          this.props.getCustomerId(customerId);
          this.props.history.push('/customers/add-customers')
        }}>
          Edit
        </Menu.Item>
        <Menu.Item key="3">
          <Popconfirm
            title="Are you sure to disable this Customer?"
            onConfirm={() => {
              this.onDisableCustomerCall(customerId)
            }}
            okText="Yes"
            cancelText="No">
            Disable
          </Popconfirm>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="4">
          <Popconfirm
            title="Are you sure to delete this Customer?"
            onConfirm={() => {
              this.props.onDeleteCustomers({ids: [customerId]}, this.onDeleteSuccessMessage);
              this.onGetPaginatedData(this.state.current, this.state.itemNumbers);
            }}
            okText="Yes"
            cancelText="No">
            Delete
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <i className="icon icon-ellipse-h"/>
      </Dropdown>
    )
  };
  onDisableCustomerCall = (customerId) => {
    const selectedCustomer = this.props.customersList.find(customer => customer.id === customerId);
    selectedCustomer.account_status = 0;
    this.props.onDisableCustomer(selectedCustomer, this.onCustomerDisableSuccess);
  };
  onDeleteSuccessMessage = () => {
    message.success('The selected Customer(s) has been deleted successfully.');
  };
  onCustomerDisableSuccess = () => {
    message.success('The status of Customer has been changed to Disable successfully.');
  };
  onSelectCustomer = record => {
    const selectedCompany = this.props.companiesList.find(company => company.id === record.company.id);
    this.setState({
      currentCustomer: record,
      currentCustomerCompany: selectedCompany
    })
  };
  onShowBulkDeleteConfirm = () => {
    if (this.state.selectedCustomers.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected Customer(s)?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedCustomers
          };
          this.props.onDeleteCustomers(obj, this.onDeleteSuccessMessage);
          this.onGetPaginatedData(this.state.currentPage, this.state.itemNumbers);
          this.setState({selectedRowKeys: [], selectedCustomers: []});
        }
      })
    } else {
      confirm({
        title: "Please Select Customer(s) first",
      })
    }
  };
  onSelectOption = () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">
          Archive
        </Menu.Item>
        <Menu.Item key="2" onClick={this.onShowBulkDeleteConfirm}>
          Delete
        </Menu.Item>
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Bulk Actions <Icon type="down"/>
      </Button>
    </Dropdown>
  };
  onPageChange = page => {
    this.setState({current: page}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers)
    });
  };
  onBackToList = () => {
    this.setState({currentCustomer: null})
  }
  onGetSidebar = () => {
    return <div className="gx-main-layout-sidenav gx-d-none gx-d-lg-flex">
      <div className="gx-main-layout-side">
        <div className="gx-main-layout-side-header">
          <h4 className="gx-font-weight-medium">Filter Tickets</h4>
        </div>
        <div className="gx-main-layout-nav">
          <div className="gx-mr-5 gx-mb-4"><label>Filter By Company</label>
            <span className="gx-ml-5">Reset</span>
          </div>
          <div>
            <Checkbox.Group onChange={this.onSelectCompanies} value={this.state.selectedCompanies}>
              {this.props.companiesList.map(company => {
                return <div><Checkbox value={company.id}>{company.company_name}</Checkbox></div>
              })}
            </Checkbox.Group>
          </div>
          <div className="gx-mt-5">
            <div className="gx-mb-3">Filter by labels</div>
            <Select
              mode="multiple"
              style={{width: '100%'}}
              placeholder="Please select Labels"
              value={this.state.selectedLabels}
              onSelect={this.onLabelSelect}
              onDeselect={this.onLabelRemove}>
              {this.onLabelSelectOption()}
            </Select>
          </div>
          <div className="gx-mt-5">
            <div className="gx-mb-3">Status</div>
            <Checkbox onChange={this.onFilterDisabledCustomers}>Disabled</Checkbox>
            <Checkbox onChange={this.onFilterActiveCustomers}>Active</Checkbox>
          </div>
        </div>
      </div>
    </div>
  };
  onLabelSelectOption = () => {
    console.log("label list", this.props.labelList)
    const labelOptions = [];
    this.props.labelList.map(label => {
      return labelOptions.push(<Option value={label.id}>{label.name}</Option>)
    });
    return labelOptions;
  };
  onLabelSelect = (id) => {
    this.setState({selectedLabels: this.state.selectedLabels.concat(id)})
  };
  onLabelRemove = (value) => {
    const updatedLabels = this.state.selectedLabels.filter(label => label !== value)
    this.setState({selectedLabels: updatedLabels})
  };
  onSelectCompanies = checkedList => {
    this.setState({selectedCompanies: checkedList})
  };
  onFilterActiveCustomers = event => {
    if (event.target.checked) {
      this.setState({filterStatusActive: true})
    } else {
      this.setState({filterStatusActive: false})
    }
  };
  onFilterDisabledCustomers = event => {
    if (event.target.checked) {
      this.setState({filterStatusDisabled: true})
    } else {
      this.setState({filterStatusDisabled: false})
    }
  };

  render() {
    console.log("companies data", this.state.selectedCompanies);
    console.log("total customers", this.props.customersList)
    const customers = this.onFilterData();
    // const customers= this.props.customersList;
    const selectedRowKeys = this.state.selectedRowKeys;
    let ids;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedCustomers: ids, selectedRowKeys: selectedRowKeys})
      }
    };
    return (
      <div className={`gx-main-content ${this.state.sideBarActive ? "gx-main-layout-has-sider" : ""}`}>
        {this.state.currentCustomer === null ? <Widget styleName="gx-card-filter">
          <h4>Customers</h4>
          <p className="gx-text-grey">Customers</p>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              <Button type="primary" onClick={this.onAddButtonClick} style={{width: 200}}>Add New
                Customers
              </Button>
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder="Search Customers Here"
                value={this.state.filterText}
                onChange={this.onFilterTextChange}
                style={{width: 200}}/>
              {this.onGetCustomersShowOptions()}
              <Button.Group>
                <Button type="default" onClick={this.onCurrentDecrement}>
                  <i className="icon icon-long-arrow-left"/>
                </Button>
                <Button type="default" onClick={this.onCurrentIncrement}>
                  <i className="icon icon-long-arrow-right"/>
                </Button>
              </Button.Group>
              <Button type="default" className="gx-filter-btn gx-filter-btn-rtl-round" onClick={this.onSideBarShow}>
                <i className="icon icon-filter"/>
              </Button>
            </div>
          </div>
          <Table key={Math.random()} rowSelection={rowSelection} columns={this.onCustomersRowData()}
                 dataSource={customers}
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.current,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}
                 className="gx-table-responsive"
                 onRow={(record) => ({
                   onClick: () => this.onSelectCustomer(record)
                 })}/>
        </Widget> : <CustomerDetails getCustomerId={this.props.getCustomerId}
                                     currentCustomer={this.state.currentCustomer}
                                     history={this.props.history}
                                     onBackToList={this.onBackToList}
          currentCustomerCompany={this.state.currentCustomerCompany}
        />}
        {this.state.sideBarActive ? this.onGetSidebar() : null}
        <InfoView/>
      </div>
    )
  }
}

const mapPropsToState = ({customers, companies, labelsList}) => {
  const {customersList, totalItems} = customers;
  const {companiesList} = companies;
  const {labelList} = labelsList;
  return {customersList, totalItems, companiesList, labelList};
};
export default connect(mapPropsToState, {
  onGetCustomersData,
  onDeleteCustomers,
  getCustomerId,
  onDisableCustomer,
  onGetCompaniesData,
  onGetLabelData
})(AllCustomers);