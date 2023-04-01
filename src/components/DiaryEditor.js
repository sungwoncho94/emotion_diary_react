import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { DiaryDispatchContext } from "./../App.js";
import { getStringDate } from "./../util/date";
import { emotionList } from "../util/emotion";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [slctEmotionId, setslctEmotionId] = useState(3);
  const [content, setContent] = useState("");
  const contentRef = useRef();
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정할까요?" : "새로운 일기를 추가할까요?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, slctEmotionId);
      } else {
        onEdit(originData.id, date, content, slctEmotionId);
      }
    }
    navigate("/", { replace: true });
  };

  // 일기 삭제 함수
  const handleRemove = () => {
    if (window.confirm("일기를 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  // edit페이지에서 DiaryComponent를 랜더하면 isEdit과 originData가 변경됨 -> 이 때만 실행
  useEffect(() => {
    if (isEdit) {
      // 원래 작성된 데이터로 변경
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setslctEmotionId(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  // 감정상태 변화 함수 따로 빼기
  const handleClickEmote = useCallback((slctEmotionId) => {
    setslctEmotionId(slctEmotionId);
  }, []);

  return (
    <div>
      {/* 1. header */}
      <MyHeader
        // isEdit === true 면 헤더text 수정
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)}></MyButton>
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      ></MyHeader>
      {/* 2. 날짜 입력 */}
      <div className="DiaryEditor">
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>

        {/* 3. 감정 입력 */}
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                /* onClick 시 실행될 onClickFunc 함수를 prop으로 전달 */
                onClickFunc={handleClickEmote}
                isSelected={it.emotion_id === slctEmotionId}
              />
            ))}
          </div>
        </section>

        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 기분을 말해주세요"
              ref={contentRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
          </div>
        </section>

        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={isEdit ? "수정하기" : "작성 완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
