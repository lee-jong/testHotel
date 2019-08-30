import React, { Component } from 'react';
import { getRepresent, modifyRepresent } from '../../actions/represent';
import Router from 'next/router';
import OptionBoxList from '../../components/list/OptionBoxList';
import Cookies from 'js-cookie';

class representModify extends Component {
  static async getInitialProps({ query }) {
    let represent;
    const { b2b_seq } = query;
    try {
      let data = {
        b2bSeq: b2b_seq
      };
      represent = await getRepresent(data);
    } catch (err) {}
    return {
      represent,
      query
    };
  }

  // RS = CODE_101 = 프론트
  // RV = CODE_101 = 예약문의
  // RS = CODE_102 = 룸 서비스
  // HK = CODE_103 = 하우스 키핑

  constructor(props) {
    super(props);

    this.state = {
      FRUseType: this.props.represent.result[0].useType,
      RVUseType: this.props.represent.result[1].useType,
      RSUseType: this.props.represent.result[2].useType,
      HKUseType: this.props.represent.result[3].useType,
      FRUseStartHour: this.props.represent.result[0].useStartTime.slice(0, 2),
      FRUseStartMin: this.props.represent.result[0].useStartTime.slice(2, 4),
      RVUseStartHour: this.props.represent.result[1].useStartTime.slice(0, 2),
      RVUseStartMin: this.props.represent.result[1].useStartTime.slice(2, 4),
      RSUseStartHour: this.props.represent.result[2].useStartTime.slice(0, 2),
      RSUseStartMin: this.props.represent.result[2].useStartTime.slice(2, 4),
      HKUseStartHour: this.props.represent.result[3].useStartTime.slice(0, 2),
      HKUseStartMin: this.props.represent.result[3].useStartTime.slice(2, 4),
      FRUseEndHour: this.props.represent.result[0].useEndTime.slice(0, 2),
      FRUseEndMin: this.props.represent.result[0].useEndTime.slice(2, 4),
      RVUseEndHour: this.props.represent.result[1].useEndTime.slice(0, 2),
      RVUseEndMin: this.props.represent.result[1].useEndTime.slice(2, 4),
      RSUseEndHour: this.props.represent.result[2].useEndTime.slice(0, 2),
      RSUseEndMin: this.props.represent.result[2].useEndTime.slice(2, 4),
      HKUseEndHour: this.props.represent.result[3].useEndTime.slice(0, 2),
      HKUseEndMin: this.props.represent.result[3].useEndTime.slice(2, 4)
    };
  }

  componentDidMount() {
    let hotelInfo = Cookies.getJSON('hotelInfo');
    let { b2b_seq, admin_id } = hotelInfo;
    if (!b2b_seq || !admin_id) {
      alert('허용된 사용자가 아닙니다.');
      const href = `/`;
      Router.push(href);
    }
  }

  goToListPage = () => {
    const hotelInfo = Cookies.getJSON('hotelInfo');
    if (confirm('수정 중인 내용을 취소합니다.') == true) {
      let href = `/represent?b2b_seq=${hotelInfo.b2b_seq}&admin_id=${
        hotelInfo.admin_id
      }`;
      Router.push(href);
    } else {
      return false;
    }
  };

