import React, {Component} from 'react';
import {Button, Checkbox, Input, Select} from "antd";

const {Option} = Select;
const Search = Input.Search;

class FilterBar extends Component {

  constructor(props){
    super(props);
    this.state= {
      companyFilterText: "",
      showMoreCompany: false,
      selectedCompanies: [],
      status: [],
      selectedLabels: []
    }
  }

  onFilterCompanyName = () => {
    return this.props.company.filter(comp => comp.company_name.indexOf(this.state.companyFilterText) !== -1);
  };

  onCompanyReset = () => {
    const {selectedLabels, status} = this.state;
    const {current, itemNumbers, filterText} = this.props;
    this.setState({selectedCompanies: []}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, this.state.selectedCompanies, selectedLabels, status, true)
    })
  };

  onLabelSelectOption = () => {
    const labelOptions = [];
    this.props.labels.map(label => {
      return labelOptions.push(<Option value={label.id} key={label.id}>{label.name}</Option>)
    });
    return labelOptions;
  };

  onLabelSelect = (id) => {
    const {current, itemNumbers, filterText} = this.props;
    const {selectedCompanies, status} = this.state;
    this.setState({selectedLabels: this.state.selectedLabels.concat(id)},
      () => {
        this.props.onGetPaginatedData(current, itemNumbers, filterText, selectedCompanies, this.state.selectedLabels, status, true)
      })
  };

  onLabelRemove = (value) => {
    const {current, itemNumbers, filterText} = this.props;
    const {selectedCompanies, status} = this.state;
    const updatedLabels = this.state.selectedLabels.filter(label => label !== value);
    this.setState({selectedLabels: updatedLabels}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, selectedCompanies, this.state.selectedLabels, status, true)
    })
  };

  onSelectCompanies = checkedList => {
    const {current, itemNumbers, filterText} = this.props;
    const {selectedLabels, status} = this.state;
    this.setState({selectedCompanies: checkedList}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, this.state.selectedCompanies, selectedLabels, status, true)
    })
  };

  onFilterStatusCustomers = checkedList => {
    const {current, itemNumbers, filterText} = this.props;
    const {selectedLabels, selectedCompanies} = this.state;
    this.setState({status: checkedList}, () => {
      this.props.onGetPaginatedData(current, itemNumbers, filterText, selectedCompanies, selectedLabels, this.state.status, true)
    })
  };

  render() {

    const {companyFilterText, showMoreCompany, selectedCompanies, status, selectedLabels} = this.state;
    const companiesList = showMoreCompany ? this.onFilterCompanyName() :
      this.onFilterCompanyName().length > 5 ? this.onFilterCompanyName().slice(0, 5) : this.onFilterCompanyName();

    return (

    <div className="gx-main-layout-sidenav gx-d-none gx-d-lg-flex">
      <div className="gx-main-layout-side">
        <div className="gx-main-layout-side-header">
          <h4 className="gx-font-weight-medium">Filter Customers</h4>
        </div>
        <div className="gx-main-layout-nav">
          <div>
            <div className="gx-d-flex gx-justify-content-between">
              <label>Filter By Company</label>
              {selectedCompanies.length > 0 ? <span onClick={this.onCompanyReset}>Reset</span> : null}
            </div>
            <Search className="gx-mt-4" value={companyFilterText} placeholder="Search Company here"
                    onChange={(e) => this.setState({companyFilterText: e.target.value})}/>
            <div className="gx-my-2">
              <Checkbox.Group onChange={this.onSelectCompanies} value={selectedCompanies}>
                {companiesList.map(company => {
                  return <div key={company.id} className="gx-mb-2"><Checkbox
                    value={company.id}>{company.company_name}</Checkbox></div>
                })}
              </Checkbox.Group>
            </div>
            <div>
              {this.onFilterCompanyName().length > 5 ?
                <Button type="link" onClick={() => this.setState({showMoreCompany: !this.state.showMoreCompany})}>
                  {showMoreCompany ? "View Less" : `${this.onFilterCompanyName().length - 5} More`}
                </Button> : null}
            </div>
          </div>
          <div className="gx-mt-5">
            <div className="gx-mb-3">Filter by labels</div>
            <Select
              mode="multiple"
              style={{width: '100%'}}
              placeholder="Please select Labels"
              value={selectedLabels}
              onSelect={this.onLabelSelect}
              onDeselect={this.onLabelRemove}>
              {this.onLabelSelectOption()}
            </Select>
          </div>
          <div className="gx-mt-5">
            <div className="gx-mb-3">Status</div>
            <Checkbox.Group onChange={this.onFilterStatusCustomers} value={status}>
              <Checkbox value={0}>Disabled</Checkbox>
              <Checkbox value={1}>Active</Checkbox>
            </Checkbox.Group>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default FilterBar;