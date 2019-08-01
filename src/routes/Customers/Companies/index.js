import React, {Component} from 'react';
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Select, Table} from "antd";
import AddNewCompany from "./AddNewCompany";
import {
  onAddNewCompany,
  onDeleteCompanies,
  onEditCompany,
  onGetCompaniesData
} from "../../../appRedux/actions/Companies";
import Widget from "../../../components/Widget";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {fetchError, fetchStart, fetchSuccess} from "../../../appRedux/actions";
import Permissions from "../../../util/Permissions";
import CompaniesRow from "./CompanyRow";

const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;
const ButtonGroup = Button.Group;

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      selectedRowKeys: [],
      itemNumbers: 10,
      current: 1,
      selectedCompanies: [],
      currentCompany: null,
      showAddNewModal: false
    };
    this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText);
  }

  onToggleAddCompany = () => {
    this.setState({showAddNewModal: !this.state.showAddNewModal})
  };

  onGetPaginatedData = (currentPage, itemsPerPage, filterText, updatingContent) => {
    if (Permissions.canCompanyView()) {
      this.props.onGetCompaniesData(currentPage, itemsPerPage, filterText, updatingContent);
    }
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetPaginatedData(1, this.state.itemNumbers, this.state.filterText, true);
    })
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
    });
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
      });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current !== 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
      });
    } else {
      return null;
    }
  };

  onGetCompaniesShowOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange} className="gx-mx-2">
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };

  onShowBulkDeleteConfirm = () => {
    if (this.state.selectedCompanies.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected Company(s)?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedCompanies
          };
          this.props.onDeleteCompanies(obj);
          this.onGetPaginatedData(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true);
          this.setState({selectedRowKeys: [], selectedCustomers: []});
        }
      })
    } else {
      Modal.info({
        title: "Please Select Company(s) first",
        onOk() {},
      });
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {(Permissions.canCompanyDelete()) ?
          <Menu.Item key="1" onClick={this.onShowBulkDeleteConfirm}>
            Archive
          </Menu.Item> : null}
        {(Permissions.canCompanyDelete()) ?
          <Menu.Item key="2" onClick={this.onShowBulkDeleteConfirm}>
            Delete
          </Menu.Item> : null}
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
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
    });
  };

  onAddButtonClick = () => {
    this.setState({currentCompany: null, showAddNewModal: true})
  };

  onEditCompanyOption = (company) => {
    this.setState({currentCompany: company, showAddNewModal: true})
  };

  render() {
    const companiesList = this.props.companiesList;
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedCompanies: ids, selectedRowKeys: selectedRowKeys})
      }
    };

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading">Companies</h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/customers">Customers</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/customers/companies" className="gx-text-primary">Companies</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {(Permissions.canCompanyAdd()) ?
                <Button type="primary" onClick={this.onAddButtonClick} style={{width: 200}}>
                  Add New
                </Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder="Search Companies here"
                style={{width: 350}}
                value={this.state.filterText}
                onChange={this.onFilterTextChange}/>
              <div className="gx-ml-3">
                {this.onGetCompaniesShowOptions()}
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
          <Table rowKey="id" className="gx-mb-4" rowSelection={rowSelection}
                 columns={CompaniesRow(this)}
                 dataSource={companiesList}
                 loading={this.props.updatingContent}
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.current,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}/>
        </Widget>
        {this.state.showAddNewModal ?
          <AddNewCompany showAddNewModal={this.state.showAddNewModal}
                         onToggleAddCompany={this.onToggleAddCompany}
                         onAddNewCompany={this.props.onAddNewCompany}
                         currentCompany={this.state.currentCompany}
                         onEditCompany={this.props.onEditCompany}
                         companiesList={companiesList}
                         fetchSuccess={this.props.fetchSuccess}
                         fetchStart={this.props.fetchStart}
                         fetchError={this.props.fetchError}
          /> : null}
      </div>
    )
  }
}

const mapStateToProps = ({companies, commonData}) => {
  const {companiesList, totalItems} = companies;
  const {updatingContent} = commonData;
  return {companiesList, totalItems, updatingContent};
};

export default connect(mapStateToProps, {
  onGetCompaniesData,
  onAddNewCompany,
  onEditCompany,
  onDeleteCompanies,
  fetchSuccess,
  fetchStart,
  fetchError
})(Companies);
