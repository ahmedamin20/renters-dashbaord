import { useSelector } from 'react-redux'
import Login from './modules/auth/pages/Login/login'
const withGuard = (Component) => {
  const Wrapper = (props) => {
    const isLoggedIn = useSelector((state) => state.user.loggedIn)
    return isLoggedIn === true ? <Component {...props} /> : <Login />
  }
  return Wrapper
}
export default withGuard
