import React from 'react';
import Moment from 'react-moment';

const ProfileCreds = props => {
    const { experience, education } = props;

    const expItems = experience.map((exp, index) => (
        <li key={index} className="list-group-item">
            <h4>{exp.company}</h4>
            <p>
                <Moment format='MMMM DD, YYYY'>{exp.from}</Moment>
                {' - '}
                {exp.to ? <Moment format='MMMM DD, YYYY'>{exp.to}</Moment> : 'Current'}
            </p>
            <p>
                <strong>Position: </strong>
                {exp.title}
            </p>
            {exp.location && <p>
                <strong>Location: </strong>
                {exp.location}
            </p>}
            {exp.description && <p>
                <strong>Description: </strong>
                {exp.description}
            </p>}
        </li>
    ));

    const eduItems = education.map((edu, index) => (
        <li key={index} className="list-group-item">
            <h4>{edu.school}</h4>
            <p>
                <Moment format='MMMM DD, YYYY'>{edu.from}</Moment>
                {' - '}
                {edu.to ? <Moment format='MMMM DD, YYYY'>{edu.to}</Moment> : 'Current'}
            </p>
            <p>
                <strong>Degree: </strong>
                {edu.degree}
            </p>
            <p>
                <strong>Field Of Study: </strong>
                {edu.fieldofstudy}
            </p>
            {edu.description && <p>
                <strong>Description: </strong>
                {edu.description}
            </p>}
        </li>
    ));

    return (
        <div className="row">
            <div className="col-md-6">
                <h3 className="text-center text-info">Experience</h3>
                {expItems.length > 0
                    ? <ul className="list-group">
                        {expItems}
                    </ul>
                    : <p className="text-center">No experience listed</p>
                }
            </div>

            <div className="col-md-6">
                <h3 className="text-center text-info">Education</h3>
                {eduItems.length > 0
                    ? <ul className="list-group">
                        {eduItems}
                    </ul>
                    : <p className="text-center">No education listed</p>
                }
            </div>
        </div>
    );
};

export default ProfileCreds;
