import React from "react";

const cardItem = props => {
    const imageUrl = "https://images.unsplash.com/photo-1493847242172-d46053a1f671?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9f91dd5d50f16ba80af53a62d4caf2ce&auto=format&fit=crop&w=500&q=60";
    const backgroundImageCardStyle = {
      backgroundImage : imageUrl
    };
    return (
        <div className="CardItem">
            <div className="card hover">
                <div className="card-img"
                     style={backgroundImageCardStyle}>
                    <div className="overlay">
                        <div className="overlay-content">
                            <a className="hover" href="#">View Project</a>
                        </div>
                    </div>
                </div>

                <div className="card-content">
                    <a href="#">
                        <h2>Title</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, lorem ipsum dolor</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default cardItem;