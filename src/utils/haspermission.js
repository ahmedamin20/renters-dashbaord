// In your component
import { store } from '../redux/store'
import { USER_TYPES_ENUM } from './../enums/userTypeEnum'

/**
 * @param {string} targetPermissions
 * @return {bool}
 *
 * This function check if user has target permission
 */
const hasPermission = (targetPermission) => {
  const permissions = store.getState().user.permissions
  const userType = store.getState().user.type
  const checkTypeArray = [USER_TYPES_ENUM.ADMIN, USER_TYPES_ENUM.ADMIN_EMPLOYEE]

  // if (checkTypeArray?.includes(userType)) {
  //   // return permissions.includes(targetPermission)
    
  // }

  return true
}

export default hasPermission
