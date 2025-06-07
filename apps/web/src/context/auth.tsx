import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react'

export type AuthContextProps = {
  login: (token: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const tokenKey = 'auth.user'

export const getStoredToken = () => {
  return localStorage.getItem(tokenKey)
}

const setStoredToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(tokenKey, token)
  } else {
    localStorage.removeItem(tokenKey)
  }
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(getStoredToken())
  const isAuthenticated = !!token

  const logout = useCallback(async () => {
    setStoredToken(null)
    setToken(null)
  }, [])

  const login = useCallback(async (username: string) => {
    setStoredToken(username)
    setToken(username)
  }, [])

  useEffect(() => {
    setToken(getStoredToken())
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
