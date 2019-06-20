import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Button, Input, Select} from "antd";
import {connect} from "react-redux";
import {onGetCustomersData} from "../../../appRedux/actions/Customers";

const {Option} = Select;
const Search = Input.Search;


class AllCustomers extends Component{
    constructor(props){
        super(props);
        this.state={
            filterText:"",
        }
    }
    componentWillMount() {
        this.props.onGetCustomersData();
    }
    onClickAddCustomerButton=()=>{
        this.props.history.push('/customers/add-customers')
    };

    render(){
        return(
            <div className="gx-main-layout-content">
                <Widget styleName="gx-card-filter">
                    <h4>Customers</h4>
                    <p className="gx-text-grey">Customers</p>
                    <div className="gx-d-flex gx-justify-content-between">
                        <div className="gx-d-flex">
                            <Button type="primary" onClick={this.onClickAddCustomerButton} style={{width: 200}}>Add New
                                Customers
                            </Button>
                            <Select
                                labelInValue
                                defaultValue={{key: 'Bulk Action'}}>
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
                                style={{width: 200}}/>
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
                </Widget>
            </div>
        )
    }
}
const mapPropsToState = ({labelsList}) => {
    const {customersList} = labelsList;
    return {customersList};
};
export default connect(mapPropsToState,{onGetCustomersData})(AllCustomers);