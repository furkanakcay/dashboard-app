import React from 'react';

function StudentDetail({ entity }) {
    return (
        <div>
            <h3>Student Details</h3>
            <p>Name: {entity.name}</p>
            <p>Email: {entity.email}</p>
            <p>Gender: {entity.gender}</p>
            <p>Grade: {entity.grade}</p>
        </div>
    );
}

export default StudentDetail;