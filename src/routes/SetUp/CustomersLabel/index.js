import React, {Component} from 'react';
import {onAddLabelsData, onGetLabelData} from "../../../appRedux/actions/Labels";
import {connect} from "react-redux";
import Widget from "../../../components/Widget";
import {Breadcrumb, Button, Select, Table, Input, Icon} from "antd";
import {Link} from "react-router-dom";
import AddNewLabel from "./AddNewLabel";


class CustomersLabel extends Component {
    constructor(props){
        super(props);
        this.state={
            isVisible : false
        }
    }
    componentWillMount() {
        this.props.onGetLabelData();
    }

    onToggleModalState = () =>{
        this.setState({isVisible : !this.state.isVisible});
    };
    handleFilterChange = () => {

    };
    onFilterData = () => {
        return this.props.labelList.filter(item => item)
    };

    render() {
        const data = this.onFilterData();
        const {Option} = Select;
        const Search = Input.Search;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
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
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: 'status',
                dataIndex: 'status',
                key: 'status',
            },
        ];
        console.log("in Labels file", this.props.labelList);
        return (
            <div className="gx-main-layout-content">

                <Widget styleName="gx-card-filter">
                    <h4>Customers Label</h4>
                    <Breadcrumb className="gx-mb-3">
                        <Breadcrumb.Item>Setup</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={''} className="gx-text-primary">Customers Label</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="gx-d-flex gx-justify-content-between">
                        <div className="gx-d-flex">
                            <Button type="primary" onClick={this.onToggleModalState} style={{width:200}}>Add New Label</Button>
                            <Select
                                labelInValue
                                defaultValue={{key: 'Bulk Action'}}
                                //style={{ width: 120 }}
                                onChange={this.handleFilterChange}
                            >
                                <Option value="Export">Export All</Option>
                                <Option value="Archive">Archive All</Option>
                            </Select>
                        </div>
                        <div className="gx-d-flex">
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                            <Select defaultValue="10" className="gx-mx-1">
                                <Option value="10">10</Option>
                                <Option value="25">25</Option>
                            </Select>
                            <Button.Group >
                                <Button type="default">
                                    <Icon type="left" />
                                </Button>
                                <Button type="default">
                                    <Icon type="right" />
                                </Button>
                            </Button.Group>
                        </div>

                    </div>
                    <Table rowSelection={rowSelection} dataSource={data} columns={columnData}>

                    </Table>
                </Widget>
                {this.state.isVisible ? <AddNewLabel visible={this.state.isVisible} onAddLabelsData={this.props.onAddLabelsData} onModalState={this.onToggleModalState}/> : null}
            </div>
        )
    }
}

const mapToState = ({labelsList}) => {
    const {labelList} = labelsList;
    return {labelList};
};
export default connect(mapToState, {onGetLabelData,onAddLabelsData})(CustomersLabel)
