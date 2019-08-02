import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Select, Table} from "antd";
import {
  onChangeCustomerStatus,
  onDeleteCustomers,
  onGetCustomerFilterOptions,
  onGetCustomersData,
  onResetPassword,
  setCurrentCustomer
} from "../../../appRedux/actions/Customers";
import {connect} from "react-redux";
import ResetCustomerPassword from "./ResetCustomerPassword";
import Permissions from "../../../util/Permissions";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import FilterBar from "./FilterBar";
import CustomersRow from "./CustomerRow";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;


class AllCustomers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyFilterText: "",
      showMoreCompany: false,
      selectedCompanies: [],
      status: [],
      selectedLabels: [],
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
    const {itemNumbers, selectedCompanies, selectedLabels, status} = this.state;
    this.setState({filterText: e.target.value}, () => {
      this.onGetPaginatedData(1, itemNumbers, this.state.filterText, selectedCompanies, selectedLabels, status, true)
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

  onChangeCompanyFilterText = (e) => {
    this.setState({companyFilterText: e.target.value})
  };

  onShowMoreCompanyToggle = (e) => {
    this.setState({showMoreCompany: !this.state.showMoreCompany})
  };

  updateState = (state) => {
    this.setState({...state}, () => {
      const {selectedLabels, status, current, itemNumbers, filterText, selectedCompanies} = this.state;
      this.onGetPaginatedData(current, itemNumbers, filterText, selectedCompanies, selectedLabels, status, true)
    })
  };

  onAddButtonClick = () => {
    this.props.setCurrentCustomer(null);
    this.props.history.push('/customers/add-customers');
  };

  onDisableCustomerStatus = (customerId) => {
    this.props.onChangeCustomerStatus({ids: [customerId]}, 0, true);
  };

  onEnableCustomerStatus = (customerId) => {
    this.props.onChangeCustomerStatus({ids: [customerId]}, 1, true);
  };

  onSelectCustomer = record => {
    this.props.history.push(`/customers/customer-detail?id=${record.id}`)
  };

  onShowBulkDeleteConfirm = () => {
    const {messages} = this.props.intl;
    const {filterText, itemNumbers, selectedCompanies, selectedLabels, status, current, selectedCustomers} = this.state;
    if (selectedCustomers.length !== 0) {
      confirm({
        title: messages["customers.message.delete"],
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
      Modal.info({
        title: messages["customers.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.onShowBulkDeleteConfirm}>
          <IntlMessages id="common.archive"/>
        </Menu.Item>
        <Menu.Item key="2" onClick={this.onShowBulkDeleteConfirm}>
          <IntlMessages id="common.delete"/>
        </Menu.Item>
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <IntlMessages id="common.bulkActions"/> <Icon type="down"/>
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
    const {selectedRowKeys, resetPasswordModal, sideBarActive, filterText, resetPasswordCustomerId, itemNumbers, current, companyFilterText, showMoreCompany, selectedCompanies, status, selectedLabels} = this.state;
    const {messages} = this.props.intl;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedCustomers: ids, selectedRowKeys: selectedRowKeys})
      }
    };
    return (
      <div className={`gx-main-content ${sideBarActive ? "gx-main-layout-has-sider" : ""}`}>
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading"><IntlMessages id="customers.customers"/></h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/customers" className="gx-text-primary"><IntlMessages id="customers.customers"/></Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {Permissions.canCustomerAdd() ?
                <Button type="primary" onClick={this.onAddButtonClick} style={{width: 200}}>
                  <IntlMessages id="customers.addNew"/>
                </Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder={messages["manageTickets.filterBar.searchCustomer"]}
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
          <Table rowKey="id" rowSelection={rowSelection} columns={CustomersRow(this)}
                 dataSource={customersList}
                 loading={updatingContent}
                 pagination={{
                   pageSize: itemNumbers,
                   current: current,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => <div><span>{<IntlMessages id="common.showing"/>}</span>
                     <span>{range[0]}-{range[1]}</span> <span>{<IntlMessages id="common.of"/>} </span>
                     <span>{total}</span> <span>{<IntlMessages id="common.items"/>}</span></div>),
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
        {sideBarActive ?
          <FilterBar companyFilterText={companyFilterText} company={company} labels={labels}
                     showMoreCompany={showMoreCompany} selectedCompanies={selectedCompanies} status={status}
                     selectedLabels={selectedLabels} updateState={this.updateState}
                     onChangeCompanyFilterText={this.onChangeCompanyFilterText}
                     onShowMoreCompanyToggle={this.onShowMoreCompanyToggle}
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
  onChangeCustomerStatus,
  onResetPassword,
  onGetCustomerFilterOptions,
})(injectIntl(AllCustomers));

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
