import React, {Component} from 'react';
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table} from "antd/lib/index";
import Widget from "../../../components/Widget";
import {Link} from "react-router-dom";
import AddNewService from "./AddNewService";
import {connect} from "react-redux";
import {
  onAddService,
  onBulkActiveServices,
  onBulkDisableServices,
  onDeleteServices,
  onEditService,
  onGetServicesList
} from "../../../appRedux/actions/Services";
import PropTypes from "prop-types";
import Permissions from "../../../util/Permissions";
import ServicesRow from "./ServicesRow";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      currentService: null,
      filterText: "",
      itemNumbers: 10,
      currentPage: 1,
      showAddModal: false,
      selectedServices: []
    };
    this.onGetServicesData(this.state.currentPage, this.state.itemNumbers, this.state.filterText);
  };

  onGetServicesData = (currentPage, itemNumbers, searchText, updatingContent) => {
    if (Permissions.canServiceView()) {
      this.props.onGetServicesList(currentPage, itemNumbers, searchText, updatingContent);
    }
  };

  onToggleAddService = () => {
    this.setState({showAddModal: !this.state.showAddModal})
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.currentPage < pages) {
      this.setState({currentPage: this.state.currentPage + 1}, () => {
        this.onGetServicesData(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
      });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.currentPage > 1) {
      this.setState({currentPage: this.state.currentPage - 1}, () => {
        this.onGetServicesData(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
      });
    } else {
      return null;
    }
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetServicesData(1, this.state.itemNumbers, this.state.filterText, true)
    });
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onAddButtonClick = () => {
    this.setState({currentService: null, showAddModal: true});
  };

  onEditIconClick = (service) => {
    this.setState({currentService: service, showAddModal: true});
  };

  onShowBulkActiveConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedServices.length !== 0) {
      confirm({
        title: messages["services.message.active"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedServices
          };
          this.props.onBulkActiveServices(obj, this);
          this.setState({selectedRowKeys: [], selectedServices: []})
        },
      })
    } else {
      Modal.info({
        title: messages["services.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onShowBulkDisableConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedServices.length !== 0) {
      confirm({
        title: messages["services.message.disable"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedServices
          };
          this.props.onBulkDisableServices(obj, this);
          this.setState({selectedRowKeys: [], selectedServices: []})
        },
      })
    } else {
      Modal.info({
        title: messages["services.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onShowBulkDeleteConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedServices.length !== 0) {
      confirm({
        title: messages["services.message.delete"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedServices
          };
          this.props.onDeleteServices(obj, this);
          this.setState({selectedRowKeys: [], selectedServices: []});
        }
      })
    } else {
      Modal.info({
        title: messages["services.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {(Permissions.canServiceEdit()) ?
          <Menu.Item key="1" onClick={this.onShowBulkActiveConfirm}>
            <IntlMessages id="common.active"/>
          </Menu.Item> : null}
        {(Permissions.canServiceEdit()) ?
          <Menu.Item key="2" onClick={this.onShowBulkDisableConfirm}>
            <IntlMessages id="common.disable"/>
          </Menu.Item> : null}
        {(Permissions.canServiceDelete()) ?
          <Menu.Item key="3" onClick={this.onShowBulkDeleteConfirm}>
            <IntlMessages id="common.delete"/>
          </Menu.Item> : null}
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <IntlMessages id="common.bulkActions"/> <Icon type="down"/>
      </Button>
    </Dropdown>
  };


  onDeletePopUp = (recordId) => {
    const {messages} = this.props.intl;
    confirm({
      title: messages["services.message.delete"],
      okText: messages["common.yes"],
      cancelText: messages["common.no"],
      onOk: () => {
        this.props.onDeleteServices({ids: [recordId]}, this);
      }
    })
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
      this.onGetServicesData(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
    })
  };

  onPageChange = page => {
    this.setState({currentPage: page}, () => {
      this.onGetServicesData(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
    });
  };

  render() {
    const selectedRowKeys = this.state.selectedRowKeys;
    const servicesList = this.props.servicesList;
    const {messages} = this.props.intl;
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
          <h4 className="gx-widget-heading"><IntlMessages id="services.title"/></h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>
              <Link to="/setup/services" className="gx-text-primary"><IntlMessages
                id="services.title"/></Link></Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {(Permissions.canServiceAdd()) ?
                <Button type="primary" className="gx-btn-lg" onClick={this.onAddButtonClick}>
                  <IntlMessages id="services.new"/>
                </Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                style={{width: 350}}
                placeholder={messages["services.search.placeholder"]}
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
          <Table rowKey="id" rowSelection={rowSelection} columns={ServicesRow(this)}
                 dataSource={servicesList} loading={this.props.updatingContent}
                 className="gx-mb-4"
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.currentPage,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => <div><span>{<IntlMessages id="common.showing"/>}</span>
                     <span>{range[0]}-{range[1]}</span> <span>{<IntlMessages id="common.of"/>} </span>
                     <span>{total}</span> <span>{<IntlMessages id="common.items"/>}</span></div>),
                   onChange: this.onPageChange
                 }}/>
          <div className="gx-d-flex gx-flex-row">
          </div>
        </Widget>
        {this.state.showAddModal ?
          <AddNewService showAddModal={this.state.showAddModal}
                         onToggleAddService={this.onToggleAddService}
                         onAddService={this.props.onAddService}
                         currentService={this.state.currentService}
                         onEditService={this.props.onEditService}
          /> : null}
      </div>
    );
  }
}

const mapStateToProps = ({services, commonData}) => {
  const {servicesList, totalItems} = services;
  const {updatingContent} = commonData;
  return {servicesList, totalItems, updatingContent};
};

export default connect(mapStateToProps, {
  onGetServicesList,
  onAddService,
  onEditService,
  onDeleteServices,
  onBulkActiveServices,
  onBulkDisableServices
})(injectIntl(Services));

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
