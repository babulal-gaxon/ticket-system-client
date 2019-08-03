import React, {Component} from "react"
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table} from "antd/lib/index";
import {connect} from "react-redux";

import {
  onAddCannedResponse,
  onBulkActiveResponses,
  onBulkDeleteResponses,
  onBulkInActiveResponses,
  onEditCannedResponse,
  onGetCannedResponses
} from "../../../appRedux/actions/CannedResponses";
import AddNewResponses from "./AddNewResponses";
import Widget from "../../../components/Widget";
import PropTypes from "prop-types";
import Permissions from "../../../util/Permissions";
import {Link} from "react-router-dom";
import ResponseRow from "./ResponseRow";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;

class CannedResponses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      filterText: "",
      itemNumbers: 10,
      current: 1,
      showAddCanned: false,
      selectedResponses: [],
      currentResponse: null
    };
  };

  componentDidMount() {
    this.onGetResponseData(this.state.current, this.state.itemNumbers, this.state.filterText)
  }

  onGetResponseData = (currentPage, itemsPerPage, filterData, updatingContent) => {
    if (Permissions.canResponseView()) {
      this.props.onGetCannedResponses(currentPage, itemsPerPage, filterData, updatingContent);
    }
  };

  onToggleAddCanned = () => {
    this.setState({showAddCanned: !this.state.showAddCanned})
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetResponseData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
      });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetResponseData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
      });
    } else {
      return null;
    }
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetResponseData(1, this.state.itemNumbers, this.state.filterText, true)
    })
  };

  onAddButtonClick = () => {
    this.setState({currentResponse: null, showAddCanned: true});
  };

  onEditResponse = (response) => {
    this.setState({currentResponse: response, showAddCanned: true});
  };

  onShowBulkActiveConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedResponses.length !== 0) {
      confirm({
        title: messages["responses.message.active"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedResponses
          };
          this.props.onBulkActiveResponses(obj);
          this.setState({selectedRowKeys: [], selectedResponses: []})
        }
      })
    } else {
      Modal.info({
        title: messages["responses.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onShowBulkDisableConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedResponses.length !== 0) {
      confirm({
        title: messages["responses.message.disable"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedResponses
          };
          this.props.onBulkInActiveResponses(obj);
          this.setState({selectedRowKeys: [], selectedResponses: []})
        }
      })
    } else {
      Modal.info({
        title: messages["responses.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onShowBulkDeleteConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedResponses.length !== 0) {
      confirm({
        title: messages["responses.message.delete"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedResponses
          };
          this.props.onBulkDeleteResponses(obj);
          this.onGetResponseData(this.state.current, this.state.itemNumbers, this.state.filterText);
          this.setState({selectedRowKeys: [], selectedResponses: []});
        }
      })
    } else {
      Modal.info({
        title: messages["responses.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {Permissions.canResponseEdit() ?
          <Menu.Item key="1" onClick={this.onShowBulkActiveConfirm}>
            <IntlMessages id="common.active"/>
          </Menu.Item> : null
        }
        {Permissions.canResponseEdit() ?
          <Menu.Item key="2" onClick={this.onShowBulkDisableConfirm}>
            <IntlMessages id="common.disable"/>
          </Menu.Item> : null
        }
        {Permissions.canResponseDelete() ?
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
    return <Popconfirm
      title={<IntlMessages id="responses.message.delete"/>}
      onConfirm={() => {
        this.props.onBulkDeleteResponses({ids: [recordId]});
        this.onGetResponseData(this.state.current, this.state.itemNumbers, this.state.filterText)
      }}
      okText={<IntlMessages id="common.yes"/>}
      cancelText={<IntlMessages id="common.no"/>}>
      <i className="icon icon-trash"/>
    </Popconfirm>
  };

  onPageChange = page => {
    this.setState({current: page}, () => {
      this.onGetResponseData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
    });
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
      this.onGetResponseData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
    })
  };

  render() {
    const selectedRowKeys = this.state.selectedRowKeys;
    const responses = this.props.responses;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedResponses: ids, selectedRowKeys: selectedRowKeys})
      }
    };
    const {messages} = this.props.intl;

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading"><IntlMessages id="responses.title"/></h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item><IntlMessages id="common.ticketSystem"/></Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary">
              <Link to="/setup/canned-responses" className="gx-text-primary"><IntlMessages id="responses.title"/></Link></Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {Permissions.canResponseAdd() ?
                <Button type="primary" className="gx-btn-lg" onClick={this.onAddButtonClick}>
                  <IntlMessages id="responses.new"/></Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder={messages["responses.search.placeholder"]}
                style={{width: 350}}
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
          <Table rowKey="id" rowSelection={rowSelection} columns={ResponseRow(this)}
                 dataSource={responses} className="gx-mb-4"
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
          <div className="gx-d-flex gx-flex-row">
          </div>
        </Widget>
        {this.state.showAddCanned ?
          <AddNewResponses showAddCanned={this.state.showAddCanned}
                           onToggleAddCanned={this.onToggleAddCanned}
                           onAddCannedResponse={this.props.onAddCannedResponse}
                           currentResponse={this.state.currentResponse}
                           onEditCannedResponse={this.props.onEditCannedResponse}
          /> : null}
      </div>
    );
  }
}


const mapStateToProps = ({cannedResponses, commonData}) => {
  const {responses, totalItems} = cannedResponses;
  const {updatingContent} = commonData;
  return {responses, totalItems, updatingContent};
};


export default connect(mapStateToProps, {
  onGetCannedResponses,
  onAddCannedResponse,
  onEditCannedResponse,
  onBulkActiveResponses,
  onBulkInActiveResponses,
  onBulkDeleteResponses
})(injectIntl(CannedResponses));

CannedResponses.defaultProps = {
  responses: [],
  totalItems: null
};

CannedResponses.propTypes = {
  responses: PropTypes.array,
  totalItems: PropTypes.number
};
