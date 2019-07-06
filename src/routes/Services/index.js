import React, {Component} from 'react';
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table, Tag} from "antd";
import Widget from "../../components/Widget";
import {Link} from "react-router-dom";
import InfoView from "../../components/InfoView";
import AddNewService from "./AddNewService";
import {connect} from "react-redux";
import {
  onAddService,
  onBulkActiveServices,
  onBulkDisableServices,
  onDeleteServices,
  onEditService,
  onGetServicesList
} from "../../appRedux/actions/Services";
import PropTypes from "prop-types";
import Permissions from "../../util/Permissions";

const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      serviceId: 0,
      filterText: "",
      itemNumbers: 10,
      currentPage: 1,
      showAddModal: false,
      selectedServices: []
    };
    this.onGetServicesData(this.state.currentPage, this.state.itemNumbers, this.state.filterText);
  };

  onGetServicesData = (currentPage, itemNumbers, searchText) => {
    if (Permissions.canServiceView()) {
      this.props.onGetServicesList(currentPage, itemNumbers, searchText);
    }
  };

  onToggleAddService = () => {
    this.setState({showAddModal: !this.state.showAddModal})
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.currentPage < pages) {
      this.setState({currentPage: this.state.currentPage + 1}, () => {
        this.onGetServicesData(this.state.currentPage, this.state.itemNumbers, this.state.filterText)
      });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.currentPage > 1) {
      this.setState({currentPage: this.state.currentPage - 1}, () => {
        this.onGetServicesData(this.state.currentPage, this.state.itemNumbers, this.state.filterText)
      });
    } else {
      return null;
    }
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetServicesData(1, this.state.itemNumbers, this.state.filterText)
    });
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onAddButtonClick = () => {
    this.setState({serviceId: 0, showAddModal: true});
  };

  onEditIconClick = (id) => {
    this.setState({serviceId: id, showAddModal: true});
  };

  onShowBulkActiveConfirm = () => {
    if (this.state.selectedServices.length !== 0) {
      confirm({
        title: "Are you sure to change the Support status of selected Service(s) to Enable?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedServices
          };
          this.props.onBulkActiveServices(obj);
          this.setState({selectedRowKeys: [], selectedServices: []})
        },
      })
    } else {
      confirm({
        title: "Please Select Service(s) first",
      })
    }
  };

  onShowBulkDisableConfirm = () => {
    if (this.state.selectedServices.length !== 0) {
      confirm({
        title: "Are you sure to change the Support status of selected Services(s) to Disabled?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedServices
          };
          this.props.onBulkDisableServices(obj);
          this.setState({selectedRowKeys: [], selectedServices: []})
        },
      })
    } else {
      confirm({
        title: "Please Select Service(s) first",
      })
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {(Permissions.canServiceEdit()) ?
          <Menu.Item key="1" onClick={this.onShowBulkActiveConfirm}>
            Active
          </Menu.Item> : null}
        {(Permissions.canServiceEdit()) ?
          <Menu.Item key="2" onClick={this.onShowBulkDisableConfirm}>
            Disable
          </Menu.Item> : null}
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Bulk Actions <Icon type="down"/>
      </Button>
    </Dropdown>
  };

  onGetTableColumns = () => {
    return [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.title}</span>
        },
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc === null ? "NA" : record.desc}</span>
        },
      },
      {
        title: 'Support',
        dataIndex: 'support_enable',
        key: 'Support',
        render: (text, record) => {
          return <Tag color={record.support_enable === 1 ? "green" : "red"}>
            {record.support_enable === 1 ? "Enabled" : "Disabled"}
          </Tag>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <span>  {(Permissions.canServiceEdit()) ?
            <i className="icon icon-edit gx-mr-3" onClick={() => this.onEditIconClick(record.id)}/> : null}
            {(Permissions.canServiceDelete()) ? this.onDeletePopUp(record.id) : null}
          </span>
        },
      },
    ];
  };

  onDeletePopUp = (recordId) => {
    return (
      <Popconfirm
        title="Are you sure to delete this Service?"
        onConfirm={() => {
          this.props.onDeleteServices(recordId);
        }}
        okText="Yes"
        cancelText="No">
        <i className="icon icon-trash"/>
      </Popconfirm>
    )
  };

  onShowItemOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange}>
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };

  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, currentPage: 1}, () => {
      this.onGetServicesData(this.state.currentPage, this.state.itemNumbers, this.state.filterText)
    })
  };

  onPageChange = page => {
    this.setState({currentPage: page}, () => {
      this.onGetServicesData(this.state.currentPage, this.state.itemNumbers, this.state.filterText)
    });
  };

  render() {
    const selectedRowKeys = this.state.selectedRowKeys;
    const servicesList = this.props.servicesList;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedServices: ids, selectedRowKeys: selectedRowKeys})
      }
    };

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-font-weight-bold">Services</h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item className="gx-text-primary">
              <Link to="/services">Services</Link></Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {(Permissions.canServiceAdd()) ?
                <Button type="primary" className="gx-btn-lg" onClick={this.onAddButtonClick}>
                  Add New Service
                </Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                style={{width: 350}}
                placeholder=" Enter keywords to search Services"
                value={this.state.filterText}
                onChange={this.onFilterTextChange}/>
              <div className="gx-ml-3">
                {this.onShowItemOptions()}
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
          <Table rowKey="services" rowSelection={rowSelection} columns={this.onGetTableColumns()}
                 dataSource={servicesList}
                 className="gx-mb-4"
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.currentPage,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}/>
          <div className="gx-d-flex gx-flex-row">
          </div>
        </Widget>
        <InfoView/>
        {this.state.showAddModal ?
          <AddNewService showAddModal={this.state.showAddModal}
                         onToggleAddService={this.onToggleAddService}
                         onAddService={this.props.onAddService}
                         serviceId={this.state.serviceId}
                         onEditService={this.props.onEditService}
                         servicesList={servicesList}/> : null}
      </div>
    );
  }
}

const mapStateToProps = ({services}) => {
  const {servicesList, totalItems} = services;
  return {servicesList, totalItems};
};

export default connect(mapStateToProps, {
  onGetServicesList,
  onAddService,
  onEditService,
  onDeleteServices,
  onBulkActiveServices,
  onBulkDisableServices
})(Services);

Services.defaultProps = {
  servicesList: [],
  totalItems: null
};

Services.propTypes = {
  servicesList: PropTypes.array,
  totalItems: PropTypes.number,
  onGetServicesList: PropTypes.func,
  onAddService: PropTypes.func,
  onEditService: PropTypes.func,
  onDeleteServices: PropTypes.func,
  onBulkActiveServices: PropTypes.func,
  onBulkDisableServices: PropTypes.func
};