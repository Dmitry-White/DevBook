import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
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

        const { name, email, password, password2 } = this.state;

        const newUser = { name, email, password, password2 };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { name, email, password, password2, errors } = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create an account</h1>
                            <p className="lead text-center">It's free and always will be.</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type='text'
                                    placeholder='Name'
                                    name='name'
                                    value={name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />
                                <TextFieldGroup
                                    type='email'
                                    placeholder='Email Address'
                                    name='email'
                                    value={email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                    info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
                                />
                                <TextFieldGroup
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    value={password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />
                                <TextFieldGroup
                                    type='password'
                                    placeholder='Confirm Password'
                                    name='password2'
                                    value={password2}
                                    onChange={this.onChange}
                                    error={errors.password2}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
