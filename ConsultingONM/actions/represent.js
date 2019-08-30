import { axiosInstance, handleError, handleSuccess } from './axiosConfig';

export const getRepresent = async rep => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    b2bSeq: rep.b2bSeq
  };
  return await axiosInstance
    .post('/etc/getRepresentativeInfo', data)
    .then(handleSuccess)
    .catch(handleError);
};
export const modifyRepresent = async modify => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    b2bSeq: modify.b2bSeq,
    representatives: modify.representatives,
    adminId: modify.adminId
  };
  return await axiosInstance
    .post('/etc/setRepresentativeInfo', data)
    .then(handleSuccess)
    .catch(handleError);
};
