import React, { useEffect, useState } from "react";
import axios from "axios";
import "./boardList.scss";

const BoardList = () => {
  const [movies, setMovies] = useState([]);
  // 상태 변수 정의
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [movieInfo, setMovieInfo] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedReview, setEditedReview] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/second_api/movie_info");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // 사용자가 입력한 리뷰 변경 시 호출되는 함수
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  // 리뷰 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.trim() !== "") {
      // 새로운 리뷰를 추가하고 상태 업데이트
      setReviews([
        ...reviews,
        {
          id: reviews.length + 1,
          author: "사용자",
          content: review,
          date: new Date(),
          liked: false,
        },
      ]);
      setReview("");
    }
  };

  // 리뷰 수정 시 호출되는 함수
  const handleEdit = (id, content) => {
    setEditingId(id);
    setEditedReview(content);
  };
  // 리뷰 저장 시 호출되는 함수
  const handleSaveEdit = (id) => {
    // 리뷰 수정 후 상태 업데이트
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, content: editedReview } : review
      )
    );
    setEditingId(null);
    setEditedReview("");
  };

  // 리뷰 수정 취소 시 호출되는 함수
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedReview("");
  };

  // 리뷰 삭제 시 호출되는 함수
  const handleDelete = (id) => {
    // 삭제할 리뷰를 제외한 나머지 리뷰들로 상태 업데이트
    setReviews(reviews.filter((review) => review.id !== id));
  };

  // 리뷰 좋아요 버튼 클릭 시 호출되는 함수
  const handleLike = (id) => {
    // 좋아요 상태를 토글하여 상태 업데이트
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, liked: !review.liked } : review
      )
    );
  };

  return (
    <div>
      <div className="movie_info">
        {movies.map((movie) => (
          <div key={movie.id}>
            <div className="movie_image">
              <img src={movie.img_url} alt={movie.movie_name} />
            </div>

            <div className="movie_explanation">
              movie_explanation
              <br />
              <ul className="movie_info_category">{movie.movie_name}</ul>
              <ul className="movie_info_category">별점 : {movie.star_rate}</ul>
              <ul className="movie_info_category">감독 : {movie.director}</ul>
            </div>
          </div>
        ))}
      </div>
      <div className="review_list">
        <div className="review_box">
          <h3>리뷰 작성</h3>
          <form onSubmit={handleSubmit} >
            <input
              type="text"
              placeholder="리뷰를 입력하세요"
              value={review}
              onChange={handleReviewChange}
              className="review_input_form"
            />
            <button type="submit" className="review_sumbit_button">등록</button>
          </form>
          <div className="reviews_box">
            <h3>리뷰 목록</h3>
            
              {reviews.map((r) => (
                <li className="reviews_lists"
                key={r.id}>
                  <span>{r.author}</span><br/>
                  {editingId === r.id ? (
                    <input
                      
                      type="text"
                      value={editedReview}
                      onChange={(e) => setEditedReview(e.target.value)}
                    />
                  ) : (
                    <span className="review_text">{r.content}</span>
                  )}
                  {/* 리뷰 좋아요 버튼 */}
                  <br/>
                  {!editingId && (
                    <button className="liked_button" onClick={() => handleLike(r.id)}>
                      {r.liked ? "♥" : "♡"}
                    </button>
                  )}
                  <span>{r.date.toLocaleString()}</span>
                  {editingId === r.id ? (
                    <>
                      <button onClick={() => handleSaveEdit(r.id)}>저장</button>
                      <button onClick={handleCancelEdit}>취소</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(r.id, r.content)}>
                      수정
                    </button>
                  )}
                  <button onClick={() => handleDelete(r.id)}>삭제</button>
                </li>
              ))}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
