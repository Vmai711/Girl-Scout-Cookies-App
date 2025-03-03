import { db } from './firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/authContext';

export const fetchUserRole = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            return userDoc.data().role; 
        } else {
            console.error("No such user document!");
            return null; // Return null if no role is found
        }
    } catch (error) {
        console.error("Error fetching user role:", error);
        return null;
    }
};

// Custom hook to use user role in components
export const useUserRole = () => {
    const { currentUser } = useAuth(); 

    const [role, setRole] = useState(null);

    useEffect(() => {
        if (currentUser) {
            const fetchRole = async () => {
                const userRole = await fetchUserRole(currentUser.uid);
                setRole(userRole);
            };
            fetchRole();
        }
    }, [currentUser]);

    return role;
};
