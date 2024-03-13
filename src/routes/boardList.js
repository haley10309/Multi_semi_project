import React, { useEffect, useState } from "react";
import axios from "axios";
import "./boardList.scss";
import { useLocation } from "react-router-dom";

const BoardList = () => {
  const [movies, setMovies] = useState([]); //화면 랜더링 1회 : 영화 상세정보
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]); //바뀔 때마다 랜더링 : 리뷰 리스트
  const [editingId, setEditingId] = useState(null);
  const [editedReview, setEditedReview] = useState("");
  const [likesReviews, setLikesReviews] = useState([]); // 사용자가 좋아요를 누른 리뷰 ID 저장
  const [currentUser, setCurrentUser] = useState(null); // 현재 로그인한 사용자의 계정 정보
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation(); //영화 이미지  click -> 각각의 movie_number 전달하기 위한 변수
  const searchParams = new URLSearchParams(location.search);
  const movieNumber = searchParams.get("movie_id"); //Home.js에서 movie_number 받을 변수

  useEffect(() => {
    if (localStorage.getItem("LoginID") != null) {
      //localStorage 에서 "LoginID"라는 key가 있으면 로그인 된 것, 아니면 게스트 모드 -> 리뷰 작성 버튼 누를 때 로그인 화면으로 이동
      setCurrentUser(localStorage.getItem("LoginID"));
      setIsLoggedIn(true);
    }
    console.log("Movie ID:", movieNumber);
    const params = {movie_id: movieNumber};

    const fetchData = async () => {
      try {
        const response = await axios.get(`/myapp/movie`, { params }); //영화 정보 가져오기
        console.log(response.data);
        //const response_rv = await axios.get(`/myapp/review`, { params }); //리뷰 정보 가져오기
        setMovies(response.data);
        //setReviews(response_rv.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [movieNumber]);

  // 리뷰 작성자와 현재 사용자를 비교하여 동일한 경우에만 수정 및 삭제 가능하도록 함
  const isAuthor = (useraccount) => {
    return currentUser === useraccount;
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
          likes: 0, // 좋아요 수 초기값 설정
        },
      ]);
      setReview("");
    }
  };

  const handleEdit = (id, content, useraccount) => {
    if (isAuthor(useraccount)) {
      setEditingId(id);
      setEditedReview(content);
    } else {
      alert("리뷰를 수정할 수 있는 권한이 없습니다.");
    }
  };

  const handleSaveEdit = (id, useraccount) => {
    if (isAuthor(useraccount)) {
      setReviews(
        reviews.map((review) =>
          review.id === id ? { ...review, content: editedReview } : review
        )
      );
      setEditingId(null);
      setEditedReview("");
    } else {
      alert("리뷰를 수정할 수 있는 권한이 없습니다.");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedReview("");
  };

  const handleDelete = (id, useraccount) => {
    if (currentUser && isAuthor(useraccount)) {
      setReviews(reviews.filter((review) => review.id !== id));
    } else {
      alert("리뷰를 삭제할 수 있는 권한이 없습니다.");
    }
  };

  // 좋아요를 누를 때 사용자의 계정 정보를 함께 전달하여 필요한 경우 확인할 수 있도록 함
  const handleLike = async (id) => {
    try {
      // 사용자가 이미 누른 리뷰인지 확인
      if (likesReviews.includes(id)) {
        // 좋아요 취소
        setLikesReviews(likesReviews.filter((reviewId) => reviewId !== id));

        // 좋아요 수 감소 후 상태 업데이트
        setReviews(
          reviews.map((review) =>
            review.id === id ? { ...review, likes: review.likes - 1 } : review
          )
        );

        const response = await axios.put(`/unlike/${id}`);
        const updatedReview = response.data;
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === id
              ? { ...review, likes: updatedReview.likes }
              : review
          )
        );
      } else {
        // 좋아요 추가
        setLikesReviews([...likesReviews, id]);

        // 좋아요 수 증가 후 상태 업데이트
        setReviews(
          reviews.map((review) =>
            review.id === id ? { ...review, likes: review.likes + 1 } : review
          )
        );

        const response = await axios.put(`/like/${id}`);
        const updatedReview = response.data;
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === id
              ? { ...review, likes: updatedReview.likes }
              : review
          )
        );
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <div className="the_whole_box">
      <div className="movie_info">
        {movies.map((movie) => (
          <div>
            <div className="movie_image_box">
              <img
                className="movie_image"
                src={movie.img_url}
                alt={movie.movieid}
              />
            </div>
            <div className="movie_explanation">
              <ul className="movie_info_category">{movie.title}</ul>
              <ul className="movie_info_category">
                별점 : {movie.averagerating}
              </ul>
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
          <h3>리뷰 작성</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              rows="3"
              placeholder="리뷰를 입력하세요"
              value={review}
              onChange={handleReviewChange}
              className="review_input_form"
            ></textarea>
            <button type="submit" className="review_sumbit_button">
              등록
            </button>
          </form>
          <div className="reviews_box">
            <h3>리뷰 목록</h3>
            {reviews.map((user) => (
              <li className="reviews_lists" key={user.useraccount}>
                <span>{user.useraccount}</span>
                <br />
                {editingId === user.useraccount ? (
                  <input
                    type="text"
                    value={editedReview}
                    onChange={(e) => setEditedReview(e.target.value)}
                  />
                ) : (
                  <span className="review_text">{user.content}</span>
                )}
                <br />
                <div>
                  <button
                    className="likes_button"
                    onClick={() => handleLike(user.useraccount)}
                  >
                    {user.likes % 2 === 0 ? "♡" : "♥"}
                  </button>
                  <span className="like_count">{user.likes}</span>
                </div>
                <span className="review_date">
                  게시일: {user.date.toLocaleString()}
                </span>
                {editingId === user.useraccount ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(user.useraccount, user.user_id)}
                    >
                      저장
                    </button>
                    <button onClick={handleCancelEdit}>취소</button>
                  </>
                ) : (
                  <>
                    {isAuthor(user.author) && (
                      <button
                        className="edit_button"
                        onClick={() =>
                          handleEdit(user.id, user.content, user.author)
                        }
                      >
                        수정
                      </button>
                    )}
                    {isAuthor(user.author) && (
                      <button
                        className="delete_button"
                        onClick={() => handleDelete(user.id, user.author)}
                      >
                        삭제
                      </button>
                    )}
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
