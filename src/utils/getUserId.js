import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
  // request.request is a http request, where request.connection is a subscription request from a websocket. 
  const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization

  if(header) {
    const token = header.replace('Bearer ', '')
    const decoded = jwt.verify(token, 'thisisasecret')
    return decoded.userId
  }

  if(requireAuth) {
    throw new Error('Authentication required')
  }

  return null
}

export default getUserId
