import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import Spinner from '../common/Spinner';
import { getCurrentPost } from '../../actions/postActions';

class Post extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.props.getCurrentPost(id);
        }
    };

    render() {
        const { post, loading } = this.props.post;

        let postContent;

        if (post === null || loading || Object.keys(post).length === 0) {
            postContent = <Spinner />
        } else {
            postContent = (
                <Fragment>
                    <PostItem post={post} showActions={false} />
                    <CommentForm postId={post._id} />

                    <div className="comments">

                        <div className="card card-body mb-3">
                            <div className="row">
                                <div className="col-md-2">
                                    <a href="profile.html">
                                        <img className="rounded-circle d-none d-md-block" src="https://www.gravatar.com/avatar/anything?s=200&d=mm" alt="" />
                                    </a>
                                    <br />
                                    <p className="text-center">Kevin Smith</p>
                                </div>
                                <div className="col-md-10">
                                    <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus corporis sunt necessitatibus! Minus
                            nesciunt soluta suscipit nobis.</p>
                                </div>
                            </div>
                        </div>

                        <div className="card card-body mb-3">
                            <div className="row">
                                <div className="col-md-2">
                                    <a href="profile.html">
                                        <img className="rounded-circle d-none d-md-block" src="https://www.gravatar.com/avatar/anything?s=200&d=mm" alt="" />
                                    </a>
                                    <br />
                                    <p className="text-center">Karen Johnson</p>
                                </div>
                                <div className="col-md-10">
                                    <p className="lead"> Amet accusamus distinctio cupiditate blanditiis dolor? Illo perferendis eveniet cum cupiditate aliquam?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">Back to Feed</Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

Post.propTypes = {
    getCurrentPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps, { getCurrentPost })(Post);
