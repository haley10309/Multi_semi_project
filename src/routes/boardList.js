/* BoardList.js */
import React, { useEffect, useState } from "react";
import axios from "axios";

const BoardList = () => {
    const [boardList, setBoardList] = useState([]);
  
    const getBoardList = async () => {
      const resp = await (await axios.get('//localhost:8080/board')).data; // 2) 게시글 목록 데이터에 할당  
      setBoardList(resp.data); // 3) boardList 변수에 할당
      console.log(boardList);
    }
  
    useEffect(() => {
      getBoardList(); // 1) 게시글 목록 조회 함수 호출
    }, []);
  
    return (
      <div>
        게시판 목록 출력
      </div>
    );
  };

export default BoardList;
