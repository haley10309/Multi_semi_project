const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/movies',(req,res) =>{
    res.send([
        {
            'number':1,
            'movie_name' : '웡카',
            'star_rate':'4.5',
            'director' : 'Paul King',
            'img_url': 'https://newsimg.sedaily.com/2024/02/15/2D5DBZTH0H_1.jpg'
        },
        {
            'number':2,
            'movie_name' : '시민덕희',
            'star_rate':'4.2',
            'director' : '박영주',
            'img_url': 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/hu4nI6znjpdLqcq2SLfLRc3CJOQ.jpg'
        },
        {
            'number':3,
            'movie_name' : '듄2',
            'star_rate':'3.9',
            'director' : 'Denis Villeneuve',
            'img_url': 'https://image.tmdb.org/t/p/original/wv22frLmCpXDRjKj4MWFwa4eTOK.jpg'
        },
        {
            'number':3,
            'movie_name' : '듄2',
            'star_rate':'3.9',
            'director' : 'Denis Villeneuve',
            'img_url': 'https://image.tmdb.org/t/p/original/wv22frLmCpXDRjKj4MWFwa4eTOK.jpg'
        },
        {
            'number':3,
            'movie_name' : '듄2',
            'star_rate':'3.9',
            'director' : 'Denis Villeneuve',
            'img_url': 'https://image.tmdb.org/t/p/original/wv22frLmCpXDRjKj4MWFwa4eTOK.jpg'
        },
        {
            'number':3,
            'movie_name' : '듄2',
            'star_rate':'3.9',
            'director' : 'Denis Villeneuve',
            'img_url': 'https://image.tmdb.org/t/p/original/wv22frLmCpXDRjKj4MWFwa4eTOK.jpg'
        }

    ]);
});


app.listen(port,()=> console.log(`Listening on port ${port}`));
