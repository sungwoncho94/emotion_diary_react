import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

// 페이지 역할 js 임포트
import React, { useReducer, useRef } from "react";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

// reducer
const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }

    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }

    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }

    default:
      return state;
  }
  /* 일기데이터의 변환은 모두 reducer에서 처리되기 때문에,
  newState가 변경될때마다 reducer에서 localStorage로 저장하면됨 */
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

// context 생성
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      // dataId의 current값은 diary data에서 가져온 가장 높은 id의 +1을 해줘야 함 -> diaryList를 sort하여 가장 높은 값 가져오기
      // id기준으로 내림차순으로 정렬함수 생성
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({ type: "INIT", data: diaryList });
      }
    }
  }, []);

  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  const env = process.env;
  // PUBLIC_URL 이 존재하면 env.PUBLIC_URL 에 저장
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    // context에 데이터를 공급하기 위해 컴포넌트 전체를 Provider로 감싸기
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
