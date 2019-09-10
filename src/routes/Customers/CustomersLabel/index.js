import React, {Component} from 'react';
import {
  onAddLabelsData,
  onChangeToActiveStatus,
  onChangeToDisableStatus,
  onDeleteLabel,
  onEditLabelsData,
  onGetLabelData
} from "../../../appRedux/actions/Labels";
import {connect} from "react-redux";
import Widget from "../../../components/Widget";
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table} from "antd/lib/index";
import {Link} from "react-router-dom";
import AddNewLabel from "./AddNewLabel";
import Permissions from "../../../util/Permissions";
import CustomerLabelRow from "./CustomerLabelRow";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const {Option} = Select;
const Search = Input.Search;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

class CustomersLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      showAddLabel: false,
      filterText: "",
      label: null,
      itemNumbers: 10,
      current: 1,
      selectedLabels: []
    };
    this.onGetLabelsList(this.state.current, this.state.itemNumbers, this.state.filterText);
  };

  onGetLabelsList = (currentPage, itemNumbers, filterData, updatingContent) => {
    if (Permissions.canLabelView()) {
      this.props.onGetLabelData(currentPage, itemNumbers, filterData, updatingContent);
    }
  };

  onToggleModalState = () => {
    this.setState({showAddLabel: !this.state.showAddLabel});
  };

  onCurrentIncrement = () => {
    const totalPage = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < totalPage) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetLabelsList(this.state.current, this.state.itemNumbers, this.state.filterText, true);
      })
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetLabelsList(this.state.current, this.state.itemNumbers, this.state.filterText, true);
      })
    }
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetLabelsList(1, this.state.itemNumbers, this.state.filterText, true)
    })
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onAddButtonClick = () => {
    this.setState({label: null, showAddLabel: true});
  };


  onShowBulkActiveConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedLabels.length !== 0) {
      confirm({
        title: messages["validation.labels.active"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedLabels
          };
          this.props.onChangeToActiveStatus(obj, this);
          this.setState({selectedRowKeys: [], selectedLabels: []})
        }
      })
    } else {
      Modal.info({
        title: messages["validation.labels.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onShowBulkDisableConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedLabels.length !== 0) {
      confirm({
        title: messages["validation.labels.disable"],
        onOk: () => {
          this.props.onChangeToDisableStatus({ids: this.state.selectedLabels}, this);
          this.setState({selectedRowKeys: [], selectedLabels: []})
        }
      })
    } else {
      Modal.info({
        title: messages["validation.labels.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onShowBulkDeleteConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedLabels.length !== 0) {
      confirm({
        title: messages["validation.labels.delete"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedLabels
          };
          this.props.onDeleteLabel(obj, this);
          this.setState({selectedRowKeys: [], selectedLabels: []});
        }
      })
    } else {
      Modal.info({
        title: messages["validation.labels.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {Permissions.canLabelEdit() ?
          <Menu.Item key="1" onClick={this.onShowBulkActiveConfirm}>
            <IntlMessages id="common.active"/>
          </Menu.Item> : null
        }
        {Permissions.canLabelEdit() ?
          <Menu.Item key="2" onClick={this.onShowBulkDisableConfirm}>
            <IntlMessages id="common.disable"/>
          </Menu.Item> : null
        }
        {Permissions.canLabelDelete() ?
          <Menu.Item key="3" onClick={this.onShowBulkDeleteConfirm}>
            <IntlMessages id="common.delete"/>
          </Menu.Item> : null
        }
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
      title: messages["customers.message.delete"],
      okText: messages["common.yes"],
      cancelText: messages["common.no"],
      onOk: () => {
        this.props.onDeleteLabel({ids: [recordId]}, this);
        this.onGetLabelsList(this.state.current, this.state.itemNumbers, this.state.filterText, true);
      }
    })
  };

  onEditLabel = (label) => {
    this.setState({label: label, showAddLabel: true});
  };


  onShowItemOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange}>
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };

  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetLabelsList(this.state.current, this.state.itemNumbers, this.state.filterText, true);
    })
  };

  onPageChange = page => {
    this.setState({current: page}, () => {
      this.onGetLabelsList(this.state.current, this.state.itemNumbers, this.state.filterText, true);
    });
  };

  render() {
    const {messages} = this.props.intl;
    const selectedRowKeys = this.state.selectedRowKeys;
    const labelList = this.props.labelList;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedLabels: ids, selectedRowKeys: selectedRowKeys})
      }
    };
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading"><IntlMessages id="labels.title"/></h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>
              <Link to="/customers"><IntlMessages id="sidebar.dashboard.customers"/></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/customers/labels" className="gx-text-primary"><IntlMessages id="labels.title"/></Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {(Permissions.canLabelAdd()) ?
                <Button type="primary" onClick={this.onAddButtonClick} style={{width: 200}}>
                  <IntlMessages id="labels.addNew"/>
                </Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder={messages["labels.searchLabels"]}
                value={this.state.filterText}
                onChange={this.onFilterTextChange}
                style={{width: 350}}
              />
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
          <Table rowKey="id" rowSelection={rowSelection} dataSource={labelList} columns={CustomerLabelRow(this)}
                 loading={this.props.updatingContent}
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.current,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => <div><span>{<IntlMessages id="common.showing"/>}</span>
                     <span>{range[0]}-{range[1]}</span> <span>{<IntlMessages id="common.of"/>} </span>
                     <span>{total}</span> <span>{<IntlMessages id="common.items"/>}</span></div>),
                   onChange: this.onPageChange
                 }}/>
        </Widget>
        {this.state.showAddLabel ?
          <AddNewLabel showAddLabel={this.state.showAddLabel}
                       label={this.state.label}
                       onAddLabelsData={this.props.onAddLabelsData}
                       onToggleModalState={this.onToggleModalState}
                       labelList={labelList}
                       onEditLabelsData={this.props.onEditLabelsData}
          /> : null}
      </div>
    )
  }
}

const mapPropsToState = ({labelsList, commonData}) => {
  const {labelList, totalItems} = labelsList;
  const {updatingContent} = commonData;
  return {labelList, totalItems, updatingContent};
};
export default connect(mapPropsToState, {
  onGetLabelData,
  onAddLabelsData,
  onDeleteLabel,
  onEditLabelsData,
  onChangeToDisableStatus,
  onChangeToActiveStatus
})(injectIntl(CustomersLabel))
