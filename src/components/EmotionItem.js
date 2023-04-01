import React from "react";

const emotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClickFunc,
  isSelected,
}) => {
  return (
    /* prop으로 전달받은 onClickFunc을 onClick에 연결 */
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `off`,
      ].join(" ")}
      onClick={() => onClickFunc(emotion_id)}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(emotionItem);
