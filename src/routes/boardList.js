import React, { useEffect, useState } from "react";
import axios from "axios";
import "./boardList.scss";
import { useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";

const BoardList = () => {
  const [movies, setMovies] = useState([]); //화면 랜더링 1회 : 영화 상세정보
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]); //바뀔 때마다 랜더링 : 리뷰 리스트
  const [editingId, setEditingId] = useState(null);
  const [editedReview, setEditedReview] = useState("");
  const [likesReviews, setLikesReviews] = useState([]); // 사용자가 좋아요를 누른 리뷰 ID 저장
  const [isLoggedIn, setIsLoggedIn] = useState(false); //현재 로그인한 상태인지에 대한 여부
  const [user_star_rate, setUserStarRate] = useState(0); // State to store user's star rating 사용자가 생각하는 영화의 별점
  const user_liked = false;

  const location = useLocation(); //영화 이미지  click -> 각각의 movie_number 전달하기 위한 변수
  const searchParams = new URLSearchParams(location.search);
  const movieNumber = searchParams.get("movie_id"); //Home.js에서 movie_number 받을 변수

  const currentUser = localStorage.getItem("LoginID");
  useEffect(() => {
    
    if (localStorage.getItem("LoginID") != null) {
      //localStorage 에서 "LoginID"라는 key가 있으면 로그인 된 것, 아니면 게스트 모드 -> 리뷰 작성 버튼 누를 때 로그인 화면으로 이동
      
      setIsLoggedIn(true);
    } else {
      
      setIsLoggedIn(false);
    }

    console.log("Movie ID:", movieNumber);

    const params_mv = { movie_id: movieNumber };

    const fetchData = async () => {
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
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // 민경
    // fetchReviews();
  }, [movieNumber]);

  // 민경 - 게시일 받는 함수
  const formatReviewDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); // 년도의 마지막 2자리만 추출
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월을 2자리로 표시
    const day = ("0" + date.getDate()).slice(-2); // 일을 2자리로 표시
    return `${year}/${month}/${day}`;
  };

  // 민경 - 리뷰 조회 기능 추가
  // const fetchReviews = async () => {
  //   try {
  //     const response = await axios.get(`/myapp/review`); // 리뷰 정보 가져오기
  //     // 응답을 콘솔에 출력
  //     console.log("Reviews fetched successfully:", response.data);
  //     setReviews(response.data);
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error);
  //     if (error.response && error.response.status === 404) {
  //       console.error("Bad request:", error.response.data);
  //     }
  //   }
  // };
  // 민경 - 리뷰 삽입(작성) 기능 추가
  const addReview = async () => {
    if (isLoggedIn === true) {
      //로그인이 되어 있는 사용자 일때
      try {
        const response = await axios.post(`/myapp/review`, {
          useraccount: currentUser,
          movie_id: movieNumber,
          content: review,
          rating: user_star_rate,
        });
        // 응답을 콘솔에 출력
        console.log("Review added successfully:", response.data);
        setReviews([...reviews, response.data]); // 새 리뷰를 추가
        setReview("");
      } catch (error) {
        console.error("Error adding review:", error);
        if (error.response && error.response.status === 404) {
          console.error("Bad request:", error.response.data);
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
    setReview(e.target.value);
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

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedReview("");
  };
  const handleDelete = (user_reviewid, user_useraccount, user_movie_id) => {
    try {
      axios.delete(`/myapp/review`, {
        reviewid: user_reviewid,
        useraccount: user_useraccount,
        movie_id: user_movie_id,
      });
    } catch (e) {}
  };

  // 민경 - 좋아요 구현부
  // 좋아요를 토글하는 함수
  const handleLike = async (id) => {
    try {
      const isLiked = likesReviews.includes(id); // includes : 배열에 특정 요소가 포함되어 있는지 여부를 확인하는 함수

      // /like 업데이트하는 요청 보내기
      await axios.post(`/myapp/like`, {
        useraccount: currentUser,
        reviewid: id,
        status: !isLiked,
      });

      // /reviewlike 업데이트하는 요청 보내기
      await axios.post(`/myapp/reviewlike`, {
        useraccount: currentUser,
        reviewid: id,
        status: !isLiked,
      });

      // 리뷰 목록에서 해당 리뷰의 좋아요 수 변경
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === id
            ? {
                ...review,
                likes: isLiked ? review.likes - 1 : review.likes + 1,
              }
            : review
        )
      );

      // 좋아요 상태 업데이트
      setLikesReviews(
        isLiked
          ? likesReviews.filter((reviewId) => reviewId !== id)
          : [...likesReviews, id]
      );
    } catch (error) {
      console.error("Error updating like:", error);
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
                출시일 : {movie.releasedate}
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
          <form onSubmit={handleSubmit}>
            <textarea
              rows="3"
              placeholder="리뷰를 입력하세요"
              value={review}
              onChange={handleReviewChange}
              className="review_input_form"
              style={{ resize: 'none' }} // 크기 조절 비활성화
            ></textarea>
            {/*      영화에 대한 해당 사용자의 별점 평가       */}
            <Rating
              name="user_star_rating"
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
          <div className="reviews_box">
            <h3 className="review_start">리뷰 목록</h3>
            {reviews.map((user) => (
              <li className="reviews_lists" key={user.useraccount}>
                <span className="review_list_useraccount">
                  {user.useraccount}
                </span>
                <br />

                <span className="review_text">{user.content}</span>
                <Rating
                  name="review_star"
                  value={user.rating}
                  readOnly
                  size="small"
                />

                <br />
                <div>
                  <button
                    className={`likes_button ${user.user_liked ? "liked" : ""}`}
                    onClick={() => handleLike(user.id)}
                  >
                    {user.user_liked === false ? "♡" : "♥"}
                  </button>
                  <span className="like_count">{user.likes}</span>
                </div>
                <span className="review_date">
                  게시일: {formatReviewDate(user.creationdate)}
                </span>
                {/* 민경 - 수정 버튼을 누르면 저장 버튼으로 변경하는 함수 필요한지 확인 */}

                {isLoggedIn && user.useraccount === currentUser && (
                  <>
                    <button className="edit_button">수정</button>
                    <button className="save_button">저장</button>
                    <button className="cancel_button"  onClick={handleCancelEdit}  >  취소</button>
                    <button  className="delete_button"  onClick={() =>  handleDelete(  user.reviewId,  user.useraccount,
                          movieNumber
                        )
                      }
                    >
                      삭제
                    </button>
                  </>
                )}
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;