import React from 'react';
import isEmpty from '../../validation/isEmpty';

const ProfileHeader = props => {
    const { status, location, company, user, website, social } = props.profile;

    let socialLinks = [];
    if (social) {
        for (let key in social) {
            const link = (
                <a className="text-white p-2"
                    key={key}
                    href={social[key].includes('://')
                        ? social[key]
                        : 'http://' + social[key]
                    }
                    target='_blank'>
                    <i className={`fab fa-${key} fa-2x`}></i>
                </a>
            );
            socialLinks.push(link)
        };
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-info text-white mb-3">

                    <div className="row">
                        <div className="col-4 col-md-3 m-auto">
                            <img className="rounded-circle" src={user.avatar} alt={user.name} />
                        </div>
                    </div>

                    <div className="text-center">
                        <h1 className="display-4 text-center">{user.name}</h1>
                        <p className="lead text-center">
                            {status} {isEmpty(company) ? null : <span>at {company}</span>}
                        </p>
                        <p>{isEmpty(location) ? null : location}</p>
                        <p>
                            {isEmpty(website) ? null : (
                                <a className="text-white p-2"
                                    href={website.includes('://')
                                        ? website
                                        : 'http://' + website
                                    }
                                    target="_blank">
                                    <i className="fas fa-globe fa-2x"></i>
                                </a>
                            )}
                            {socialLinks}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
