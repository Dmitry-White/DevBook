import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
    componentDidMount() {
        const handle = this.props.match.params.handle;
        if (handle) {
            this.props.getProfileByHandle(handle);
        }
    };

    render() {
        const { profile, loading } = this.props.profile;
        let profileContent;

        if (profile === null || loading) {
            profileContent = <Spinner />
        } else {
            profileContent = (
                <Fragment>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileCreds
                        experience={profile.experience}
                        education={profile.education}
                    />
                    <ProfileGithub profile={profile} />
                </Fragment>
            );
        }

        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="row">
                                <div className="col-6">
                                    <Link to='/profiles' className="btn btn-light mb-3 float-left">
                                        Back To Profiles
                                    </Link>
                                </div>
                                <div className="col-6"></div>
                            </div>

                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
