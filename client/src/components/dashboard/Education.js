import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { deleteEducation } from '../../actions/profileActions';

const Education = props => {
    const onDeleteClick = (e, id) => {
        e.preventDefault();
        props.deleteEducation(id);
    };

    const education = props.education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {' '}
                {edu.to === null ? 'Now' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={e => onDeleteClick(e, edu._id)}
                >Delete</button>
            </td>
        </tr>
    ));

    return (
        <div>
            <h4 className="mb-2">Education Credentials</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {education}
                </tbody>
            </table>
        </div>
    );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
