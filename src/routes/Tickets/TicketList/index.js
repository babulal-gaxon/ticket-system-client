import React, {Component} from 'react';
import {onGetFormOptions, onGetRaisedTickets, onRaiseNewTicket} from "../../../appRedux/actions/Tickets";
import {connect} from "react-redux";
import {Button, Input, Select, Table} from "antd";
import RaiseTicketModal from "../RaiseTicket";
import {fetchError, fetchStart, fetchSuccess} from "../../../appRedux/actions";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";
import TicketsRow from "./TicketsRow";

const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;

class TicketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      itemNumbers: 10,
      current: 1,
      showAddTicket: false,
      selectedTickets: []
    };
  }

  componentDidMount() {
    this.onGetTicketsData(this.state.current, this.state.itemNumbers, this.state.filterText);
    this.props.onGetFormOptions();
  }

  isShowRaiseTickets = () => {
    return this.state.filterText === "" && this.props.raisedTickets.length === 0 && !this.props.updatingContent
  };

  onGetTicketsData = (currentPage, itemsPerPage, filterData, updatingContent) => {
    this.props.onGetRaisedTickets(currentPage, itemsPerPage, filterData, updatingContent);
  };

  onToggleAddTicket = () => {
    this.setState({showAddTicket: !this.state.showAddTicket})
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalTickets / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetTicketsData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
      });
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetTicketsData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
      });
    }
  };


  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetTicketsData(1, this.state.itemNumbers, this.state.filterText, true)
    })
  };


  onPageChange = page => {
    this.setState({current: page}, () => {
      this.onGetTicketsData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
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
      this.onGetTicketsData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
    })
  };

  onSelectTicket = record => {
    this.props.history.push(`/ticket/${record.id}`);
  };

  render() {
    const {filterText, showAddTicket} = this.state;
    const {raisedTickets, formOptions} = this.props;
    const {messages} = this.props.intl;

    return (
      <div className="gx-main-layout-content">
        {!this.isShowRaiseTickets() ?
          <div>
            <div className="gx-d-flex gx-justify-content-between">
              <div className="gx-d-flex">
                <Button type="primary" className="gx-btn-lg" onClick={this.onToggleAddTicket}>
                  <IntlMessages id="tickets.raiseATicket"/></Button>
              </div>
              <div className="gx-d-flex">
                <Search
                  placeholder={messages["tickets.search.placeholder"]}
                  style={{width: 350}}
                  value={filterText}
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
            <Table columns={TicketsRow()}
                   dataSource={raisedTickets} className="gx-mb-4" rowKey="id"
                   loading={this.props.updatingContent}
                   pagination={{
                     pageSize: this.state.itemNumbers,
                     current: this.state.current,
                     total: raisedTickets.length,
                     showTotal: ((total, range) => <div><span>{<IntlMessages id="common.showing"/>}</span>
                       <span>{range[0]}-{range[1]}</span> <span>{<IntlMessages id="common.of"/>} </span>
                       <span>{total}</span> <span>{<IntlMessages id="common.items"/>}</span></div>),
                     onChange: this.onPageChange,
                   }}
                   onRow={(record) => ({
                     onClick: () => {
                       this.onSelectTicket(record)
                     }
                   })}/>
          </div> : <div className="gx-main-layout-content">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 700
            }}>
              <div><IntlMessages id="tickets.noRecordFound"/></div>
              <h3 className="gx-font-weight-bold gx-my-4"><IntlMessages id="tickets.noTicketRaised"/></h3>
              <Button type="primary" onClick={this.onToggleAddTicket}><IntlMessages
                id="tickets.raiseATicket"/></Button>
            </div>
          </div>}
        {showAddTicket ? <RaiseTicketModal formOptions={formOptions}
                                           onToggleAddTicket={this.onToggleAddTicket}
                                           showAddTicket={showAddTicket}
                                           onRaiseNewTicket={this.props.onRaiseNewTicket}
                                           fetchStart={this.props.fetchStart}
                                           fetchSuccess={this.props.fetchSuccess}
                                           fetchError={this.props.fetchError}
        /> : null}
      </div>

    );
  }
}

const mapPropsToState = ({ticketsData, commonData}) => {
  const {raisedTickets, totalTickets, formOptions} = ticketsData;
  const {updatingContent} = commonData;
  return {raisedTickets, totalTickets, formOptions, updatingContent};
};

export default connect(mapPropsToState, {
  onGetRaisedTickets, onGetFormOptions, onRaiseNewTicket,
  fetchSuccess, fetchError, fetchStart
})(injectIntl(TicketList));

TicketList.defaultProps = {
  raisedTickets: [],
  totalTickets: null,
  formOptions: {
    services: [],
    departments: [],
    products: [],
    priorities: [],
    status: []
  },
};

TicketList.propTypes = {
  raisedTickets: PropTypes.array,
  totalTickets: PropTypes.number,
  formOptions: PropTypes.object
};
