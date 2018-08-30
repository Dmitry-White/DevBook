import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { commentPost } from '../../actions/postActions';

class CommentForm extends Component {
    state = {
        text: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    };

    onChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { user } = this.props.auth;
        const { postId } = this.props;

        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        this.props.commentPost(postId, newComment);
        this.setState({ text: '' });
    };

    render() {
        const { text, errors } = this.state;
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">Make a comment...</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <TextAreaFieldGroup
                                placeholder='Reply to the post'
                                name='text'
                                value={text}
                                onChange={this.onChange}
                                error={errors.text}
                            />
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    };
};


CommentForm.propTypes = {
    commentPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { commentPost })(CommentForm);
