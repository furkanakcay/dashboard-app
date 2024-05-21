import React, { useState } from 'react';

function EmployeeForm({ department, onSave, closeModal }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [salary, setSalary] = useState('');
    const [gender, setGender] = useState('Male');
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!name.trim()) {
            setError('Name is required');
            return;
        }
        if (email && !/^\S+@\S+\.\S+$/.test(email)) {
            setError('Email is not valid');
            return;
        }
        if (parseFloat(salary) < 0) {
            setError('Salary must not be a negative value');
            return;
        }
        onSave({ name, email, title, salary, gender });
    };

    return (
        <div>
            <h3>Create Employee in {department.name}</h3>
            <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                }}
            />
            <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                }}
            />
            <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <input
                type="number"
                placeholder="Enter salary"
                value={salary}
                onChange={(e) => {
                    setSalary(e.target.value);
                    setError('');
                }}
            />
            <div className="employee-form-gender">
                <label>
                    <input
                        type="radio"
                        value="Male"
                        checked={gender === 'Male'}
                        onChange={() => setGender('Male')}
                    />
                    Male
                </label>
                <label>
                    <input
                        type="radio"
                        value="Female"
                        checked={gender === 'Female'}
                        onChange={() => setGender('Female')}
                    />
                    Female
                </label>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleSave}>Save</button>
            <button className="button-cancel" onClick={closeModal}>Cancel</button>
        </div>
    );
}

export default EmployeeForm;
