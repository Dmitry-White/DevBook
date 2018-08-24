import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';

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

    onChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { handle, company, website, location, bio, githubusername, skills, errors } = this.state;
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">Let's get some information to make your profile stand out</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form action="add-experience.html">
                                <TextFieldGroup
                                    type='text'
                                    placeholder='* Profile handle'
                                    name='hanlde'
                                    value={handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                                />
                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="status">
                                        <option value="0">* Select Professional Status</option>
                                        <option value="Developer">Developer</option>
                                        <option value="Junior Developer">Junior Developer</option>
                                        <option value="Senior Developer">Senior Developer</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Student or Learning">Student or Learning</option>
                                        <option value="Instructor">Instructor or Teacher</option>
                                        <option value="Intern">Intern</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <small className="form-text text-muted">Give us an idea of where you are at in your career</small>
                                </div>
                                <TextFieldGroup
                                    type='text'
                                    placeholder='Company'
                                    name='company'
                                    value={company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Could be your own company or one you work for"
                                />
                                <TextFieldGroup
                                    type='text'
                                    placeholder='Website'
                                    name='website'
                                    value={website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Could be your own or a company website"
                                />
                                <TextFieldGroup
                                    type='text'
                                    placeholder='Location'
                                    name='location'
                                    value={location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City & state suggested (eg. Boston, MA)"
                                />
                                <TextFieldGroup
                                    type='text'
                                    placeholder='Skills'
                                    name='skills'
                                    value={skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                                />
                                <TextFieldGroup
                                    type='text'
                                    placeholder='Github Username'
                                    name='githubusername'
                                    value={githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="If you want your latest repos and a Github link, include your username"
                                />
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg" placeholder="A short bio of yourself" name="bio"></textarea>
                                    <small className="form-text text-muted">Tell us a little about yourself</small>
                                </div>

                                <div className="mb-3">
                                    <button type="button" className="btn btn-light">Add Social Network Links</button>
                                    <span className="text-muted">Optional</span>
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fab fa-twitter"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control form-control-lg" placeholder="Twitter Profile URL" name="twitter" />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fab fa-facebook"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control form-control-lg" placeholder="Facebook Page URL" name="facebook" />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fab fa-linkedin"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control form-control-lg" placeholder="Linkedin Profile URL" name="linkedin" />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fab fa-youtube"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control form-control-lg" placeholder="YouTube Channel URL" name="youtube" />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fab fa-instagram"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control form-control-lg" placeholder="Instagram Page URL" name="instagram" />
                                </div>
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

export default connect(mapStateToProps)(CreateProfile);
