import { useContext } from 'react'
//import AuthContext from 'src/contexts/JWTAuthContext';
import AuthContext from 'src/contexts/FirebaseAuthContext'
const useAuth = () => useContext(AuthContext)

export default useAuth
