const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/movies", (req, res) => {
  res.send([
    {
      number: 1,
      movie_name: "웡카",
      star_rate: "4.5",
      director: "Paul King",
      img_url: "https://newsimg.sedaily.com/2024/02/15/2D5DBZTH0H_1.jpg",
    },
    {
      number: 2,
      movie_name: "시민덕희",
      star_rate: "4.2",
      director: "박영주",
      img_url:
        "https://image.tmdb.org/t/p/w600_and_h900_bestv2/hu4nI6znjpdLqcq2SLfLRc3CJOQ.jpg",
    },
    {
      number: 3,
      movie_name: "듄2",
      star_rate: "3.9",
      director: "Denis Villeneuve",
      img_url:
        "https://image.tmdb.org/t/p/original/wv22frLmCpXDRjKj4MWFwa4eTOK.jpg",
    },
    {
      number: 3,
      movie_name: "듄2",
      star_rate: "3.9",
      director: "Denis Villeneuve",
      img_url:
        "https://image.tmdb.org/t/p/original/wv22frLmCpXDRjKj4MWFwa4eTOK.jpg",
    },
    {
      number: 3,
      movie_name: "듄2",
      star_rate: "3.9",
      director: "Denis Villeneuve",
      img_url:
        "https://image.tmdb.org/t/p/original/wv22frLmCpXDRjKj4MWFwa4eTOK.jpg",
    },
    {
      number: 3,
      movie_name: "듄2",
      star_rate: "3.9",
      director: "Denis Villeneuve",
      img_url:
        "https://image.tmdb.org/t/p/original/wv22frLmCpXDRjKj4MWFwa4eTOK.jpg",
    },
  ]);
});
app.get(`/second_api/movie_info`, (req, res) => {
  res.send([
    {
      movie_id: 1,
      movie_name: "웡카",
      star: "4.5",
      story: "얍얍",
      director: "Paul King",
      actors: " ",
      img_url: "https://newsimg.sedaily.com/2024/02/15/2D5DBZTH0H_1.jpg",
    },
  ]);
});
app.get(`/review`, (req, res) => {
  res.send([
    {
      user_id: "haley",
      movie_id: "웡카",
      review_id: 1,
      content: "너무 재밌네요",
      post_date: "2024.3.9",
      likes: 3,
    },
    {
      user_id: "miley",
      movie_id: "웡카",
      review_id: 2,
      content: "조니뎁 버전이 더 나은듯..",
      post_date: "2024.3.9",
      likes: 3,
    },
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
