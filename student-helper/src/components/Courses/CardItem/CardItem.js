import React from "react";
import logoImg from '../../../images/logo.png';
import {Link} from "react-router-dom";

const cardItem = props => {
    return (
        <Link className="CardItem mx-auto" to={"/"} style={{ textDecoration: 'none', color : 'black', maxWidth : '340px' }}>
            <div className="card mb-4">
                <img src={logoImg} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </Link>
    );
};

export default cardItem;