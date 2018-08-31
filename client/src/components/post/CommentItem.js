import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CommentItem extends Component {

    render() {
        const { comment } = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">

                    <div className="col-md-2">
                        <Link to="/profile">
                            <img
                                className="rounded-circle d-none d-md-block"
                                src={comment.avatar}
                                alt={comment.name}
                            />
                        </Link>
                        <br />
                        <p className="text-center">{comment.name}</p>
                    </div>

                    <div className="col-md-10">
                        <p className="lead">{comment.text}</p>
                    </div>

                </div>
            </div>
        )
    }
};

CommentItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(CommentItem);