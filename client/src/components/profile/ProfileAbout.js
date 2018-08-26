import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/isEmpty';

const ProfileAbout = props => {
    const { user, bio, skills } = props.profile;
    const firstName = user.name.trim().split(' ')[0];
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-light mb-3">
                    <h3 className="text-center text-info">{firstName}'s Bio</h3>
                    <p className="lead">
                        {isEmpty(bio)
                            ? <span>{firstName} does not have a bio</span>
                            : <span>{bio}</span>}
                    </p>
                    <hr />
                    <h3 className="text-center text-info">Skill Set</h3>
                    <div className="row">
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {skills.map((skill, index) => (
                                <div key={index} className="p-3">
                                    <i className="fa fa-check" />
                                    {` ${skill}`}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileAbout;
