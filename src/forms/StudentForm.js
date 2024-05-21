import React, { useState } from 'react';

function StudentForm({ course, onSave, closeModal }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [grade, setGrade] = useState('');
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

        onSave({ name, email, gender, grade });
    };

    return (
        <div>
            <h3>Create Student in {course.name}</h3>
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
                placeholder="Enter grade"
                value={grade}
                onChange={(e) => {
                    setGrade(e.target.value);
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

export default StudentForm;
