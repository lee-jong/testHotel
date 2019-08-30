import { axiosInstance, handleError, handleSuccess } from './axiosConfig';
import { getDate } from '../helpers/utils';

export const getWorkHistory = async page => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    listType: page.option,
    keyword: page.searchValue,
    b2bSeq: page.b2bSeq,
    option: {
      offset: 10 * (page.active - 1),
      limit: 10,
      startTime: getDate(page.startDate),
      endTime: getDate(page.endDate),
      sort: 'desc'
    }
  };

  return await axiosInstance
    .post('/etc/getTransactionList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const getWorkHistoryByDate = async date => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    listType: date.option,
    keyword: date.searchValue,
    b2bSeq: date.b2bSeq,
    option: {
      offset: 10 * 0,
      limit: 10,
      startTime: getDate(date.startDate),
      endTime: getDate(date.endDate),
      sort: 'desc'
    }
  };
  return await axiosInstance
    .post('/etc/getTransactionList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const getHistoryByGroup = async group => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    listType: group.option,
    keyword: group.searchValue,
    b2bSeq: group.b2bSeq,
    option: {
      offset: 10 * (group.active - 1),
      limit: 10,
      startTime: getDate(group.startDate),
      endTime: getDate(group.endDate),
      sort: 'desc'
    }
  };

  return await axiosInstance
    .post('/etc/getTransactionList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const searchHistory = async search => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    listType: search.option,
    keyword: search.searchValue,
    b2bSeq: search.b2bSeq,
    option: {
      offset: 10 * (search.active - 1),
      limit: 10,
      startTime: getDate(search.startDate),
      endTime: getDate(search.endDate),
      sort: 'desc'
    }
  };
  return await axiosInstance
    .post('/etc/getTransactionList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const getTransactionListExcel = async excel => {
  let data = {
    responseType: 'arraybuffer',
    b2bSeq: excel.b2bSeq,
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    listType: excel.option,
    keyword: excel.searchValue,
    option: {
      startTime: getDate(excel.startDate),
      endTime: getDate(excel.endDate)
    }
  };
  return await axiosInstance
    .post('/etc/getTransactionListExcel', data)
    .then(handleSuccess)
    .catch(handleError);
};
