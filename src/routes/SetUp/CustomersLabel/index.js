import React, {Component} from 'react';
import {onAddLabelsData, onDeleteLabel, onEditLabelsData, onGetLabelData} from "../../../appRedux/actions/Labels";
import {connect} from "react-redux";
import Widget from "../../../components/Widget";
import {message,Breadcrumb, Button, Dropdown, Input, Menu, Popover, Select, Table, Tag} from "antd";
import {Link} from "react-router-dom";
import AddNewLabel from "./AddNewLabel";

const {Option} = Select;
const Search = Input.Search;

class CustomersLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            filterText: "",
            labelEditId: 0,
            pageSize: 10,
            current:1
        }
    }


    componentWillMount() {
        this.props.onGetLabelData();
    };

    onSetID = () => {
        this.setState({labelEditId: 0})
    };

    onToggleModalState = () => {
        this.setState({isVisible: !this.state.isVisible});
    };

    onFilterData = () => {
        return this.props.labelList.filter(label => label.name.indexOf(this.state.filterText) !== -1)
    };

    onSelectRowOperation = (e) => {
        return e.key === "item_0" ? this.onToggleModalState() : null;
    };

    onHandleMenuClick = (labelEditId) => {
        return <Menu onClick={(e) => {
            this.onSelectRowOperation(e);
            this.setState({labelEditId: labelEditId})
        }}>
            <Menu.Item>
                Edit
            </Menu.Item>
            <Menu.Item>
                <Popover
                    placement="topLeft"
                    content={<div><Button onClick={this.hide}>Close</Button> <Button onClick={(e)=>{e.stopPropagation();this.props.onDeleteLabel(this.state.labelEditId);this.handleVisibleChange()}}>Yes</Button></div>}
                    title="Are You Sure You Want To Delete"
                    trigger="click"
                >
                    Delete
                </Popover>
            </Menu.Item>
        </Menu>
    };
    onSelectPageSize = (value) => {
        this.setState({pageSize: eval(value)});
    };

    onCurrentIncrement = () =>{
        const totalPage = Math.ceil(this.props.labelList.length/this.state.pageSize);
        if (this.state.current < totalPage) {
            this.setState({current:this.state.current+1})
        }
    };
    onCurrentDecrement=()=>{
        if(this.state.current > 1){
            this.setState({current:this.state.current-1})
        }

    };
    onPageChange = (page) =>{
        this.setState({current:page});
    };


    render() {
        const data = this.onFilterData();
        const rowSelection = {
            onChange: (selectedRows) => {
                console.log('selectedRows:', selectedRows);
            }
        };

        const columnData = [
                {
                    title: 'id',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Description',
                    dataIndex: 'desc',
                    key: 'desc',
                },

                {
                    title: 'Status',
                    dataIndex: 'Status',
                    key: 'status',
                    render: (text, record) => {
                        let color = record.status ? "green" : "red";
                        return <Tag color={color}>{record.status ? "Active" : "Disabled"}</Tag>
                    }


                },
                {
                    render: (record) => {
                        return <Dropdown overlay={this.onHandleMenuClick(record.id)} trigger='click'>
                            <i className="icon icon-ellipse-h"/>
                        </Dropdown>
                    }
                }


            ]
        ;
        return (
            <div className="gx-main-layout-content">

                <Widget styleName="gx-card-filter">

                    <h4>Customers Label</h4>

                    <Breadcrumb className="gx-mb-3">
                        <Breadcrumb.Item>Setup</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={""} className="gx-text-primary">Customers Label</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="gx-d-flex gx-justify-content-between">
                        <div className="gx-d-flex">
                            <Button type="primary" onClick={this.onToggleModalState} style={{width: 200}}>Add New
                                Label
                            </Button>
                            <Select
                                labelInValue
                                defaultValue={{key: 'Bulk Action'}}
                            >
                                <Option value="Export">Export All</Option>
                                <Option value="Archive">Archive All</Option>
                            </Select>
                        </div>

                        <div className="gx-d-flex">
                            <Search
                                placeholder="input search text"
                                value={this.state.filterText}
                                onChange={(e) => {
                                    this.setState({filterText: e.target.value})
                                }}
                                style={{width: 200}}
                            />
                            <Select defaultValue="10" className="gx-mx-1" onChange={this.onSelectPageSize}>
                                <Option value="10">10</Option>
                                <Option value="25">25</Option>
                            </Select>
                            <Button.Group className="gx-btn-group-flex">
                                <Button type="default" onClick={this.onCurrentDecrement}>
                                    <i className="icon icon-long-arrow-left"/>
                                </Button>
                                <Button type="default" onClick={this.onCurrentIncrement}>
                                    <i className="icon icon-long-arrow-right"/>
                                </Button>
                            </Button.Group>
                        </div>

                    </div>
                    <Table rowSelection={rowSelection} dataSource={data} columns={columnData} pagination={{
                        pageSize: this.state.pageSize,
                        current:this.state.current,
                        showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                        onChange:((page)=> this.onPageChange(page))
                    }}>

                    </Table>

                </Widget>
                {this.state.isVisible ?
                    <AddNewLabel visible={this.state.isVisible} labelEditId={this.state.labelEditId}
                                 onAddLabelsData={this.props.onAddLabelsData}
                                 onModalState={this.onToggleModalState} labelList={this.props.labelList}
                                 onEditLabelsData={this.props.onEditLabelsData}
                                 onSetID={this.onSetID}/> : null}
            </div>
        )
    }
}

const mapPropsToState = ({labelsList}) => {
    const {labelList} = labelsList;
    return {labelList};
};
export default connect(mapPropsToState, {onGetLabelData, onAddLabelsData, onDeleteLabel, onEditLabelsData})(CustomersLabel)
