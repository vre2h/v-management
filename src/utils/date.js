import moment from 'moment';

export const formatDate = (date) =>
  moment(date, 'MM-DD-YYYY').format('MMMM Do YYYY');

export default undefined;
