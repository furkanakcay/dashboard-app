import React from 'react';

function EmployeeDetail({ entity }) {
    return (
        <div>
            <h3>Employee Details</h3>
            <p>Name: {entity.name}</p>
            <p>Email: {entity.email}</p>
            <p>Title: {entity.title}</p>
            <p>Gender: {entity.gender}</p>
            <p>Salary: {entity.salary}</p>
        </div>
    );
}

export default EmployeeDetail;
