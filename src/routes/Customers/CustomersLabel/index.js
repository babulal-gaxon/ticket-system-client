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
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table, Tag} from "antd/lib/index";
import {Link} from "react-router-dom";
import AddNewLabel from "./AddNewLabel";
import Permissions from "../../../util/Permissions";

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
      labelId: null,
      itemNumbers: 10,
      current: 1,
      selectedLabels: []
    };
    this.onGetLabelsList(this.state.current, this.state.itemNumbers, this.state.filterText);
  };

  onGetLabelsList = (currentPage, itemNumbers, filterData) => {
    if (Permissions.canLabelView()) {
      this.props.onGetLabelData(currentPage, itemNumbers, filterData);
    }
  };

  onToggleModalState = () => {
    this.setState({showAddLabel: !this.state.showAddLabel});
  };

  onCurrentIncrement = () => {
    const totalPage = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < totalPage) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetLabelsList(this.state.current, this.state.itemNumbers, this.state.filterText);
      })
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetLabelsList(this.state.current, this.state.itemNumbers, this.state.filterText);
      })
    }
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetLabelsList(1, this.state.itemNumbers, this.state.filterText)
    })
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onAddButtonClick = () => {
    this.setState({labelId: null, showAddLabel: true});
  };

  onEditLabel = (id) => {
    this.setState({labelId: id, showAddLabel: true});
  };

  onShowBulkActiveConfirm = () => {
    if (this.state.selectedLabels.length !== 0) {
      confirm({
        title: "Are you sure to change the status of selected Label(s) to ACTIVE?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedLabels
          };
          this.props.onChangeToActiveStatus(obj);
          this.setState({selectedRowKeys: [], selectedLabels: []})
        }
      })
    } else {
      confirm({
        title: "Please Select Labels first",
      })
    }
  };

  onShowBulkDisableConfirm = () => {
    if (this.state.selectedLabels.length !== 0) {
      confirm({
        title: "Are you sure to change the status of selected Label(s) to DISABLED?",
        onOk: () => {
          this.props.onChangeToDisableStatus({ids: this.state.selectedLabels});
          this.setState({selectedRowKeys: [], selectedLabels: []})
        }
      })
    } else {
      confirm({
        title: "Please Select Department(s) first",
      })
    }
  };

  onShowBulkDeleteConfirm = () => {
    if (this.state.selectedLabels.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected Labels?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedLabels
          };
          this.props.onDeleteLabel(obj);
          this.setState({selectedRowKeys: [], selectedLabels: []});
        }
      })
    } else {
      confirm({
        title: "Please Select Label(s) first",
      })
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {Permissions.canLabelEdit() ?
          <Menu.Item key="1" onClick={this.onShowBulkActiveConfirm}>
            Active
          </Menu.Item> : null
        }
        {Permissions.canLabelEdit() ?
          <Menu.Item key="2" onClick={this.onShowBulkDisableConfirm}>
            Disable
          </Menu.Item> : null
        }
        {Permissions.canLabelDelete() ?
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
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.id}</span>
        },
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.name}</span>
        },
      },
      {
        title: 'Description',
        dataIndex: 'desc',
        key: 'desc',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc}</span>
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
          return <span> {Permissions.canLabelEdit() ? <i className="icon icon-edit gx-mr-3"
                                                         onClick={() => this.onEditLabel(record.id)}/> : null}
            {Permissions.canLabelDelete() ? this.onDeletePopUp(record.id) : null}
          </span>
        },
      },
    ];
  };

  onDeletePopUp = (recordId) => {
    return (
      <Popconfirm
        title="Are you sure to delete this Label?"
        onConfirm={() => {
          this.props.onDeleteLabel({ids: [recordId]});
          this.onGetLabelsList(this.state.current, this.state.itemNumbers, this.state.filterText);
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
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetLabelsList(this.state.current, this.state.itemNumbers, this.state.filterText);
    })
  };

  onPageChange = page => {
    this.setState({current: page}, () => {
      this.onGetLabelsList(this.state.current, this.state.itemNumbers, this.state.filterText);
    });
  };

  render() {
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
          <h4 className="gx-widget-heading">Customers Label</h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>
              <Link to="/customers">Customers</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/customers/labels" className="gx-text-primary">Customers Label</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {(Permissions.canLabelAdd()) ?
                <Button type="primary" onClick={this.onAddButtonClick} style={{width: 200}}>
                  Add New Label
                </Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder="Enter keywords to search Label"
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
          <Table rowKey="id" rowSelection={rowSelection} dataSource={labelList} columns={this.onGetTableColumns()}
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.current,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}/>
        </Widget>
        {this.state.showAddLabel ?
          <AddNewLabel showAddLabel={this.state.showAddLabel}
                       labelId={this.state.labelId}
                       onAddLabelsData={this.props.onAddLabelsData}
                       onToggleModalState={this.onToggleModalState}
                       labelList={labelList}
                       onEditLabelsData={this.props.onEditLabelsData}
          /> : null}
      </div>
    )
  }
}

const mapPropsToState = ({labelsList}) => {
  const {labelList, totalItems} = labelsList;
  return {labelList, totalItems};
};
export default connect(mapPropsToState, {
  onGetLabelData,
  onAddLabelsData,
  onDeleteLabel,
  onEditLabelsData,
  onChangeToDisableStatus,
  onChangeToActiveStatus
})(CustomersLabel)
