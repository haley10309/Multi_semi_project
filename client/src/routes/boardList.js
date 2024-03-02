/* BoardList.js */
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import "./boarList.scss";

class BoardList extends Component {
  render() {
    return (
      <div>
        <div className="movie_info">
          <div className="movie_image">movie_image</div>
          <div className="movie_explanation">movie_explanation</div>
        </div>
        <div className="review_list">movie review</div>
      </div>
    );
  }
}

export default BoardList;
