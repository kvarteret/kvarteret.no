function validStatuses() {
  const env = process.env.NODE_ENV
  let validStatuses = ['published']
  if (env == 'development' || env == 'staging') {
    validStatuses.push('draft')
  }
  return validStatuses
}
module.exports.validStatuses = validStatuses

module.exports.isValidStatus = function (status) {
  if (status == undefined) throw new Error('Status must not be undefined!')
  return validStatuses().includes(status)
}
