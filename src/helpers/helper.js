export function validStatuses() {
  const env = process.env.NODE_ENV
  let validStatuses = ['published']
  if (env == 'development' || env == 'staging') {
    validStatuses.push('draft')
  }
  return validStatuses
}

export function isValidStatus(status) {
  if (status == undefined) throw Exception('Status must not be undefined!')
  return validStatuses().includes(status)
}
