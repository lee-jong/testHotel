import { axiosInstance, handleError, handleSuccess } from './axiosConfig';

export const getManagementsByPage = async page => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    listType: page.option,
    keyword: page.searchValue,
    b2bSeq: page.b2bSeq,
    option: {
      offset: 10 * (page.active - 1),
      limit: 10,
      sort: 'desc'
    }
  };

  return await axiosInstance
    .post('/user/getConsultantList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const getManagementsByGroup = async group => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    listType: group.option,
    keyword: group.searchValue,
    b2bSeq: group.b2bSeq,
    option: {
      offset: 10 * (group.active - 1),
      limit: 10,
      sort: 'desc'
    }
  };
  return await axiosInstance
    .post('/user/getConsultantList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const searchManagements = async search => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    listType: search.option,
    keyword: search.searchValue,
    b2bSeq: search.b2bSeq,

    option: {
      offset: 10 * (search.active - 1),
      limit: 10,
      sort: 'desc'
    }
  };
  return await axiosInstance
    .post('/user/getConsultantList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const createManagement = async management => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    userId: management.userId,
    password: management.password1,
    group: management.group,
    isRep: management.isRep,
    remarks: management.remarks,
    b2bSeq: management.b2bSeq,
    adminId: management.adminId
  };
  return await axiosInstance
    .post('/user/setConsultantAccount', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const checkDuplicatedId = async id => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    userId: id
  };
  return await axiosInstance
    .post('/user/idDuplicateCheck', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const detailManagement = async detail => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    userId: detail.id,
    adminId: detail.adminId
  };

  return await axiosInstance
    .post('/user/getConsultantInfo', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const deleteManagement = async del => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    userId: del.id,
    adminId: del.adminId
  };
  return await axiosInstance
    .post('/user/setDeletionConsultant', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const modifyManagement = async management => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    userId: management.cUserId,
    password: management.cPassword,
    isRep: management.cUseType,
    isUsed: true,
    remarks: management.cRemarks,
    adminId: management.adminId
  };

  return await axiosInstance
    .post('/user/setConsultantInfo', data)
    .then(handleSuccess)
    .catch(handleError);
};
