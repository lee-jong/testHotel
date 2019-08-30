const getInitSound = searchValue => {
  if (!searchValue) return;
  let iSound = '';
  for (let i = 0; i < searchValue.length; i++) {
    let index = Math.floor((searchValue.charCodeAt(i) - 44032) / 28 / 21);

    if (index >= 0) {
      iSound += initSound[index];
    }
  }

  return iSound;
};

const getMiddleSound = searchValue => {
  if (!searchValue) return;
  let middle = '';
  for (let i = 0; i < searchValue.length; i++) {
    let index = Math.floor(((searchValue.charCodeAt(i) - 44032) / 28) % 21);
    if (index >= 0) {
      middle += middleSound[index];
    }
  }
  return middle;
};

export const getFinalSound = searchValue => {
  if (!searchValue) return;
  let final = '';
  for (let i = 0; i < searchValue.length; i++) {
    let index = (searchValue.charCodeAt(i) - 44032) % 28;
    if (index >= 0) {
      final += finalSound[index];
    }
  }
  return final;
};

export const getCharacterDecomposition = value => {
  let resCharacterDecomposition = '';
  if (
    (value.charCodeAt() >= 44032 && value.charCodeAt() <= 55203) ||
    (value.charCodeAt() >= 12593 && value.charCodeAt() <= 12622) ||
    (value.charCodeAt() >= 12623 && value.charCodeAt() <= 12643)
  ) {
    try {
      for (let i = 0; i < value.length; i++) {
        let init = '';
        if (value[i].charCodeAt() >= 12593 && value[i].charCodeAt() <= 12622) {
          init = value[i];
        } else {
          let initCheck = getInitSound(value[i]);
          init = initCheck;
        }

        let middle = getMiddleSound(value[i]);
        let final = getFinalSound(value[i]);
        let decomposition = init + middle + final + '//';
        resCharacterDecomposition += decomposition;
      }
    } catch (err) {}
  } else {
    let decomposition = value + '//';
    resCharacterDecomposition = decomposition;
  }
  return resCharacterDecomposition;
};

const removeDuplicatesFromArray = (arr, prop) => {
  let newArray = [];
  let lookupObject = {};

  for (let i in arr) {
    lookupObject[arr[i][prop]] = arr[i];
  }

  for (let i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
};

export const setCharacterDecomposition = value => {
  let setSearchHistory = localStorage.getItem('searchHistory')
    ? JSON.parse(localStorage.getItem('searchHistory')).sort((a, b) =>
        a.decomposition.localeCompare(b.decomposition)
      )
    : [];

  let characterDecomposition = {
    original: value,
    decomposition: getCharacterDecomposition(value)
  };

  setSearchHistory.push(characterDecomposition);

  let removeDuplicates = removeDuplicatesFromArray(
    setSearchHistory,
    'decomposition'
  );

  // localStorage.removeItem('searchHistory');
  localStorage.setItem('searchHistory', JSON.stringify(removeDuplicates));
};

const initSound = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ'
];

const middleSound = [
  'ㅏ',
  'ㅐ',
  'ㅑ',
  'ㅒ',
  'ㅓ',
  'ㅔ',
  'ㅕ',
  'ㅖ',
  'ㅗ',
  'ㅘ',
  'ㅙ',
  'ㅚ',
  'ㅛ',
  'ㅜ',
  'ㅝ',
  'ㅞ',
  'ㅟ',
  'ㅠ',
  'ㅡ',
  'ㅢ',
  'ㅣ'
];

const finalSound = [
  '',
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅄ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ'
];
