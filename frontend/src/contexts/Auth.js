import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}


function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function login(credentials) {
    const { data } = await axios.post('http://localhost:8000/api/v1/token/', credentials);
    const refresh = data.refresh;
    localStorage.setItem('refresh', refresh);
    setCurrentUser(data);
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('refresh');
  }

  useEffect(() => {
    const refresh = localStorage.getItem('refresh');

    if (!refresh) {
      setLoading(false);
      console.log('not refresh');
      return;
    }


    axios.post('http://localhost:8000/api/v1/token/refresh/', { refresh: refresh }).then(({ data }) => {
      console.log(data)
      setCurrentUser({ access: data.access, refresh: refresh });
      console.log('user found');
      setLoading(false);
    }).catch((e) => {
      console.log(e);
      setLoading(false);
    });

  }, []);

  const value = {
    loggedIn: !!currentUser,
    currentUser,
    logout,
    login
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? (<div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>Cargando...</div>) : (children)}
    </AuthContext.Provider>
  )
}

export default AuthProvider;