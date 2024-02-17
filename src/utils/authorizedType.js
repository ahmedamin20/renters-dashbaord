// In your component
import { store } from '../redux/store'
/**
 *
 * @param {string} typesArray
 * @returns {bool}
 */
export const getUserType = (typesArray) => {
  return typesArray.includes(store.getState().user.type)
}
