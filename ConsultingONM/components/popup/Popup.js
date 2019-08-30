const renderPopupButton = (onCancel, onConfirm) => {
  let popup = onCancel ? (
    <div className={'popupButton'}>
      <button onClick={onConfirm}>확인</button>
      <button onClick={onCancel}>취소</button>
    </div>
  ) : (
    <div className={'popupButton'}>
      <button onClick={onConfirm}>확인</button>
    </div>
  );

  return popup;
};

const Popup = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="popupBox">
      <div className="popupBoxInner">
        <h1 className="popupTitle">{message}</h1>
        {renderPopupButton(onCancel, onConfirm)}
      </div>
    </div>
  );
};

export default Popup;
