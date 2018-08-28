import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = props => {
    return (
        <div className="posts">
            <div className="card card-body mb-3">
                <div className="row">

                    <div className="col-md-2">
                        <Link to="/profile">
                            <img
                                className="rounded-circle d-none d-md-block"
                                src={props.post.avatar}
                                alt={props.post.name}
                            />
                        </Link>
                        <br />
                        <p className="text-center">{props.post.name}</p>
                    </div>

                    <div className="col-md-10">
                        <p className="lead">{props.post.text}</p>
                        <button type="button" className="btn btn-light mr-1">
                            <i className="text-info fas fa-thumbs-up"></i>
                            <span className="badge badge-light">{props.post.likes.length}</span>
                        </button>
                        <button type="button" className="btn btn-light mr-1">
                            <i className="text-secondary fas fa-thumbs-down"></i>
                        </button>
                        <a href="post.html" className="btn btn-info mr-1">Comments</a>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default PostItem;