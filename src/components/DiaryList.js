import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
    { value: "lastest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
    { value: "all", name: "전부" },
    { value: "good", name: "좋은 감정만" },
    { value: "bad", name: "안좋은 감정만" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
    return (
        <select
            className="ControlMenu"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {optionList.map((it, idx) => (
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            ))}
        </select>
    );
});

const DiaryList = ({ diaryList }) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState("lastest");
    const [filter, setFilter] = useState("all");

    // 선택한 필터대로 일기 데이터 정렬
    const getProcessedDiaryList = () => {
        // 감정 필터 함수
        const filterCallBack = (item) => {
            if (filter === "good") {
                return parseInt(item.emotion) < 3;
            } else {
                return parseInt(item.emotion) > 3;
            }
        };

        // 비교함수
        const compare = (a, b) => {
            if (sortType === "lastest") {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };
        const copyList = JSON.parse(JSON.stringify(diaryList));

        // 감정필터 적용하기
        const filteredList =
            filter === "all"
                ? copyList
                : copyList.filter((it) => filterCallBack(it));

        const sortedList = filteredList.sort(compare);
        return sortedList;
    };

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu
                        value={sortType}
                        onChange={setSortType}
                        optionList={sortOptionList}
                    />
                    <ControlMenu
                        value={filter}
                        onChange={setFilter}
                        optionList={filterOptionList}
                    />
                </div>
                <div className="right_col">
                    <MyButton
                        type={"positive"}
                        text={"새 일기쓰기"}
                        onClick={() => navigate("/new")}
                    ></MyButton>
                </div>
            </div>

            {diaryList.length === 0 ? (
                <span className="noDiary">이번달 일기가 없습니다 ㅠㅁㅠ</span>
            ) : (
                getProcessedDiaryList().map((it) => (
                    <DiaryItem key={it.id} {...it}></DiaryItem>
                ))
            )}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;
