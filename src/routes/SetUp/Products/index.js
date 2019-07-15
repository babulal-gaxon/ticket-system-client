import React, {Component} from 'react';
import {
  Avatar,
  Breadcrumb,
  Button,
  Dropdown,
  Icon,
  Input,
  Menu,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tag
} from "antd/lib/index";
import Widget from "../../../components/Widget";
import {Link} from "react-router-dom";
import InfoView from "../../../components/InfoView";
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

const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      productId: 0,
      filterText: "",
      itemNumbers: 10,
      currentPage: 1,
      showAddModal: false,
      selectedProducts: []
    };
    this.onGetProductsData(this.state.currentPage, this.state.itemNumbers, this.state.filterText);
  };

  onGetProductsData = (currentPage, itemNumbers, searchText) => {
    if (Permissions.canProductView()) {
      this.props.onGetProductsList(currentPage, itemNumbers, searchText);
    }
  };

  onToggleAddProduct = () => {
    this.setState({showAddModal: !this.state.showAddModal})
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.currentPage < pages) {
      this.setState({currentPage: this.state.currentPage + 1}, () => {
        this.onGetProductsData(this.state.currentPage, this.state.itemNumbers, this.state.filterText)
      });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.currentPage > 0) {
      this.setState({currentPage: this.state.currentPage - 1}, () => {
        this.onGetProductsData(this.state.currentPage, this.state.itemNumbers, this.state.filterText)
      });
    } else {
      return null;
    }
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetProductsData(1, this.state.itemNumbers, this.state.filterText)
    });
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onAddButtonClick = () => {
    this.setState({productId: 0, showAddModal: true});
  };

  onEditProduct = (id) => {
    this.setState({productId: id, showAddModal: true});
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
      confirm({
        title: "Please Select Product(s) first",
      })
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
      confirm({
        title: "Please Select Product(s) first",
      })
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
      confirm({
        title: "Please Select Product(s) first",
      })
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

  onGetTableColumns = () => {
    return [
      {
        title: 'Product Name',
        dataIndex: 'productName',
        render: (text, record) => {
          return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
              {record.avatar ?
                <Avatar className="gx-mr-3 gx-size-80" src={record.avatar.src}/> :
                <Avatar className="gx-mr-3 gx-size-80"
                        style={{backgroundColor: '#f56a00'}}>{record.title[0].toUpperCase()}</Avatar>}
              <div className="gx-media-body">
                <span className="gx-mb-0 gx-text-capitalize">{record.title}</span>
              </div>
            </div>
          )
        }
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc === null ? "NA" : record.desc}</span>
        },
      },
      {
        title: 'Support',
        dataIndex: 'support_enable',
        key: 'support',
        render: (text, record) => {
          return <Tag color={record.support_enable === 1 ? "green" : "red"}>
            {record.support_enable === 1 ? "Enabled" : "Disabled"}
          </Tag>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <span> {(Permissions.canProductEdit()) ?
            <i className="icon icon-edit gx-mr-3" onClick={() => this.onEditProduct(record.id)}/> : null}
            {(Permissions.canProductDelete()) ? this.onDeletePopUp(record.id) : null}
          </span>
        },
      },
    ];
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
      this.onGetProductsData(this.state.currentPage, this.state.itemNumbers, this.state.filterText)
    })
  };

  onPageChange = page => {
    this.setState({
      currentPage: page
    }, () => {
      this.onGetProductsData(this.state.currentPage, this.state.itemNumbers, this.state.filterText)
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
          <h4 className="gx-font-weight-bold">Products</h4>
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
          <Table rowSelection={rowSelection} columns={this.onGetTableColumns()} dataSource={productsList}
                 className="gx-mb-4" rowKey="products"
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
        <InfoView/>
        {this.state.showAddModal ?
          <AddNewProduct showAddModal={this.state.showAddModal}
                         onToggleAddProduct={this.onToggleAddProduct}
                         onAddProduct={this.props.onAddProduct}
                         productId={this.state.productId}
                         onEditProduct={this.props.onEditProduct}
                         productsList={productsList}
                         fetchSuccess={this.props.fetchSuccess}
                         fetchStart={this.props.fetchStart}
                         fetchError={this.props.fetchError}/> : null}
      </div>
    );
  }
}

const mapStateToProps = ({products}) => {
  const {productsList, totalItems} = products;
  return {productsList, totalItems};
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