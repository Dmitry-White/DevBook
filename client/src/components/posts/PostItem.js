import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { deletePost, likePost, unlikePost } from '../../actions/postActions';

class PostItem extends Component {
    onDeleteClick = post_id => {
        this.props.deletePost(post_id);
    };

    onLikeClick = post_id => {
        this.props.likePost(post_id);
    };

    onUnlikeClick = post_id => {
        this.props.unlikePost(post_id);
    };

    findUserLike = likes => {
        const { auth } = this.props;

        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else return false;
    };

    render() {
        const { post, auth, showActions } = this.props;
        return (
            <div className="posts" >
                <div className="card card-body mb-3">
                    <div className="row">

                        <div className="col-md-2">
                            <Link to="/profile">
                                <img
                                    className="rounded-circle d-none d-md-block"
                                    src={post.avatar}
                                    alt={post.name}
                                />
                            </Link>
                            <br />
                            <p className="text-center">{post.name}</p>
                        </div>

                        <div className="col-md-10">
                            <p className="lead">{post.text}</p>
                            {showActions && <span>
                                <button
                                    type="button"
                                    className="btn btn-light mr-1"
                                    onClick={() => this.onLikeClick(post._id)}
                                >
                                    <i className={classnames('fas fa-thumbs-up', {
                                        'text-info': this.findUserLike(post.likes)
                                    })} />
                                    <span className="badge badge-light">{post.likes.length}</span>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-light mr-1"
                                    onClick={() => this.onUnlikeClick(post._id)}
                                >
                                    <i className="text-secondary fas fa-thumbs-down"></i>
                                </button>
                                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">Comments</Link>
                                {post.user === auth.user.id &&
                                    <button
                                        type="button"
                                        className="btn btn-danger mr-1"
                                        onClick={() => this.onDeleteClick(post._id)}
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                }
                            </span>}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
};

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletePost, likePost, unlikePost })(PostItem);