const MyButton = ({ text, type, onClick }) => {
  // type이 전달될 때, positive or negative 가 아닌 다른 type이 들어올경우 강제로 default 로 변환
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    // className 에 배열 넣어줌 -> join을 사용하여 두 클래스 사이에 띄어쓰기를 추가하여 문자로 변환
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
