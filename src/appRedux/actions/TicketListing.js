import axios from 'util/Api'
import {SHOW_TICKETS} from "../../constants/TicketListing";

export const onGetTickets = () =>{
  return dispatch => {
axios.get("/tickets").then(response => {
  dispatch(onShowTickets(response.data))
})
  }
};

export const onShowTickets = (data) => {
  return {
    type: SHOW_TICKETS,
    payload:data
  }
}