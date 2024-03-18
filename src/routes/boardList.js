import React, { useEffect, useState } from "react";
import axios from "axios";
import "./boardList.scss";
import { useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";
//import LikeButton from './likeButton';//좋아요 버튼
import { HeartOutlined, HeartFilled } from "@ant-design/icons"; //icons 모듈을 갖고온다

const BoardList = () => {
  const [movies, setMovies] = useState([]); //화면 랜더링 1회 : 영화 상세정보
  const [review, setReview] = useState(""); //사용자가 작성하는 리뷰
  const [reviews, setReviews] = useState([]); //바뀔 때마다 랜더링 : 리뷰 리스트

  const [isEditing, setIsEditing] = useState(false); //수정 여부
  const [editing_reviewid, setEditing_reviewid] = useState(null); //수정 하고자 하는 리뷰의 id
  const [editedContent, setEditedContent] = useState(""); //수정한 리뷰 내용
  const [editedRating, setEditedRating] = useState(0); //수정한 별

  const [likesReviews, setLikesReviews] = useState([]); // 사용자가 좋아요를 누른 리뷰 ID 저장
  const [isLoggedIn, setIsLoggedIn] = useState(false); //현재 로그인한 상태인지에 대한 여부
  const [user_star_rate, setUserStarRate] = useState(0); // State to store user's star rating 사용자가 생각하는 영화의 별점
  const user_liked = false;

  const location = useLocation(); //영화 이미지  click -> 각각의 movie_number 전달하기 위한 변수
  const searchParams = new URLSearchParams(location.search);
  const movieNumber = parseInt(searchParams.get("movie_id")); //Home.js에서 movie_number 받을 변수 * String -> int로 형변환 *

  const currentUser = localStorage.getItem("LoginID");

  // 민경 - 리뷰 데이터를 가져오는 함수
  const fetchData = async () => {
    const params_mv = { movie_id: movieNumber };
    try {
      //영화 정보 가져오는 request
      const response = await axios.get(`/myapp/movie`, { params: params_mv }); //영화 정보 가져오기
      console.log(response.data);
      //리뷰 정보 가져오는 request
      const response_rv = await axios.get(`/myapp/review`, {
        params: {
          movie_id: movieNumber, //해당 영화 id
          likeuseraccount: currentUser, //현재 접속한 사용자의 id -> 리뷰들에 대한 좋아요를 눌렀는지 확인
        },
      });
      //리뷰 정보 저장
      setMovies(response.data);
      setReviews(response_rv.data);
    } catch (error) {
      console.error("리뷰 정보 저장 오류:", error);
    }
  };

  useEffect(() => {
    fetchData(); // fetchData 함수 호출

    if (localStorage.getItem("LoginID").toLowerCase() !== "guest") {
      //localStorage 에서 "LoginID"라는 key가 있으면 로그인 된 것, 아니면 게스트 모드 -> 리뷰 작성 버튼 누를 때 로그인 화면으로 이동
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  console.log("Movie ID:", movieNumber);
  // 수정된 리뷰의 내용을 업데이트하는 함수
  const handleEditedContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  // 수정된 리뷰의 평점을 업데이트하는 함수
  const handleEditedRatingChange = (newValue) => {
    setEditedRating(newValue.target.value);
  };

  // 민경 - 게시일 받는 함수
  const formatReviewDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); // 년도의 마지막 2자리만 추출
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월을 2자리로 표시
    const day = ("0" + date.getDate()).slice(-2); // 일을 2자리로 표시
    const hours = ("0" + date.getHours()).slice(-2); // 시간을 2자리로 표시
    const minutes = ("0" + date.getMinutes()).slice(-2); // 분을 2자리로 표시
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  // 민경 - 출시일을 YY/MM/DD 형식으로 변환하는 함수
  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월을 2자리로 표시
    const day = ("0" + date.getDate()).slice(-2); // 일을 2자리로 표시
    return `${year}/${month}/${day}`;
  };

  // 민경 - 리뷰 삽입(작성) 기능 추가
  const addReview = async (e) => {
    e.preventDefault(); // 기본 동작 중지
    if (isLoggedIn === true) {
      //로그인이 되어 있는 사용자 일때
      const requestData = {
        useraccount: currentUser,
        movie_id: movieNumber,
        content: review,
        rating: user_star_rate,
      };
      try {
        const response = await axios.post(`/myapp/review`, requestData);
        if (response.status === 200) {
          console.log("로그인 성공");
        }
        // 응답을 콘솔에 출력
        console.log("리뷰 작성 성공:", response.data);
        //fetchData(); // 리뷰를 추가한 후에 다시 데이터를 가져오도록 fetchData 함수 호출
  
        setReviews(response.data);
        setReview("");
        setUserStarRate(0);
        window.location.reload();
      } catch (error) {
        console.error("리뷰 작성 중 오류 발생:", error);
        if (error.response && error.response.status === 404) {
          console.error("잘못된 요청:", error.response.data);
        }
      }
    } else {
      //로그인이 안되어 있을 때
      alert("로그인 후 사용해주세요.");
    }
  };

  //별점 value변화 할 때마다 호출 -> 저장
  const handleStarRatingChange = (event, newValue) => {
    setUserStarRate(newValue); // Update user's star rating
  };

  const handleReviewChange = (e) => {
    //리뷰 작성시 내용을 실시간으로 review객체에 넣음
    setReview(e.target.value);
  };

  const handleCancelEdit = () => {
    setEditing_reviewid(null);
    setEditedContent("");
    setIsEditing(false);
  };
  const handleDelete = async (user_reviewid, user_useraccount) => {
    //삭제 요청 함수
    console.log("리뷰 아이디: " + user_reviewid);
    console.log("리뷰 쓴 사람" + user_useraccount);
    try {
      const response = await axios.delete(`/myapp/review`, {
        //삭제 요청
        params: { reviewid: user_reviewid }, // Passing reviewid as a parameter
        data: {
          // Passing useraccount and movie_id in the request body
          useraccount: user_useraccount,
          movie_id: movieNumber,
        },
      });
      setReviews(response.data);
      console.log("Delete response:", response.data);
      window.location.reload();
    } catch (e) {
      console.error("리뷰 삭제 중 오류 발생:", e);
    }
  };

  const startEdit = async (reviewid, content, rating) => {
    setEditing_reviewid(reviewid);
    setIsEditing(true);
    setEditedContent(content);
    setEditedRating(rating);
  };
  const handleSubmitEdit = async (editingId) => {
    console.log(
      "리뷰 아이디: " + editingId,
      "\n 수정된 리뷰 내용 : " + editedContent + "\n movie_id: " + movieNumber
    );
    console.log("현재 사용자 id : " + currentUser);
    console.log("별점 : " + editedRating);
    try {
      const response = await axios.put("/myapp/review", {
        useraccount: currentUser,
        reviewid: editingId,
        movie_id: movieNumber,
        content: editedContent,
        rating: editedRating,
      });
      setReviews(response.data);

      alert("수정 완료 되었습니다.");
      window.location.reload();
    } catch (error) {
      console.log("리뷰 수정 오류 : " + error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.trim() !== "") {
      setReviews([
        ...reviews,
        {
          id: reviews.length + 1,
          author: currentUser,
          content: review,
          date: new Date(),
          likes: 0,
        },
      ]);
      setReview("");
      setUserStarRate(0); // Reset the user's star rating after submitting the review
    }
  };

  // 민경 - 좋아요 구현부
  // 좋아요 토글 함수
  const handleLike = async (reviewId) => {
    try {
      const isLiked = likesReviews.includes(reviewId);

      // 서버로 전송할 데이터 준비
      const requestData = {
        useraccount: currentUser,
        reviewid: reviewId,
      };

      // /reviewlike 엔드포인트로 POST 요청 보내기
      await axios.post(`/myapp/reviewlike`, requestData);

      // 리뷰 목록에서 해당 리뷰의 좋아요 수 변경 및 사용자의 좋아요 상태 업데이트
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                likes: isLiked ? review.likes - 1 : review.likes + 1,
                user_liked: !isLiked, // 사용자의 좋아요 상태 업데이트
              }
            : review
        )
      );

      // 좋아요 상태 업데이트 후에 fetchData 함수를 호출하여 해당 영역을 새로 고침
      fetchData();

      // 좋아요 상태 업데이트
      setLikesReviews(
        isLiked
          ? likesReviews.filter((id) => id !== reviewId) // 좋아요 취소한 경우
          : [...likesReviews, reviewId] // 좋아요 한 경우
      );
    } catch (error) {
      console.error("좋아요 업데이트 중 오류 발생:", error);
    }
  };

  //=============handleLike ================

  return (
    <div className="the_whole_box">
      <div className="movie_info">
        {movies.map((movie) => (
          <div>
            <div className="movie_image_box">
              <img
                className="movie_image"
                src={movie.img_url}
                alt={movie.movie_id}
              />
            </div>
            <div className="movie_explanation">
              <ul className="movie_info_category_title">{movie.title}</ul>
              <ul className="movie_info_category">
                별점 : {movie.averagerating}
              </ul>
              <Rating
                name="movie_star_rating"
                value={movie.averagerating}
                readOnly
              />
              <ul className="movie_info_category">감독 : {movie.director}</ul>
              <ul className="movie_info_category">출연 : {movie.actors}</ul>
              <ul className="movie_info_category">
                출시일 : {formatReleaseDate(movie.releasedate)}
              </ul>
              <ul className="movie_info_category">
                줄거리 : {movie.description}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="review_list">
        <div className="review_box">
          <br />
          <h3 className="review_start"> 리뷰 작성</h3>
          <form>
            <textarea
              rows="3"
              placeholder="리뷰를 입력하세요"
              value={review}
              onChange={handleReviewChange}
              className="review_input_form"
              style={{ resize: "none" }} // 크기 조절 비활성화
            ></textarea>
            {/*      영화에 대한 해당 사용자의 별점 평가       */}
            <Rating
              name={`movie_id`}
              value={user_star_rate}
              onChange={handleStarRatingChange}
              size="large"
            />
            <button
              type="submit"
              className="review_submit_button"
              onClick={addReview}
            >
              등록
            </button>
          </form>

          {/*================================ 리뷰 ================================*/}
          <div className="reviews_box">
            <h3 className="review_start">리뷰 목록</h3>
            {/* 리뷰 목록을 게시일 기준으로 정렬하여 출력 (최신순) */}
            {reviews.sort((a, b) => new Date(b.creationdate) - new Date(a.creationdate)).map((review) => (
              <li className="reviews_lists" key={review.useraccount}>
                <span className="review_list_useraccount">
                  {review.useraccount}
                </span>
                
                <br/>
                <span className="review_date">
                  게시일: {formatReviewDate(review.creationdate)}
                </span>
                <br/>
                
                {/* 수정버튼을 눌렀을 때의 상태 */}
                {isEditing && editing_reviewid === review.reviewid && (
                  <>
                    <textarea
                    
                      rows="3"
                      value={editedContent}
                      onChange={handleEditedContentChange}
                      className="review_input_form"
                      style={{ resize: "none" }} // 크기 조절 비활성화
                    >
                      {review.content}
                    </textarea>
                    <br/>
                    <Rating
                      name="review_star"
                      //defaultValue={review.rating}
                      value={editedRating}
                      onChange={handleEditedRatingChange}
                      size="small"
                    />
                  </>
                )}
                {/* 평소 상태(수정 버튼 안 눌렀을 때) && editingId !== review.reviewid */}
                {editing_reviewid !== review.reviewid && (
                  <>
                    <span className="review_text">{review.content}</span>
                    <br/>
                    <Rating
                      name="review_star"
                      value={review.rating}
                      readOnly
                      size="small"
                    />
                  </>
                )}

                <br />
                <div>
                  {/* ========좋아요==========  */}
                  {review.user_liked ? (
                    <HeartFilled
                      style={{ color: "red", fontSize: "24px" }}
                      onClick={() => handleLike(review.reviewid)}
                    />
                    
                  ) : (
                    <HeartOutlined
                      style={{ fontSize: "24px" }}
                      onClick={() => handleLike(review.reviewid)}
                    />
                  )}

                  <span className="like_count">{review.likes}</span>
                  {/* ========좋아요==========  */}
                
                
                {/* ================= 수정 버튼 누를 조건================= */}
                {!isEditing &&
                  isLoggedIn &&
                  review.useraccount === currentUser && (
                    <>
                      <button
                        className="edit_button"
                        onClick={() =>
                          startEdit(
                            review.reviewid,
                            review.content,
                            review.rating
                          )
                        }
                      >
                        수정
                      </button>
                    </>
                  )}
                {/* ================= 저장 + 취소 버튼 누를 조건================= */}
                {isEditing && editing_reviewid === review.reviewid && (
                  <>
                    <button
                      className="save_button"
                      onClick={() => handleSubmitEdit(review.reviewid)}
                    >
                      저장
                    </button>
                    <button
                      className="cancel_button"
                      onClick={() => handleCancelEdit()}
                    >
                      취소
                    </button>
                  </>
                )}
                {/* ================= 삭제 버튼 누를 조건================= */}

                {!isEditing &&
                  isLoggedIn &&
                  review.useraccount === currentUser && (
                    <>
                      <button
                        className="delete_button"
                        onClick={() =>
                          handleDelete(review.reviewid, review.useraccount)
                        }
                      >
                        삭제
                      </button>
                    </>
                  )}
                  </div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;


