import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Avatar, Button, Dropdown, Icon, Input, Menu, message, Modal, Popconfirm, Select, Table, Tag} from "antd";
import {connect} from "react-redux";
import {
  getCustomerId,
  onDeleteCustomers,
  onDisableCustomer,
  onGetCustomersData
} from "../../../appRedux/actions/Customers";
import InfoView from "../../../components/InfoView";
import moment from "moment";

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
      selectedCustomers: []
    }
  }

  componentWillMount() {
    this.onGetPaginatedData(this.state.current, this.state.itemNumbers);
  }

  onGetPaginatedData = (currentPage, itemsPerPage) => {
    this.props.onGetCustomersData(currentPage, itemsPerPage);
  };
  onFilterData = () => {
    return this.props.customersList.filter(customer => {
      const name = customer.first_name + " " + customer.last_name;
      if (name.indexOf(this.state.filterText) !== -1) {
        return customer;
      }
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
                  <Tag color="#fc895f">{record.country_name}</Tag>
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
          return <span className="gx-text-grey">{record.mobile ? record.mobile : "NA"}</span>
        },
      },
      {
        title: 'Labels',
        dataIndex: 'labels',
        render: (text, record) => {
          return <span
            className="gx-text-grey">{(record.labels && record.labels.length) > 0 ? record.labels : "NA"}</span>
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
    console.log("customerId", customerId);
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
        title: "Please Select Staffs first",
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

  render() {
    const customers = this.onFilterData();
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
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
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
                placeholder="Search Customers Hers"
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
                 className="gx-table-responsive"/>
        </Widget>
        <InfoView/>
      </div>
    )
  }
}

const mapPropsToState = ({customers}) => {
  const {customersList, totalItems} = customers;
  return {customersList, totalItems};
};
export default connect(mapPropsToState, {
  onGetCustomersData,
  onDeleteCustomers,
  getCustomerId,
  onDisableCustomer
})(AllCustomers);