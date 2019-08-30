import React from 'react';
import { getCharacterDecomposition } from '../../helpers/SearchHistory';

class SearchHistoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }
  componentWillReceiveProps(nextProps) {
    let searchHistory = localStorage.getItem('searchHistory')
      ? JSON.parse(localStorage.getItem('searchHistory')).sort((a, b) =>
          a.decomposition.localeCompare(b.decomposition)
        )
      : [];

    let decomposition = getCharacterDecomposition(nextProps.searchValue);
    let unitedHistory = searchHistory.map(
      item =>
        item.decomposition.slice(0, decomposition.length - 2) ===
        decomposition.slice(0, decomposition.length - 2)
    );
    let firstIndex = unitedHistory.indexOf(true);
    let lastIndex = unitedHistory.lastIndexOf(true);
    let findHistory = searchHistory.slice(firstIndex, lastIndex + 1);
    let getHistory = findHistory.slice(0, 5);
    this.setState({ list: getHistory });
  }

  render() {
    const { list } = this.state;
    const { onClickChange, onSearchHistory } = this.props;
    return (
      <>
        {onSearchHistory ? (
          <div className="input-dropdown">
            {list.map((item, index) => (
              <a
                key={index}
                onMouseDown={onClickChange}
                searchtext={item.original}
              >
                {item.original}
              </a>
            ))}
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}
export default SearchHistoryList;
