import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { db } from '../../../firebase/firebase'; // Firestore reference
import { doc, setDoc } from 'firebase/firestore';

const GoogleRoleSelection = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    
    const [role, setRole] = useState('parent-scout'); // Default role
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!currentUser) {
            navigate('/login'); // Ensure user is logged in
        }
    }, [currentUser, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsSaving(true);

        try {
            // Save user info & role in Firestore
            await setDoc(doc(db, 'users', currentUser.uid), {
                uid: currentUser.uid,
                name: currentUser.displayName,
                email: currentUser.email,
                role: role
            });

            navigate('/home'); // Redirect to home after saving
        } catch (error) {
            setIsSaving(false);
            setErrorMessage('Failed to save role. Try again.');
        }
    };

    return (
        <div>
            <h2>Choose Your Role</h2>
            <p>Signed in as: {currentUser?.email}</p>

            <form onSubmit={onSubmit}>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="parent-scout"
                        checked={role === 'parent-scout'}
                        onChange={() => setRole('parent-scout')}
                    />
                    Parent/Scout
                </label>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="cookie-manager"
                        checked={role === 'cookie-manager'}
                        onChange={() => setRole('cookie-manager')}
                    />
                    Cookie Manager
                </label>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="troop-leader"
                        checked={role === 'troop-leader'}
                        onChange={() => setRole('troop-leader')}
                    />
                    Troop Leader
                </label>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <button type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Confirm Role'}
                </button>
            </form>
        </div>
    );
};

export default GoogleRoleSelection;
