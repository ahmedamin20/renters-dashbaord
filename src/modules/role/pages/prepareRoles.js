const uniquePermissions = {}
const uniqueRoles = new Set()
const uniqueOperations = new Set()

export const preparePermissions = (allRoles) => {
  allRoles?.forEach(function (permission) {
    const [operation, role] = permission.name.split('-')

    uniqueRoles.add(role)
    uniqueOperations.add(operation)
    uniquePermissions[`${operation}-${role}`] = permission.id
  })

  // console.log('unique permissions', uniquePermissions, uniqueRoles, uniqueOperations)
  return {
    uniquePermissions: uniquePermissions,
    uniqueRoles: uniqueRoles,
    uniqueOperations: uniqueOperations,
  }
}

// export { uniquePermissions, uniqueRoles, uniqueOperations}
