import {GET_DASHBOARD_DATA} from "../../constants/Dashboard";

const initialState = {
  totalTickets: null,
  totalStaff: null,
  totalCustomers: null,
  ticketsList: [],
  priorityList: [],
  recentCustomers: [],
  topStaff: [],
  staticsData:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      console.log("action.payload", action.payload.status[0].tickets_count)
      let sum = 0;
      const total = action.payload.status.map(stat => sum + stat.tickets_count);
      return {
        ...state,
        totalStaff: action.payload.roles[0].users_count,
        totalCustomers: action.payload.roles[1].users_count,
        ticketsList: action.payload.new_tickets,
        recentCustomers: action.payload.new_customers,
        topStaff: action.payload.top_staffs,
        priorityList: action.payload.priorities,
        staticsData: action.payload.new_ticket_customer,
        totalTickets: total
      };

    default: return state;
  }
}