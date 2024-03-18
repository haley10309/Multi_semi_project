import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';	//icons 모듈을 갖고온다
import './likeButton.scss'

class likeButton extends React.Component {
    render(){
        return(
            <div className="icons-list">
                <HeartFilled style={{ color: 'red'}}/>	
                <HeartOutlined />	
            </div>
        )
    }
}
export default likeButton;