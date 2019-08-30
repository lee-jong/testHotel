import React, { Component } from 'react';
import { getRepresent } from '../../actions/represent';
import Router from 'next/router';
import RepresentUseTimeList from '../../components/list/RepresentUseTimeList';
import Cookies from 'js-cookie'

class Represent extends Component {
  static async getInitialProps({ query }) {
    let res = {};
    const { b2b_seq } = query;
    let data = {
      b2bSeq: b2b_seq
    };
    try {
      res = await getRepresent(data);
    } catch (err) {
    }
    return {
      res,
      query
    };
  }
  constructor(props) {
    super(props);

    Cookies.set('hotelInfo', this.props.query)
  }

  goToLModifyPage = async () => {
    const hotelInfo = Cookies.getJSON('hotelInfo')
    const href = `/represent/modify?b2b_seq=${hotelInfo.b2b_seq}`;
    Router.push(href);
  };

  render() {
    const { result } = this.props.res;
    return (
      <section>
        <div className="default-cell">
          <h3 className="con-title">대표 ID 설정</h3>
          <div className="table-list-data">
            <div>
              <table className="list">
                <caption>대표 ID 설정</caption>
                <colgroup>
                  <col style={{ width: 'auto' }} />
                  <col style={{ width: 'auto' }} />
                  <col style={{ width: 'auto' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">그룹</th>
                    <th scope="col">대표 ID 운용 여부</th>
                    <th scope="col">연결 시간</th>
                  </tr>
                </thead>
                <tbody>
                  <RepresentUseTimeList timeList={result} />
                </tbody>
              </table>
              <div className="btn-page-wrap big">
                <p className="btn-pos-right">
                  <a onClick={this.goToLModifyPage} className="btn-01 type-01">
                    수정
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Represent;
