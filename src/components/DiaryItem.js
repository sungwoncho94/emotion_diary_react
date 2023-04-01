import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { DiaryDispatchContext } from "./../App.js";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();
  const { onRemove } = useContext(DiaryDispatchContext);

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  // 날짜 객체 형식 변경
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  // 일기 삭제 함수
  const handleRemove = () => {
    if (window.confirm("선택한 일기를 삭제하시겠습니까?")) {
      onRemove(id);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="DiaryItem">
      <div
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
        onClick={() => navigate(`/diary/${id}`)}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div className="info_wrapper" onClick={() => navigate(`/diary/${id}`)}>
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton text={"삭제하기"} type={"negative"} onClick={handleRemove} />
        <MyButton
          text={"수정하기"}
          onClick={() => navigate(`/edit/${id}`)}
        ></MyButton>
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
