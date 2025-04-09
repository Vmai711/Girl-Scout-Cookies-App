import { db } from './firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/authContext';
import { useState, useEffect } from 'react';

export const fetchUserRole = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));

        if (userDoc.exists()) {
            const data = userDoc.data();
            
            // Ensure role is always an array (Does not work)
            const roles = Array.isArray(data.role) ? data.role : [data.role];
            
            return {
                roles: roles || [],
                currentRole: data.currentRole || null,  
            };
        } else {
            console.error("No such user document!");
            return { roles: [], currentRole: null };
        }
    } catch (error) {
        console.error("Error fetching user role:", error);
        return { roles: [], currentRole: null };
    }
};


export const useUserRole = () => {
  const { currentUser } = useAuth(); 
  const [userRole, setUserRole] = useState({ roles: [], currentRole: null }); 
  const [loading, setLoading] = useState(true); // 👈 Add loading state

  useEffect(() => {
    if (currentUser) {
      const fetchRole = async () => {
        const roleData = await fetchUserRole(currentUser.uid);
        setUserRole(roleData);
        setLoading(false); // ✅ Done loading
      };

      fetchRole();
    } else {
      setLoading(false); // ✅ Done even if no user
    }
  }, [currentUser]);

  return { ...userRole, loading }; // 👈 Return loading
};

