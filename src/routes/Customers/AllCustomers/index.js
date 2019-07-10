import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Avatar, Button, Checkbox, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table, Tag} from "antd";
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
      filterStatusDisabled: false,
      companyFilterText: "",
      showMoreCompany: false,
      status: []
    }
  }

  componentDidMount() {
    this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText);
    this.props.onGetCompaniesData();
    this.props.onGetLabelData();
  }

  onGetPaginatedData = (currentPage, itemsPerPage, filterText, companies, labels, status) => {
    this.props.onGetCustomersData(currentPage, itemsPerPage, filterText, companies, labels, status);
  };

  onSideBarShow = () => {
    this.setState({
      sideBarActive: !this.state.sideBarActive, selectedLabels: [],
      selectedCompanies: [], filterStatusActive: false, filterStatusDisabled: false
    })
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetPaginatedData(1, this.state.itemNumbers, this.state.filterText)
    })
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText)
    });

  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText)
      });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current !== 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText)
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
    this.props.getCustomerId(null);
    this.props.history.push('/customers/add-customers');
  };

  onCustomersRowData = () => {
    return [
      {
        title: 'Customer',
        dataIndex: 'title',
        key: 'customer',
        render: (text, record) => {
          return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
              {record.avatar ?
                <Avatar className="gx-mr-3 gx-size-50" src={record.avatar.src}/> :
                <Avatar className="gx-mr-3 gx-size-50"
                        style={{backgroundColor: '#f56a00'}}>{record.first_name[0].toUpperCase()}</Avatar>}
              <div className="gx-media-body">
                <span className="gx-mb-0 gx-text-capitalize">{record.first_name + " " + record.last_name}</span>
                <div className="gx-mt-1">
                  <Tag color="#fc895f">{record.company ? record.company.company_name : null}</Tag>
                </div>
              </div>
            </div>
          )
        }
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.email ? record.email : "NA"}</span>
        },
      },
      {
        title: 'Phone no.',
        dataIndex: 'phone',
        key: 'phone',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.phone ? record.phone : "NA"}</span>
        },
      },
      {
        title: 'Labels',
        dataIndex: 'labels',
        key: 'labels',
        render: (text, record) => {
          return (record.labels && record.labels.length > 0) ?
            record.labels.map(label => {
              return <Tag key={label.name}>{label.name}</Tag>
            }) : "NA"
        },
      },
      {
        title: 'Date Created',
        dataIndex: 'dateCreated',
        key: 'dateCreated',
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
              this.props.onDeleteCustomers({ids: [customerId]});
              this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText);
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
    selectedCustomer.status = 0;
    this.props.onDisableCustomer(selectedCustomer);
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
          this.props.onDeleteCustomers(obj);
          this.onGetPaginatedData(this.state.currentPage, this.state.itemNumbers, this.state.filterText);
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
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText)
    });
  };

  onBackToList = () => {
    this.setState({currentCustomer: null})
  };

  onGetSidebar = () => {
    const {companyFilterText, showMoreCompany, selectedCompanies} = this.state;
    const companiesList = showMoreCompany ?
      this.props.companiesList.filter(company => company.company_name.indexOf(companyFilterText) !== -1)
      : this.props.companiesList.filter(company => company.company_name.indexOf(companyFilterText) !== -1).slice(0, 5);
    return <div className="gx-main-layout-sidenav gx-d-none gx-d-lg-flex">
      <div className="gx-main-layout-side">
        <div className="gx-main-layout-side-header">
          <h4 className="gx-font-weight-medium">Filter Tickets</h4>
        </div>
        <div className="gx-main-layout-nav">
          <div>
            <div className="gx-d-flex gx-justify-content-between">
              <label>Filter By Company</label>
              {selectedCompanies.length > 0 ? <span onClick={this.onCompanyReset}>Reset</span> : null}
            </div>
            <Search className="gx-mt-4" value={companyFilterText}
                    onChange={(e) => this.setState({companyFilterText: e.target.value})}/>
            <div className="gx-my-2">
              <Checkbox.Group onChange={this.onSelectCompanies} value={this.state.selectedCompanies}>
                {companiesList.map(company => {
                  return <div key={company.id} className="gx-mb-2"><Checkbox
                    value={company.id}>{company.company_name}</Checkbox></div>
                })}
              </Checkbox.Group>
            </div>
            <div>
            <span className="gx-text-primary"
                  onClick={() => this.setState({showMoreCompany: !this.state.showMoreCompany})}>
              {this.state.showMoreCompany ? "View Less" : `${this.props.companiesList.length - 5} More`}
            </span>
            </div>
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

  onCompanyReset = () => {
    this.setState({selectedCompanies: []})
  };

  onLabelSelectOption = () => {
    const labelOptions = [];
    this.props.labelList.map(label => {
      return labelOptions.push(<Option value={label.id} key={label.id}>{label.name}</Option>)
    });
    return labelOptions;
  };

  onLabelSelect = (id) => {
    this.setState({selectedLabels: this.state.selectedLabels.concat(id)})
  };

  onLabelRemove = (value) => {
    const updatedLabels = this.state.selectedLabels.filter(label => label !== value);
    this.setState({selectedLabels: updatedLabels})
  };

  onSelectCompanies = checkedList => {
    this.setState({selectedCompanies: checkedList}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.selectedCompanies)
    })
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
    const customers = this.props.customersList;
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
        {this.state.currentCustomer === null ?
          <Widget styleName="gx-card-filter">
            <h4>Customers</h4>
            <p className="gx-text-grey">Customers</p>
            <div className="gx-d-flex gx-justify-content-between">
              <div className="gx-d-flex">
                <Button type="primary" onClick={this.onAddButtonClick} style={{width: 200}}>
                  Add New Customers
                </Button>
                <span>{this.onSelectOption()}</span>
              </div>
              <div className="gx-d-flex">
                <Search
                  placeholder="Search Customers Here"
                  value={this.state.filterText}
                  onChange={this.onFilterTextChange}
                  style={{width: 350}}/>
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
            <Table rowKey="customersData" rowSelection={rowSelection} columns={this.onCustomersRowData()}
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