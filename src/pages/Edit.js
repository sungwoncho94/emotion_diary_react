import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();
  // 현재 전달받은 id 꺼내기
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);

  // target Diary Data 저장
  const [originData, setOriginData] = useState();

  // 페이지마다 title 변경하기
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  // edit 컴포넌트가 mount 되었을 때 수정하려는 일기데이터 가져오기
  // id가 변하거나 diaryList가 변할때만 일기 데이터 꺼내오기
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        // target의 id와 수정페이지의 id가 동일하도록 Int로 변경해줌
        (it) => parseInt(it.id) === parseInt(id)
      );
      console.log(targetDiary);

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        // 존재하지 않는 id를 불러올 경우 undefined(falsy)한 값으로 인식
        alert("일기가 존재하지 않습니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  // originData가 있으면 DiaryEditor을 return함
  return (
    <div>
      {/* Diary 컴포넌트에서는 isEdit과 originData를 받아서 수정폼으로 변환시켜줌 */}
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

// 원래 있던 return <div></div>는 삭제

export default Edit;
