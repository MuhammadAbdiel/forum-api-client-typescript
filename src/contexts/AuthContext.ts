import { createContext } from 'react'
import { AuthContextValue } from './types'

const AuthContext = createContext<AuthContextValue>({
  authUser: null,
  onLogout: () => {},
})

export default AuthContext
