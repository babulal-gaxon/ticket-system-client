import React, {Component} from 'react';
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table} from "antd/lib/index";
import Widget from "../../../components/Widget";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import AddNewProduct from "./AddNewProduct";
import {
  onAddProduct,
  onBulkActiveProducts,
  onBulkDisableProducts,
  onDeleteProduct,
  onEditProduct,
  onGetProductsList
} from "../../../appRedux/actions/Products";
import Permissions from "../../../util/Permissions";
import {fetchError, fetchStart, fetchSuccess} from "../../../appRedux/actions";
import ProductsRow from "./ProductsRow";

const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      currentProduct: null,
      filterText: "",
      itemNumbers: 10,
      currentPage: 1,
      showAddModal: false,
      selectedProducts: []
    };
    this.onGetProductsData(this.state.currentPage, this.state.itemNumbers, this.state.filterText);
  };

  onGetProductsData = (currentPage, itemNumbers, searchText, updatingContent) => {
    if (Permissions.canProductView()) {
      this.props.onGetProductsList(currentPage, itemNumbers, searchText, updatingContent);
    }
  };

  onToggleAddProduct = () => {
    this.setState({showAddModal: !this.state.showAddModal})
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.currentPage < pages) {
      this.setState({currentPage: this.state.currentPage + 1}, () => {
        this.onGetProductsData(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
      });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.currentPage > 0) {
      this.setState({currentPage: this.state.currentPage - 1}, () => {
        this.onGetProductsData(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
      });
    } else {
      return null;
    }
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetProductsData(1, this.state.itemNumbers, this.state.filterText, true)
    });
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onAddButtonClick = () => {
    this.setState({currentProduct: null, showAddModal: true});
  };

  onEditProduct = (product) => {
    this.setState({currentProduct: product, showAddModal: true});
  };

  onShowBulkActiveConfirm = () => {
    if (this.state.selectedProducts.length !== 0) {
      confirm({
        title: "Are you sure to change the status of selected Product(s) to ACTIVE?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedProducts
          };
          this.props.onBulkActiveProducts(obj);
          this.setState({selectedRowKeys: [], selectedProducts: []})
        }
      })
    } else {
      Modal.info({
        title: "Please Select Product(s) first",
        onOk() {
        },
      });
    }
  };

  onShowBulkDisableConfirm = () => {
    if (this.state.selectedProducts.length !== 0) {
      confirm({
        title: "Are you sure to change the status of selected Product(s) to Disabled?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedProducts
          };
          this.props.onBulkDisableProducts(obj);
          this.setState({selectedRowKeys: [], selectedProducts: []})
        },
      })
    } else {
      Modal.info({
        title: "Please Select Product(s) first",
        onOk() {
        },
      });
    }
  };

  onShowBulkDeleteConfirm = () => {
    if (this.state.selectedProducts.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected Product(s)?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedProducts
          };
          this.props.onDeleteProduct(obj);
          this.onGetProductsData(this.state.current, this.state.itemNumbers);
          this.setState({selectedRowKeys: [], selectedProducts: []});
        }
      })
    } else {
      Modal.info({
        title: "Please Select Product(s) first",
        onOk() {
        },
      });
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {(Permissions.canProductEdit()) ?
          <Menu.Item key="1" onClick={this.onShowBulkActiveConfirm}>
            Active
          </Menu.Item> : null}
        {(Permissions.canProductEdit()) ?
          <Menu.Item key="2" onClick={this.onShowBulkDisableConfirm}>
            Disable
          </Menu.Item> : null}
        {(Permissions.canProductDelete()) ?
          <Menu.Item key="3" onClick={this.onShowBulkDeleteConfirm}>
            Delete
          </Menu.Item> : null}

      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Bulk Actions <Icon type="down"/>
      </Button>
    </Dropdown>
  };

  onDeletePopUp = (recordId) => {
    return (
      <Popconfirm
        title="Are you sure to delete this Product?"
        onConfirm={() => {
          this.props.onDeleteProduct({ids: [recordId]});
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
    this.setState({itemNumbers: value, currentPage: 1}, () => {
      this.onGetProductsData(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
    })
  };

  onPageChange = page => {
    this.setState({
      currentPage: page
    }, () => {
      this.onGetProductsData(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
    });
  };

  render() {
    const selectedRowKeys = this.state.selectedRowKeys;
    const productsList = this.props.productsList;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedProducts: ids, selectedRowKeys: selectedRowKeys})
      }
    };

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading">Products</h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>
              <Link to="/setup/products" className="gx-text-primary">Products</Link></Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {(Permissions.canProductAdd()) ?
                <Button type="primary" className="gx-btn-lg" onClick={this.onAddButtonClick}>
                  Add New Product
                </Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                style={{width: 350}}
                placeholder="Search Products Here"
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
          <Table rowKey="id" rowSelection={rowSelection} columns={ProductsRow(this)} dataSource={productsList}
                 className="gx-mb-4" loading={this.props.updatingContent}
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.currentPage,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}/>
          <div className="gx-d-flex gx-flex-row">
          </div>
        </Widget>
        {this.state.showAddModal ?
          <AddNewProduct showAddModal={this.state.showAddModal}
                         onToggleAddProduct={this.onToggleAddProduct}
                         onAddProduct={this.props.onAddProduct}
                         currentProduct={this.state.currentProduct}
                         onEditProduct={this.props.onEditProduct}
                         fetchSuccess={this.props.fetchSuccess}
                         fetchStart={this.props.fetchStart}
                         fetchError={this.props.fetchError}/> : null}
      </div>
    );
  }
}

const mapStateToProps = ({products, commonData}) => {
  const {productsList, totalItems} = products;
  const {updatingContent} = commonData;
  return {productsList, totalItems, updatingContent};
};

export default connect(mapStateToProps, {
  onGetProductsList,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onBulkActiveProducts,
  onBulkDisableProducts,
  fetchSuccess,
  fetchStart,
  fetchError
})(Products);

Products.defaultProps = {
  productsList: [],
  totalItems: null
};

Products.propTypes = {
  productsList: PropTypes.array,
  totalItems: PropTypes.number,
  productLogoId: PropTypes.number,
  onGetProductsList: PropTypes.func,
  onAddProduct: PropTypes.func,
  onEditProduct: PropTypes.func,
  onDeleteProduct: PropTypes.func,
  onBulkActiveProducts: PropTypes.func,
  onBulkDisableProducts: PropTypes.func
};
