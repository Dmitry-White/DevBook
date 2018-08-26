import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { deleteExperience } from '../../actions/profileActions';

const Experience = props => {
    const onDeleteClick = (e, id) => {
        e.preventDefault();
        props.deleteExperience(id);
    };

    const experience = props.experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {' '}
                {exp.to === null ? 'Now' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={e => onDeleteClick(e, exp._id)}
                >Delete</button>
            </td>
        </tr>
    ));

    return (
        <div>
            <h4 className="mb-2">Experience Credentials</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {experience}
                </tbody>
            </table>
        </div>
    );
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
