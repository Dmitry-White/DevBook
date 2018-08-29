import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { deletePost } from '../../actions/postActions';

class PostItem extends Component {
    onDeleteClick = post_id => {
        this.props.deletePost(post_id);
    };

    render() {
        const { post, auth } = this.props;
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
                            <button type="button" className="btn btn-light mr-1">
                                <i className="text-info fas fa-thumbs-up"></i>
                                <span className="badge badge-light">{post.likes.length}</span>
                            </button>
                            <button type="button" className="btn btn-light mr-1">
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
                        </div>

                    </div>
                </div>
            </div>
        )
    }
};

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletePost })(PostItem);