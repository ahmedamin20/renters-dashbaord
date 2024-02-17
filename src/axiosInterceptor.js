import { toast } from 'react-hot-toast'
import defaultAPI from './axiosInstance'

export const axiosInterceptor = () => {
  const VALIDATION_ERRORS_RESPONSE = 422,
    UNAUTHORIZED = 401

  defaultAPI.interceptors.response.use(
    function (response) {
      // const STATUS_CODE = response.data.code;
      const shouldShowToast = response.data.showToast === true

      if (shouldShowToast) {
        toast.dismiss()
        toast.success(response.data.message)
      }

      return response
    },
    function (error) {
      const STATUS_CODE = error.response.data.code

      if (STATUS_CODE === UNAUTHORIZED) {
        toast.error(error.response.data.message, {
          id: 'unauthorized',
        })
        localStorage.clear()
        if (window.location.pathname !== '/') {
          window.location.replace('/')
        }
      } else if (STATUS_CODE === VALIDATION_ERRORS_RESPONSE) {
        const responseErrors = error.response.data.data

        const firstErrorKey = Object.keys(responseErrors)[0]
        toast.dismiss()

        // toast.error(`${firstErrorKey} => ${responseErrors[firstErrorKey]}`);
        toast.error(`${responseErrors[firstErrorKey]}`)
      } else if (STATUS_CODE === 403 || STATUS_CODE === 404) {
        toast.dismiss()
        toast.error(error.response.data.message)

        if (window.location.pathname !== '/dashboard') {
          // window.location.replace("/dashboard");
        }
      } else {
        toast.dismiss()
        toast.error(error.response.data.message)
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    },
  )
}
