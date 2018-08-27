import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostForm from './PostForm';
import Spinner from '../common/Spinner';

class Posts extends Component {
    render() {
        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm />

                            <div className="posts">
                                <div className="card card-body mb-3">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <a href="profile.html">
                                                <img className="rounded-circle d-none d-md-block" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                                    alt="" />
                                            </a>
                                            <br />
                                            <p className="text-center">John Doe</p>
                                        </div>
                                        <div className="col-md-10">
                                            <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus corporis sunt necessitatibus! Minus
                                              nesciunt soluta suscipit nobis. Amet accusamus distinctio cupiditate blanditiis dolor? Illo perferendis
                    eveniet cum cupiditate aliquam?</p>
                                            <button type="button" className="btn btn-light mr-1">
                                                <i className="text-info fas fa-thumbs-up"></i>
                                                <span className="badge badge-light">4</span>
                                            </button>
                                            <button type="button" className="btn btn-light mr-1">
                                                <i className="text-secondary fas fa-thumbs-down"></i>
                                            </button>
                                            <a href="post.html" className="btn btn-info mr-1">Comments</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

export default Posts;
