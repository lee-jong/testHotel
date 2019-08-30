import { checkDuplicatedId } from '../actions/management';

// 두 패스워드가 동일한지
export const comparePasswordCheck = (pw1, pw2) => {
  if (pw1 !== pw2) return false;
  return true;
};

// 아아디 중복 체크
export const isUsableIdCheck = async id => {
  try {
    let res = await checkDuplicatedId(id);
    let resValue = res.code === 200 ? true : false;
    return resValue;
  } catch (err) {
    return false;
  }
};

// 아이디 validation 체크
export const isValidIdCheck = id => {
  let idReg = /^[a-zA-Z]{3}[_][a-zA-Z]{2}[0-9]{3}$/i;
  if (idReg.test(id)) return true;
  return false;
};

// 패스워드 validation 체크
export const isValidPasswordCheck = pw => {
  let pwReg = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;
  if (pwReg.test(pw)) return true;
  return false;
};
