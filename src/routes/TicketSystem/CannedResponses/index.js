import React, {Component} from "react"
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table, Tag} from "antd";
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
import Widget from "../../../components/Widget/index";
import PropTypes from "prop-types";
import Permissions from "../../../util/Permissions";
import {Link} from "react-router-dom";
import InfoView from "../../../components/InfoView";

const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;

class CannedResponses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      responseId: 0,
      filterText: "",
      itemNumbers: 10,
      current: 1,
      showAddCanned: false,
      selectedResponses: []
    };
    this.onGetResponseData(this.state.current, this.state.itemNumbers)
  };

  onGetResponseData = (currentPage, itemsPerPage, filterData) => {
    if (Permissions.canResponseView()) {
      this.props.onGetCannedResponses(currentPage, itemsPerPage, filterData);
    }
  };

  onToggleAddCanned = () => {
    this.setState({showAddCanned: !this.state.showAddCanned})
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetResponseData(this.state.current, this.state.itemNumbers)
      });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetResponseData(this.state.current, this.state.itemNumbers)
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
      this.onGetResponseData(this.state.current, this.state.itemNumbers, this.state.filterText)
    })
  };

  onAddButtonClick = () => {
    this.setState({responseId: 0, showAddCanned: true});
  };

  onEditResponse = (id) => {
    this.setState({responseId: id, showAddCanned: true});
  };

  onShowBulkActiveConfirm = () => {
    if (this.state.selectedResponses.length !== 0) {
      confirm({
        title: "Are you sure to change the status of selected Response(s) to ACTIVE?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedResponses
          };
          this.props.onBulkActiveResponses(obj);
          this.setState({selectedRowKeys: [], selectedResponses: []})
        }
      })
    } else {
      confirm({
        title: "Please Select Response(s) first",
      })
    }
  };

  onShowBulkDisableConfirm = () => {
    if (this.state.selectedResponses.length !== 0) {
      confirm({
        title: "Are you sure to change the status of selected Response(s) to DISABLED?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedResponses
          };
          this.props.onBulkInActiveResponses(obj);
          this.setState({selectedRowKeys: [], selectedResponses: []})
        }
      })
    } else {
      confirm({
        title: "Please Select Response(s) first",
      })
    }
  };

  onShowBulkDeleteConfirm = () => {
    if (this.state.selectedResponses.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected Response(s)?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedResponses
          };
          this.props.onBulkDeleteResponses(obj);
          this.onGetResponseData(this.state.current, this.state.itemNumbers);
          this.setState({selectedRowKeys: [], selectedResponses: []});
        }
      })
    } else {
      confirm({
        title: "Please Select Response(s) first",
      })
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {Permissions.canResponseEdit() ?
          <Menu.Item key="1" onClick={this.onShowBulkActiveConfirm}>
            Active
          </Menu.Item> : null
        }
        {Permissions.canResponseEdit() ?
          <Menu.Item key="2" onClick={this.onShowBulkDisableConfirm}>
            Disable
          </Menu.Item> : null
        }
        {Permissions.canResponseDelete() ?
          <Menu.Item key="3" onClick={this.onShowBulkDeleteConfirm}>
            Delete
          </Menu.Item> : null
        }
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
        title: 'Short Title',
        dataIndex: 'shortTitle',
        key: 'shortTitle',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.short_title}</span>
        }
      },
      {
        title: 'Short Code',
        dataIndex: 'shortCode',
        key: 'shortCode',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.short_code}</span>
        },
      },
      {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.message}</span>
        },
      },
      {
        title: 'Created By',
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.created_by}</span>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        key: 'Status',
        render: (text, record) => {

          return <Tag color={record.status === 1 ? "green" : "red"}>
            {record.status === 1 ? "Active" : "Disabled"}
          </Tag>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <span> {Permissions.canResponseEdit() ? <i className="icon icon-edit gx-mr-3"
                                                            onClick={() => this.onEditResponse(record.id)}/> : null}
            {Permissions.canResponseDelete() ? this.onDeletePopUp(record.id) : null}
          </span>
        },
      },
    ];
  };

  onDeletePopUp = (recordId) => {
    return <Popconfirm
      title="Are you sure to delete this Response?"
      onConfirm={() => {
        this.props.onBulkDeleteResponses({ids: [recordId]})
        this.onGetResponseData(this.state.current, this.state.itemNumbers)
      }}
      okText="Yes"
      cancelText="No">
      <i className="icon icon-trash"/>
    </Popconfirm>
  };

  onPageChange = page => {
    this.setState({current: page}, () => {
      this.onGetResponseData(this.state.current, this.state.itemNumbers)
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
      this.onGetResponseData(this.state.current, this.state.itemNumbers)
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

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-font-weight-bold">Canned Responses</h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>
              <Link to="/ticket-system/canned-responses">Ticket System</Link></Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary">Canned Responses</Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {Permissions.canResponseAdd() ?
                <Button type="primary" className="gx-btn-lg" onClick={this.onAddButtonClick}>
                  Add New Response</Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder="Enter keywords to search Responses"
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
          <Table rowSelection={rowSelection} columns={this.onGetTableColumns()}
                 dataSource={responses} className="gx-mb-4"
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.current,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}/>
          <div className="gx-d-flex gx-flex-row">
          </div>
        </Widget>
        {this.state.showAddCanned ?
          <AddNewResponses showAddCanned={this.state.showAddCanned}
                           onToggleAddCanned={this.onToggleAddCanned}
                           onAddCannedResponse={this.props.onAddCannedResponse}
                           responseId={this.state.responseId}
                           onEditCannedResponse={this.props.onEditCannedResponse}
                           responses={responses}
          /> : null}
        <InfoView/>
      </div>
    );
  }
}


const mapStateToProps = ({cannedResponses}) => {
  const {responses, totalItems} = cannedResponses;
  return {responses, totalItems};
};


export default connect(mapStateToProps, {
  onGetCannedResponses,
  onAddCannedResponse,
  onEditCannedResponse,
  onBulkActiveResponses,
  onBulkInActiveResponses,
  onBulkDeleteResponses
})(CannedResponses);

CannedResponses.defaultProps = {
  responses: [],
  totalItems: null
};

CannedResponses.propTypes = {
  responses: PropTypes.array,
  totalItems: PropTypes.number
};