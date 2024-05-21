import React, { useState } from 'react';

function SimpleEntityForm({ entityName, onSave, closeModal }) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!name.trim()) {
            setError(`${entityName} name is required`);
            return;
        }
        // Proceed with save action if the name is not empty
        onSave(name);
    };

    return (
        <div>
            <h3>Create {entityName}</h3>
            <input
                type="text"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                }}
                placeholder={`${entityName} Name`}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleSave}>Save</button>
            <button className="button-cancel" onClick={closeModal}>Cancel</button>
        </div>
    );
}

export default SimpleEntityForm;