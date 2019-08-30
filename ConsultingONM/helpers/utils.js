export const dotdotdot = (text, maxLength = 96) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

//date 객체 규격서에 맞는 date 변경
export const getDate = date => {
  let prototypeDate = new Date(date);
  let dayDate =
    prototypeDate.getDate() < 10
      ? '0' + prototypeDate.getDate()
      : prototypeDate.getDate();

  let yearDate = prototypeDate.getFullYear();

  let monthDate =
    prototypeDate.getMonth() + 1 < 10
      ? '0' + (prototypeDate.getMonth() + 1)
      : prototypeDate.getMonth() + 1;

  let resDate = yearDate + monthDate + dayDate;
  return resDate;
};

export const getDateByExcel = date => {
  let prototypeDate = new Date(date);
  let dayDate =
    prototypeDate.getDate() < 10
      ? '0' + prototypeDate.getDate()
      : prototypeDate.getDate();

  let yearDate = prototypeDate.getFullYear();

  let monthDate =
    prototypeDate.getMonth() + 1 < 10
      ? '0' + (prototypeDate.getMonth() + 1)
      : prototypeDate.getMonth() + 1;

  let hours =
    prototypeDate.getHours() < 10
      ? '0' + prototypeDate.getHours()
      : prototypeDate.getHours();

  let minutes =
    prototypeDate.getMinutes() < 10
      ? '0' + prototypeDate.getMinutes()
      : prototypeDate.getMinutes();

  let seconds =
    prototypeDate.getSeconds() < 10
      ? '0' + prototypeDate.getSeconds()
      : prototypeDate.getSeconds();

  let resDate = yearDate + monthDate + dayDate + hours + minutes + seconds;
  return resDate;
};

//colon Time 규격서에 맞는 date로 변환
export const deleteColonFromDate = date => {
  let resDate = date.slice(0, 2) + date.slice(3, 5);
  return resDate;
};

export const weekAgoDate = date => {
  let localDate = new Date(date);
  let getDate = localDate.getDate();
  let resDate = localDate.setDate(getDate - 7);

  return resDate;
};

export const addColonToDate = date => {
  let resDate = date ? date.slice(0, 2) + ':' + date.slice(2, 4) : '00:00';

  return resDate;
};

export const toggleButton = (isRep, fuc) => {
  let onButton = <button onClick={fuc}> ON </button>;
  let offButton = <button onClick={fuc}> OFF </button>;
  let toggleBtn = isRep ? onButton : offButton;
  return toggleBtn;
};

export const HourTimeSelect = () => {
  let time = [];
  for (let i = 0; i < 24; i++) {
    let time2 =
      i < 10 ? (
        <option key={i}> {'0' + i} </option>
      ) : (
        <option key={i}> {i} </option>
      );
    time.push(time2);
  }
  return time;
};

export const MinuteTimeSelect = () => {
  let time = [];
  for (let i = 0; i < 6; i++) {
    let time2 =
      i * 10 < 10 ? (
        <option key={i}> {'0' + i} </option>
      ) : (
        <option key={i}> {i * 10} </option>
      );
    time.push(time2);
  }
  return time;
};

//시간 하이픈 넣어서 타임까지 만들어주기
//list에 뿌려주는 date 로 변환
export const hyphenDate = date => {
  let prototypeDate = new Date(date);
  let dayDate =
    prototypeDate.getDate() < 10
      ? '0' + prototypeDate.getDate()
      : prototypeDate.getDate();

  let yearDate = prototypeDate.getFullYear();

  let monthDate =
    prototypeDate.getMonth() + 1 < 10
      ? '0' + (prototypeDate.getMonth() + 1)
      : prototypeDate.getMonth() + 1;

  let hoursDate =
    prototypeDate.getHours() < 10
      ? '0' + prototypeDate.getHours()
      : prototypeDate.getHours();

  let minutes =
    prototypeDate.getMinutes() < 10
      ? '0' + prototypeDate.getMinutes()
      : prototypeDate.getMinutes();

  let getSeconds =
    prototypeDate.getSeconds() < 10
      ? '0' + prototypeDate.getSeconds()
      : prototypeDate.getSeconds();

  let resDate =
    yearDate +
    '-' +
    monthDate +
    '-' +
    dayDate +
    '\n' +
    hoursDate +
    ':' +
    minutes +
    ':' +
    getSeconds;
  return resDate;
};
