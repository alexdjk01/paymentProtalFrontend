
import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/Authentification'
import axios from 'axios';
import '../css/styles.css'
import ProfileCredentials from '../layouts/ProfileCredentials'

export default function Profile() {
    const {userAuth} = useAuth();
    const [user, setUser] = useState();
    const [loggedUserEmail, setLoggedUserEmail] = useState(0);

    useEffect(() => {
        if (userAuth && userAuth.id) {
          setLoggedUserEmail(userAuth.email);
        }
      }, [userAuth]);
    
      useEffect(() => {
        const fetchUser = async () => {
          if (loggedUserEmail) {
            try {
              const response = await axios.get(`http://localhost:8080/users/${loggedUserEmail}`);
              setUser(response.data);
            } catch (err) {
              console.error("Unable to fetch user: ", err);
            }
          }
        };
    
        fetchUser();
      }, [loggedUserEmail]);

  return (
    <div>
        <h3>PROFILE PAGE</h3>
      <ProfileCredentials user = {user}/>
    </div>
  )
}
