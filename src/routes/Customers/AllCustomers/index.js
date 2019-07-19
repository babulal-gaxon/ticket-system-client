import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {
  Avatar,
  Breadcrumb,
  Button,
  Checkbox,
  Dropdown,
  Icon,
  Input,
  Menu,
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
  onGetCustomerFilterOptions,
  onGetCustomersData,
  onResetPassword
} from "../../../appRedux/actions/Customers";
import moment from "moment";
import {connect} from "react-redux";
import InfoView from "../../../components/InfoView";
import ResetCustomerPassword from "./ResetCustomerPassword";
import Permissions from "../../../util/Permissions";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

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
      selectedLabels: [],
      companyFilterText: "",
      showMoreCompany: false,
      status: [],
      resetPasswordModal: false,
      resetPasswordCustomerId: null
    }
  }

  componentDidMount() {
    this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText);
    this.props.onGetCustomerFilterOptions();
  }

  onGetPaginatedData = (currentPage, itemsPerPage, filterText, companies, labels, status) => {
    if (Permissions.canCustomerView()) {
      this.props.onGetCustomersData(currentPage, itemsPerPage, filterText, companies, labels, status);
    }
  };

  onSideBarShow = () => {
    this.setState({sideBarActive: !this.state.sideBarActive})
  };

  onFilterTextChange = (e) => {
    const {itemNumbers, selectedCompanies, selectedLabels, status} = this.state;
    this.setState({filterText: e.target.value}, () => {
      this.onGetPaginatedData(1, itemNumbers, this.state.filterText, selectedCompanies, selectedLabels, status)
    })
  };

  onTogglePasswordModal = () => {
    this.setState({resetPasswordModal: !this.state.resetPasswordModal})
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onDropdownChange = (value) => {
    const {selectedCompanies, selectedLabels, status, filterText} = this.state;
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, filterText, selectedCompanies, selectedLabels, status)
    });
  };

  onCurrentIncrement = () => {
    const {filterText, itemNumbers, selectedCompanies, selectedLabels, status} = this.state;
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetPaginatedData(this.state.current, itemNumbers, filterText, selectedCompanies, selectedLabels, status)
      });
    }
  };

  onCurrentDecrement = () => {
    const {filterText, itemNumbers, selectedCompanies, selectedLabels, status} = this.state;
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetPaginatedData(this.state.current, itemNumbers, filterText, selectedCompanies, selectedLabels, status)
      });
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
        {(Permissions.canCustomerEdit()) ?
          <Menu.Item key="2" onClick={() => {
            this.props.getCustomerId(customerId);
            this.props.history.push('/customers/add-customers')
          }}>
            Edit
          </Menu.Item> : null}
        {(Permissions.canCustomerEdit()) ?
          <Menu.Item key="2" onClick={() => {
            this.setState({resetPasswordCustomerId: customerId}, () => {
              this.onTogglePasswordModal()
            })
          }}>
            Reset Password
          </Menu.Item> : null}
        {(Permissions.canCustomerEdit()) ?
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
          </Menu.Item> : null}
        <Menu.Divider/>
        {(Permissions.canCustomerDelete()) ?
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
          </Menu.Item> : null}
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
    this.props.history.push(`/customers/customer-detail?id=${record.id}`)
  };

  onShowBulkDeleteConfirm = () => {
    const {filterText, itemNumbers, selectedCompanies, selectedLabels, status, current, selectedCustomers} = this.state;
    if (selectedCustomers.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected Customer(s)?",
        onOk: () => {
          const obj = {
            ids: selectedCustomers
          };
          this.props.onDeleteCustomers(obj);
          this.onGetPaginatedData(current, itemNumbers, filterText, selectedCompanies, selectedLabels, status);
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
        <Menu.Item key="1" onClick={this.onShowBulkDeleteConfirm}>
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
    const {filterText, itemNumbers, selectedCompanies, selectedLabels, status} = this.state;
    this.setState({current: page}, () => {
      this.onGetPaginatedData(this.state.current, itemNumbers, filterText, selectedCompanies, selectedLabels, status)
    });
  };


  onGetSidebar = () => {
    const {companyFilterText, showMoreCompany, selectedCompanies, status, selectedLabels} = this.state;
    const {company} = this.props;
    const companiesList = showMoreCompany ?
      company.filter(company => company.company_name.indexOf(companyFilterText) !== -1)
      : company.filter(company => company.company_name.indexOf(companyFilterText) !== -1).slice(0, 5);
    return <div className="gx-main-layout-sidenav gx-d-none gx-d-lg-flex">
      <div className="gx-main-layout-side">
        <div className="gx-main-layout-side-header">
          <h4 className="gx-font-weight-medium">Filter Customers</h4>
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
              <Checkbox.Group onChange={this.onSelectCompanies} value={selectedCompanies}>
                {companiesList.map(company => {
                  return <div key={company.id} className="gx-mb-2"><Checkbox
                    value={company.id}>{company.company_name}</Checkbox></div>
                })}
              </Checkbox.Group>
            </div>
            <div>
            <span className="gx-text-primary"
                  onClick={() => this.setState({showMoreCompany: !this.state.showMoreCompany})}>
              {showMoreCompany ? "View Less" : `${this.props.company.length - 5} More`}
            </span>
            </div>
          </div>
          <div className="gx-mt-5">
            <div className="gx-mb-3">Filter by labels</div>
            <Select
              mode="multiple"
              style={{width: '100%'}}
              placeholder="Please select Labels"
              value={selectedLabels}
              onSelect={this.onLabelSelect}
              onDeselect={this.onLabelRemove}>
              {this.onLabelSelectOption()}
            </Select>
          </div>
          <div className="gx-mt-5">
            <div className="gx-mb-3">Status</div>
            <Checkbox.Group onChange={this.onFilterStatusCustomers} value={status}>
              <Checkbox value={0}>Disabled</Checkbox>
              <Checkbox value={1}>Active</Checkbox>
            </Checkbox.Group>
          </div>
        </div>
      </div>
    </div>
  };

  onCompanyReset = () => {
    const {filterText, itemNumbers, selectedLabels, status, current} = this.state;
    this.setState({selectedCompanies: []}, () => {
      this.onGetPaginatedData(current, itemNumbers, filterText, this.state.selectedCompanies, selectedLabels, status)
    })
  };

  onLabelSelectOption = () => {
    const labelOptions = [];
    this.props.labels.map(label => {
      return labelOptions.push(<Option value={label.id} key={label.id}>{label.name}</Option>)
    });
    return labelOptions;
  };

  onLabelSelect = (id) => {
    const {filterText, itemNumbers, selectedCompanies, status, current} = this.state;
    this.setState({selectedLabels: this.state.selectedLabels.concat(id)},
      () => {
        this.onGetPaginatedData(current, itemNumbers, filterText, selectedCompanies, this.state.selectedLabels, status)
      })
  };

  onLabelRemove = (value) => {
    const {filterText, itemNumbers, selectedCompanies, status, current} = this.state;
    const updatedLabels = this.state.selectedLabels.filter(label => label !== value);
    this.setState({selectedLabels: updatedLabels}, () => {
      this.onGetPaginatedData(current, itemNumbers, filterText, selectedCompanies, this.state.selectedLabels, status)
    })
  };

  onSelectCompanies = checkedList => {
    const {filterText, itemNumbers, selectedLabels, status, current} = this.state;
    this.setState({selectedCompanies: checkedList}, () => {
      this.onGetPaginatedData(current, itemNumbers, filterText, this.state.selectedCompanies, selectedLabels, status)
    })
  };

  onFilterStatusCustomers = checkedList => {
    const {filterText, itemNumbers, selectedLabels, selectedCompanies, current} = this.state;
    this.setState({status: checkedList}, () => {
      this.onGetPaginatedData(current, itemNumbers, filterText, selectedCompanies, selectedLabels, this.state.status)
    })
  };

  render() {
    const {customersList} = this.props;
    const {
      selectedRowKeys, resetPasswordModal, sideBarActive, filterText,
      resetPasswordCustomerId, itemNumbers, current
    } = this.state;
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
      <div className={`gx-main-content ${sideBarActive ? "gx-main-layout-has-sider" : ""}`}>
        <Widget styleName="gx-card-filter">
          <h4 className="gx-font-weight-bold">Customers</h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/customers" className="gx-text-primary">Customers</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {Permissions.canCustomerAdd() ?
                <Button type="primary" onClick={this.onAddButtonClick} style={{width: 200}}>
                  Add New Customers
                </Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder="Search Customers Here"
                value={filterText}
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
              {(Permissions.canCustomerView()) ?
                <Button type="default" className="gx-filter-btn gx-filter-btn-rtl-round" onClick={this.onSideBarShow}>
                  <i className="icon icon-filter"/>
                </Button> : null}
            </div>
          </div>
          <Table rowKey="customersData" rowSelection={rowSelection} columns={this.onCustomersRowData()}
                 dataSource={customersList}
                 pagination={{
                   pageSize: itemNumbers,
                   current: current,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}
                 className="gx-table-responsive"
                 onRow={(record) => ({
                   onClick: () => {
                     if (Permissions.canViewCustomerDetail()) {
                       this.onSelectCustomer(record)
                     }
                   }
                 })}/>
        </Widget>
        {sideBarActive ? this.onGetSidebar() : null}
        {resetPasswordModal ?
          <ResetCustomerPassword
            resetPasswordModal={resetPasswordModal}
            onTogglePasswordModal={this.onTogglePasswordModal}
            onResetPassword={this.props.onResetPassword}
            customerId={resetPasswordCustomerId}/> : null}
        <InfoView/>
      </div>
    )
  }
}

const mapPropsToState = ({customers}) => {
  const {customersList, totalItems, labels, company} = customers;
  return {customersList, totalItems, labels, company};
};

export default connect(mapPropsToState, {
  onGetCustomersData,
  onDeleteCustomers,
  getCustomerId,
  onDisableCustomer,
  onResetPassword,
  onGetCustomerFilterOptions,
})(AllCustomers);

AllCustomers.defaultProps = {
  customersList: [],
  totalItems: null,
  labels: [],
  company: []
};

AllCustomers.propTypes = {
  customersList: PropTypes.array,
  totalItems: PropTypes.number,
  labels: PropTypes.array,
  company: PropTypes.array,
};