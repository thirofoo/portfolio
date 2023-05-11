export interface AuthContextType {
  isLoggedIn: boolean
  checkAuthentication: () => Promise<void>
}
