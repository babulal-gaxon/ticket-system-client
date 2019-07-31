import React, {Component} from 'react';
import {Button, Checkbox, Input, Select} from "antd";

const {Option} = Select;
const Search = Input.Search;

class FilterBar extends Component {

  onFilterCompanyName = () => {
    return this.props.company.filter(comp => comp.company_name.indexOf(this.props.companyFilterText) !== -1);
  };

  onCompanyReset = () => {
    this.props.updateState({selectedCompanies: []})
  };

  onLabelSelectOption = () => {
    const labelOptions = [];
    this.props.labels.map(label => {
      return labelOptions.push(<Option value={label.id} key={label.id}>{label.name}</Option>)
    });
    return labelOptions;
  };

  onLabelSelect = (id) => {
    this.props.updateState({selectedLabels: this.props.selectedLabels.concat(id)})
  };

  onLabelRemove = (value) => {
    this.props.updateState({selectedLabels: this.props.selectedLabels.filter(label => label !== value)})
  };

  onSelectCompanies = checkedList => {
    this.props.updateState({selectedCompanies: checkedList});
  };

  onFilterStatusCustomers = checkedList => {
    this.props.updateState({status: checkedList});
  };

  render() {
    const {companyFilterText, showMoreCompany, selectedCompanies, status, selectedLabels, onChangeCompanyFilterText, onShowMoreCompanyToggle} = this.props;
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
                      onChange={(e) => onChangeCompanyFilterText(e)}/>
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
                  <Button type="link" onClick={() => onShowMoreCompanyToggle()}>
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
