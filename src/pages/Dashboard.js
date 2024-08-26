import React from 'react'
import { useAuth } from '../contexts/Authentification'

export default function Dashboard() {

  const {user} = useAuth();

  if(!user)
  {
    return <p>Please log in to access this page.</p>
  }

  console.log(user);
  return (
    <div>
       <h1>Welcome, {user.fullName} || ROLE: REGULAR USER</h1>
    </div>
  )
}