  handleChangeOption = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChangeChecked = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });

    if (!e.target.checked) return;
    let id = e.target.name.slice(0, 2);
    switch (id) {
      case 'FR':
        this.setState({
          FRUseStartHour: '22',
          FRUseStartMin: '00',
          FRUseEndHour: '08',
          FRUseEndMin: '00'
        });
        break;

      case 'RV':
        this.setState({
          RVUseStartHour: '22',
          RVUseStartMin: '00',
          RVUseEndHour: '08',
          RVUseEndMin: '00'
        });
        break;

      case 'RS':
        this.setState({
          RSUseStartHour: '22',
          RSUseStartMin: '00',
          RSUseEndHour: '08',
          RSUseEndMin: '00'
        });
        break;

      case 'HK':
        this.setState({
          HKUseStartHour: '22',
          HKUseStartMin: '00',
          HKUseEndHour: '08',
          HKUseEndMin: '00'
        });
        break;
    }
  };

  FRHandleOnOffRepresent = e => {
    this.setState({ FRUseType: !this.state.FRUseType });
  };
  RVHandleOnOffRepresent = e => {
    this.setState({ RVUseType: !this.state.RVUseType });
  };
  RSHandleOnOffRepresent = e => {
    this.setState({ RSUseType: !this.state.RSUseType });
  };
  HKHandleOnOffRepresent = e => {
    this.setState({ HKUseType: !this.state.HKUseType });
  };

  offModifyRepresent = async () => {
    const {
      FRUseType,
      FRUseStartHour,
      FRUseEndHour,
      FRUseStartMin,
      FRUseEndMin,
      RVUseType,
      RVUseStartHour,
      RVUseEndHour,
      RVUseStartMin,
      RVUseEndMin,
      RSUseType,
      RSUseStartHour,
      RSUseEndHour,
      RSUseStartMin,
      RSUseEndMin,
      HKUseType,
      HKUseStartHour,
      HKUseEndHour,
      HKUseStartMin,
      HKUseEndMin
    } = this.state;
    const hotelInfo = Cookies.getJSON('hotelInfo');
    let representatives = [
      {
        groupCode: 'CODE_101',
        useType: FRUseType,
        useStartTime: FRUseType ? FRUseStartHour + FRUseStartMin : '--',
        useEndTime: FRUseType ? FRUseEndHour + FRUseEndMin : '--'
      },
      {
        groupCode: 'CODE_102',
        useType: RVUseType,
        useStartTime: RVUseType ? RVUseStartHour + RVUseStartMin : '--',
        useEndTime: RVUseType ? RVUseEndHour + RVUseEndMin : '--'
      },
      {
        groupCode: 'CODE_103',
        useType: RSUseType,
        useStartTime: RSUseType ? RSUseStartHour + RSUseStartMin : '--',
        useEndTime: RSUseType ? RSUseEndHour + RSUseEndMin : '--'
      },
      {
        groupCode: 'CODE_104',
        useType: HKUseType,
        useStartTime: HKUseType ? HKUseStartHour + HKUseStartMin : '--',
        useEndTime: HKUseType ? HKUseEndHour + HKUseEndMin : '--'
      }
    ];

    let data = {
      b2bSeq: hotelInfo.b2b_seq,
      adminId: hotelInfo.admin_id,
      representatives
    };
    if (confirm('대표 ID 설정을 수정하시겠습니까?') == true) {
      try {
        let res = await modifyRepresent(data);

        if (res.code === 200) {
          alert('수정이 완료되었습니다.');
          const href = `/represent?b2b_seq=${hotelInfo.b2b_seq}&admin_id=${
            hotelInfo.admin_id
          }`;
          Router.push(href);
        } else {
          alert('실패하셨습니다.');
        }
      } catch (err) {
        alert('실패하셨습니다.');
      }
    } else {
      return false;
    }
  };

  render() {
    const {
      FRUseStartHour,
      RVUseStartHour,
      RSUseStartHour,
      HKUseStartHour,
      FRUseStartMin,
      RVUseStartMin,
      RSUseStartMin,
      HKUseStartMin,
      FRUseEndHour,
      RVUseEndHour,
      RSUseEndHour,
      HKUseEndHour,
      FRUseEndMin,
      RVUseEndMin,
      RSUseEndMin,
      HKUseEndMin,
      FRUseType,
      RVUseType,
      RSUseType,
      HKUseType
    } = this.state;
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
                  <col style={{ width: '50%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">그룹</th>
                    <th scope="col">대표 ID 운용 여부</th>
                    <th scope="col">연결 시간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <OptionBoxList
                      title={'프론트(FR)'}
                      startTimeHour={FRUseStartHour}
                      startTimeHourName="FRUseStartHour"
                      startTimeMin={FRUseStartMin}
                      startTimeMinName="FRUseStartMin"
                      endTimeHour={FRUseEndHour}
                      endTimeHourName="FRUseEndHour"
                      endTimeMin={FRUseEndMin}
                      endTimeMinName="FRUseEndMin"
                      onChangeOption={this.handleChangeOption}
                      useTypeName={'FRUseType'}
                      useType={FRUseType}
                      handleChangeChecked={this.handleChangeChecked}
                    />
                  </tr>
                  <tr>
                    <OptionBoxList
                      title={'예약문의(RV)'}
                      startTimeHour={RVUseStartHour}
                      startTimeHourName="RVUseStartHour"
                      startTimeMin={RVUseStartMin}
                      startTimeMinName="RVUseStartMin"
                      endTimeHour={RVUseEndHour}
                      endTimeHourName="RVUseEndHour"
                      endTimeMin={RVUseEndMin}
                      endTimeMinName="RVUseEndMin"
                      onChangeOption={this.handleChangeOption}
                      useTypeName={'RVUseType'}
                      useType={RVUseType}
                      handleChangeChecked={this.handleChangeChecked}
                    />
                  </tr>
                  <tr>
                    <OptionBoxList
                      title={'룸서비스(RS)'}
                      startTimeHour={RSUseStartHour}
                      startTimeHourName="RSUseStartHour"
                      startTimeMin={RSUseStartMin}
                      startTimeMinName="RSUseStartMin"
                      endTimeHour={RSUseEndHour}
                      endTimeHourName="RSUseEndHour"
                      endTimeMin={RSUseEndMin}
                      endTimeMinName="RSUseEndMin"
                      onChangeOption={this.handleChangeOption}
                      useTypeName={'RSUseType'}
                      useType={RSUseType}
                      handleChangeChecked={this.handleChangeChecked}
                    />
                  </tr>

                  <tr>
                    <OptionBoxList
                      title={'하우스키핑(HK)'}
                      startTimeHour={HKUseStartHour}
                      startTimeHourName="HKUseStartHour"
                      startTimeMin={HKUseStartMin}
                      startTimeMinName="HKUseStartMin"
                      endTimeHour={HKUseEndHour}
                      endTimeHourName="HKUseEndHour"
                      endTimeMin={HKUseEndMin}
                      endTimeMinName="HKUseEndMin"
                      onChangeOption={this.handleChangeOption}
                      useTypeName={'HKUseType'}
                      useType={HKUseType}
                      handleChangeChecked={this.handleChangeChecked}
                    />
                  </tr>
                </tbody>
              </table>
              <div className="btn-page-wrap big">
                <p className="btn-pos-right">
                  <a onClick={this.goToListPage} className="btn-01 type-02">
                    취소
                  </a>
                  <a
                    onClick={this.offModifyRepresent}
                    className="btn-01 type-01"
                  >
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

export default representModify;
