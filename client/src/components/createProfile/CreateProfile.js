import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
    state = {
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
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

        const newProfile = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };
        this.props.createProfile(newProfile, this.props.history);
    };

    render() {
        const { errors, displaySocialInputs } = this.state;

        const options = [
            { label: "* Select Professional Status", value: '0' },
            { label: "Developer", value: 'Developer' },
            { label: "Junior Developer", value: 'Junior Developer' },
            { label: "Senior Developer", value: 'Senior Developer' },
            { label: "Manager", value: 'Manager' },
            { label: "Student or Learning", value: 'Student or Learning' },
            { label: "Instructor", value: 'Instructor or Teacher' },
            { label: "Intern", value: 'Intern' },
            { label: "Other", value: 'Other' }
        ];

        let socialInputs;
        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder='Twitter Profile URL'
                        name='twitter'
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                        icon='fab fa-twitter'
                    />
                    <InputGroup
                        placeholder='Facebook Profile URL'
                        name='facebook'
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                        icon='fab fa-facebook'
                    />
                    <InputGroup
                        placeholder='Linkedin Profile URL'
                        name='linkedin'
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                        icon='fab fa-linkedin'
                    />
                    <InputGroup
                        placeholder='YouTube Profile URL'
                        name='youtube'
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                        icon='fab fa-youtube'
                    />
                    <InputGroup
                        placeholder='Instagram Profile URL'
                        name='instagram'
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                        icon='fab fa-instagram'
                    />
                </div>
            );
        }

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">Let's get some information to make your profile stand out</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type='text'
                                    placeholder='* Profile handle'
                                    name='handle'
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname, etc"
                                />
                                <SelectListGroup
                                    name='status'
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    error={errors.status}
                                    options={options}
                                    info="Give us an idea of where you are at in your career"
                                />
                                <TextFieldGroup
                                    type='text'
                                    placeholder='Company'
                                    name='company'
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Could be your own company or one you work for"
                                />
                                <TextFieldGroup
                                    type='text'
                                    placeholder='Website'
                                    name='website'
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Could be your own or a company website"
                                />
                                <TextFieldGroup
                                    type='text'
                                    placeholder='Location'
                                    name='location'
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City & state suggested (eg. Boston, MA)"
                                />
                                <TextFieldGroup
                                    type='text'
                                    placeholder='Skills'
                                    name='skills'
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                                />
                                <TextFieldGroup
                                    type='text'
                                    placeholder='Github Username'
                                    name='githubusername'
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="If you want your latest repos and a Github link, include your username"
                                />
                                <TextAreaFieldGroup
                                    placeholder='A short bio of yourself'
                                    name='bio'
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />

                                <div className="mb-3">
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }))
                                        }}
                                    >Add Social Network Links</button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
