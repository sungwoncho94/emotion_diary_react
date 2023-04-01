import React, { useContext, useState, useEffect } from "react";
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import { DiaryStateContext } from "../App";
import DiaryList from "./../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  // 페이지마다 title 변경하기
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장`;
  }, []);

  // 1. 날짜 저장 state
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  // 2. 년월에 맞는 일기 데이터만 추출
  const [data, setData] = useState([]);

  // useEffect로 curDate가 변화할 때 다이어리 리스트에서 날짜에 맞는 일기데이터 추출
  useEffect(() => {
    if (diaryList.length >= 1) {
      // 현재 년월의 첫날
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      // 현재 년월의 마지막날
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      // 첫날~마지막날 사이의 일기 추출
      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  // 월 증가/감소 함수
  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 1));
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, 1));
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={
          <MyButton
            text={"<"}
            onClick={() => {
              decreaseMonth();
            }}
          ></MyButton>
        }
        rightChild={
          <MyButton
            text={">"}
            onClick={() => {
              increaseMonth();
            }}
          ></MyButton>
        }
      ></MyHeader>
      <DiaryList diaryList={data}></DiaryList>
    </div>
  );
};

export default Home;
