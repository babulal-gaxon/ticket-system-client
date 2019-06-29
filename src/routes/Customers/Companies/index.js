import React, {Component} from 'react';
import {Avatar, Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table} from "antd";
import Widget from "../../../components/Widget";
import {Link} from "react-router-dom";
import AddNewCompany from "./AddNewCompany";
import {connect} from "react-redux";
import {
  onAddNewCompany,
  onAddProfileImage,
  onDeleteCompanies,
  onEditCompany,
  onGetCompaniesData
} from "../../../appRedux/actions/Companies";
import InfoView from "../../../components/InfoView";

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
      companyId: 0,
      showAddNewModal: false
    }
  }

  componentWillMount() {
    this.onGetPaginatedData(this.state.current, this.state.itemNumbers);
  }

  onToggleAddCompany = () => {
    this.setState({showAddNewModal: !this.state.showAddNewModal})
  };

  onGetPaginatedData = (currentPage, itemsPerPage) => {
    this.props.onGetCompaniesData(currentPage, itemsPerPage);
  };

  onFilterData = () => {
    return this.props.companiesList.filter(company => company.company_name.indexOf(this.state.filterText) !== -1);
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

  onGetCompaniesShowOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange} className="gx-mx-2">
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };

  onCompaniesRowData = () => {
    return [
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        render: (text, record) => {
          return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
              {record.avatar ?
                <Avatar className="gx-mr-3 gx-size-80" src={record.avatar.src}/> :
                <Avatar className="gx-mr-3 gx-size-80"
                        style={{backgroundColor: '#f56a00'}}>{record.company_name[0].toUpperCase()}</Avatar>}
              <div className="gx-media-body">
                <span className="gx-mb-0 gx-text-capitalize">{record.company_name}</span>
              </div>
            </div>
          )
        }
      },
      {
        title: 'Website',
        dataIndex: 'website',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.website ? record.website : "NA"}</span>
        },
      },
      {
        title: 'Company Members',
        dataIndex: 'companyMembers',
        render: (text, record) => {
          return <span className="gx-text-grey">
                        <Avatar className="gx-mr-3 gx-size-50" src="https://via.placeholder.com/150x150"/></span>
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

  onShowRowDropdown = (companyId) => {
    const menu = (
      <Menu>
        <Menu.Item key="2" onClick={() => this.onEditCompanyOption(companyId)}>
          Edit
        </Menu.Item>
        <Menu.Item key="4">
          <Popconfirm
            title="Are you sure to delete this Company?"
            onConfirm={() => {
              this.props.onDeleteCompanies({ids: [companyId]},
                this.props.onGetCompaniesData, this.state.current, this.state.itemNumbers);
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

  onShowBulkDeleteConfirm = () => {
    if (this.state.selectedCompanies.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected Company(s)?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedCompanies
          };
          this.props.onDeleteCompanies(obj,
            this.props.onGetCompaniesData, this.state.current, this.state.itemNumbers);
          this.onGetPaginatedData(this.state.currentPage, this.state.itemNumbers);
          this.setState({selectedRowKeys: [], selectedCustomers: []});
        }
      })
    } else {
      confirm({
        title: "Please Select Company(s) first",
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

  onAddButtonClick = () => {
    this.setState({companyId: 0, showAddNewModal: true})
  };

  onEditCompanyOption = (id) => {
    this.setState({companyId: id, showAddNewModal: true})
  };

  render() {
    const companiesList = this.onFilterData();
    const selectedRowKeys = this.state.selectedRowKeys;
    let ids;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedCompanies: ids, selectedRowKeys: selectedRowKeys})
      }
    };

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4>Companies</h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/customers">Customers</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/customers/companies">Companies</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              <Button type="primary" onClick={this.onAddButtonClick} style={{width: 200}}>
                Add New
              </Button>
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder="Search Companies here"
                style={{width: 200}}
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
          <Table rowSelection={rowSelection} columns={this.onCompaniesRowData()}
                 dataSource={companiesList} className="gx-mb-4"
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
                         companyId={this.state.companyId}
                         onEditCompany={this.props.onEditCompany}
                         companiesList={companiesList}
                         onAddProfileImage={this.props.onAddProfileImage}
                         companyLogoId={this.props.companyLogoId}
          /> : null}
        <InfoView/>
      </div>
    )
  }
}

const mapStateToProps = ({companies}) => {
  const {companiesList, totalItems, companyLogoId} = companies;
  return {companiesList, totalItems, companyLogoId};
};

export default connect(mapStateToProps, {
  onGetCompaniesData,
  onAddNewCompany,
  onEditCompany,
  onDeleteCompanies,
  onAddProfileImage
})(Companies);