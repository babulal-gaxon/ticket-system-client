import {GET_DASHBOARD_DATA} from "../../constants/Dashboard";

const initialState = {
  totalTickets: null,
  totalStaff: null,
  totalCustomers: null,
  ticketsList: [],
  priorityList: [],
  recentCustomers: [],
  topStaff: [],
  staticsData:[],
  pendingTickets: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      let total = 0;
      action.payload.status.map(stat => total = total + parseInt(stat.tickets_count));
      let pendingTickets = 0;
      action.payload.status.map(stat => {
        if(stat.name !== "Closed") {
          pendingTickets = pendingTickets + parseInt(stat.tickets_count)
        }
      });
      return {
        ...state,
        totalStaff: action.payload.roles[0].users_count,
        totalCustomers: action.payload.roles[1].users_count,
        ticketsList: action.payload.new_tickets,
        recentCustomers: action.payload.new_customers,
        topStaff: action.payload.top_staffs,
        priorityList: action.payload.priorities,
        staticsData: action.payload.new_ticket_customer,
        totalTickets: total,
        pendingTickets: pendingTickets
      };

    default: return state;
  }
}