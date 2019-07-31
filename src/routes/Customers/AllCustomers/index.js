import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {
  Avatar,
  Breadcrumb,
  Button,
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
  onDeleteCustomers,
  onDisableCustomer,
  onGetCustomerFilterOptions,
  onGetCustomersData,
  onResetPassword,
  setCurrentCustomer
} from "../../../appRedux/actions/Customers";
import moment from "moment";
import {connect} from "react-redux";
import ResetCustomerPassword from "./ResetCustomerPassword";
import Permissions from "../../../util/Permissions";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {MEDIA_BASE_URL} from "../../../constants/ActionTypes";
import FilterBar from "./FilterBar";

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
      resetPasswordModal: false,
      resetPasswordCustomerId: null
    }
  }

  componentDidMount() {
    this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText);
    this.props.onGetCustomerFilterOptions();
  }

  onGetPaginatedData = (currentPage, itemsPerPage, filterText, companies, labels, status, updatingContent) => {
    console.log("userPermissions", Permissions.canCustomerView());
    if (Permissions.canCustomerView()) {
      this.props.onGetCustomersData(currentPage, itemsPerPage, filterText, companies, labels, status, updatingContent);
    }
  };

  onSideBarShow = () => {
    this.setState({sideBarActive: !this.state.sideBarActive})
  };

  onFilterTextChange = (e) => {
    const {itemNumbers} = this.state;
    this.setState({filterText: e.target.value}, () => {
      this.onGetPaginatedData(1, itemNumbers, this.state.filterText, [], [], [], true)
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
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, filterText, selectedCompanies, selectedLabels, status, true)
    });
  };

  onCurrentIncrement = () => {
    const {filterText, itemNumbers, selectedCompanies, selectedLabels, status} = this.state;
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetPaginatedData(this.state.current, itemNumbers, filterText, selectedCompanies, selectedLabels, status, true)
      });
    }
  };

  onCurrentDecrement = () => {
    const {filterText, itemNumbers, selectedCompanies, selectedLabels, status} = this.state;
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetPaginatedData(this.state.current, itemNumbers, filterText, selectedCompanies, selectedLabels, status, true)
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
    this.props.setCurrentCustomer(null);
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
                <Avatar className="gx-mr-3 gx-size-50" src={MEDIA_BASE_URL + record.avatar.src}/> :
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
          return <span className="gx-p-2 gx-cursor-pointer" onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}>
            {this.onShowRowDropdown(record)}
      </span>
        },
      },
    ];
  };

  onShowRowDropdown = (currentCustomer) => {
    const menu = (
      <Menu>
        {(Permissions.canCustomerEdit()) ?
          <Menu.Item key="1" onClick={() => {
            this.props.setCurrentCustomer(currentCustomer);
            this.props.history.push('/customers/add-customers')
          }}>
            Edit
          </Menu.Item> : null}
        {(Permissions.canCustomerEdit()) ?
          <Menu.Item key="2" onClick={() => {
            this.setState({resetPasswordCustomerId: currentCustomer.id}, () => {
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
                this.onDisableCustomerCall(currentCustomer.id)
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
                this.props.onDeleteCustomers({ids: [currentCustomer.id]});
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

  onDisableCustomerCall = (currentCustomer) => {
    const selectedCustomer = this.props.customersList.find(customer => customer.id === currentCustomer);
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
          this.onGetPaginatedData(current, itemNumbers, filterText, selectedCompanies, selectedLabels, status, true);
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
      this.onGetPaginatedData(this.state.current, itemNumbers, filterText, selectedCompanies, selectedLabels, status, true)
    });
  };

  render() {
    const {customersList, updatingContent, company, labels} = this.props;
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
          <h4 className="gx-widget-heading">Customers</h4>
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
                placeholder="Search Customers here"
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
          <Table rowKey="id" rowSelection={rowSelection} columns={this.onCustomersRowData()}
                 dataSource={customersList}
                 loading={updatingContent}
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
        {sideBarActive ? <FilterBar context={this}
        /> : null}
        {resetPasswordModal ?
          <ResetCustomerPassword
            resetPasswordModal={resetPasswordModal}
            onTogglePasswordModal={this.onTogglePasswordModal}
            onResetPassword={this.props.onResetPassword}
            currentCustomer={resetPasswordCustomerId}/> : null}
      </div>
    )
  }
}

const mapPropsToState = ({customers, commonData}) => {
  const {customersList, totalItems, labels, company} = customers;
  const {updatingContent} = commonData;
  return {customersList, totalItems, labels, company, updatingContent};
};

export default connect(mapPropsToState, {
  onGetCustomersData,
  onDeleteCustomers,
  setCurrentCustomer,
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
