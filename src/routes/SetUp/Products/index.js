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
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

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
    const {messages} = this.props.intl;
    if (this.state.selectedProducts.length !== 0) {
      confirm({
        title: messages["products.message.active"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedProducts
          };
          this.props.onBulkActiveProducts(obj, this);
          this.setState({selectedRowKeys: [], selectedProducts: []})
        }
      })
    } else {
      Modal.info({
        title: messages["products.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onShowBulkDisableConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedProducts.length !== 0) {
      confirm({
        title: messages["products.message.disable"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedProducts
          };
          this.props.onBulkDisableProducts(obj, this);
          this.setState({selectedRowKeys: [], selectedProducts: []})
        },
      })
    } else {
      Modal.info({
        title: messages["products.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onShowBulkDeleteConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedProducts.length !== 0) {
      confirm({
        title: messages["products.message.delete"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedProducts
          };
          this.props.onDeleteProduct(obj, this);
          this.setState({selectedRowKeys: [], selectedProducts: []});
        }
      })
    } else {
      Modal.info({
        title: messages["products.message.selectFirst"],
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
            <IntlMessages id="common.active"/>
          </Menu.Item> : null}
        {(Permissions.canProductEdit()) ?
          <Menu.Item key="2" onClick={this.onShowBulkDisableConfirm}>
            <IntlMessages id="common.disable"/>
          </Menu.Item> : null}
        {(Permissions.canProductDelete()) ?
          <Menu.Item key="3" onClick={this.onShowBulkDeleteConfirm}>
            <IntlMessages id="common.delete"/>
          </Menu.Item> : null}

      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <IntlMessages id="common.bulkActions"/> <Icon type="down"/>
      </Button>
    </Dropdown>
  };

  onDeletePopUp = (recordId) => {
    return (
      <Popconfirm
        title={<IntlMessages id="products.message.delete"/>}
        onConfirm={() => {
          this.props.onDeleteProduct({ids: [recordId]}, this);
        }}
        okText={<IntlMessages id="common.yes"/>}
        cancelText={<IntlMessages id="common.no"/>}>
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
    const {messages} = this.props.intl;
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
          <h4 className="gx-widget-heading"><IntlMessages id="products.title"/></h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>
              <Link to="/setup/products" className="gx-text-primary"><IntlMessages
                id="products.title"/></Link></Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {(Permissions.canProductAdd()) ?
                <Button type="primary" className="gx-btn-lg" onClick={this.onAddButtonClick}>
                  <IntlMessages id="products.new"/>
                </Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                style={{width: 350}}
                placeholder={messages["products.search.placeholder"]}
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
                   showTotal: ((total, range) => <div><span>{<IntlMessages id="common.showing"/>}</span>
                     <span>{range[0]}-{range[1]}</span> <span>{<IntlMessages id="common.of"/>} </span>
                     <span>{total}</span> <span>{<IntlMessages id="common.items"/>}</span></div>),
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
})(injectIntl(Products));

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
