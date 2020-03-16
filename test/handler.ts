import { expect } from 'chai'
import { handleRequest } from '../src/handler'

describe('handler returns response with request method', () => {
  const methods = [
    'GET',
    'HEAD',
    'POST',
    'PUT',
    'DELETE',
    'CONNECT',
    'OPTIONS',
    'TRACE',
    'PATCH',
  ]
  methods.forEach(method => {
    it(method, async () => {
      const result = await handleRequest(new Request('/', { method }))
      const { status, statusText } = result
      const text = await result.text()
      if (method === 'GET') {
        expect(status).not.eq(405)
        expect(statusText).to.eq('Should Provide Github Username')
      } else {
        expect(status).to.eq(405)
        expect(text).to.eq('Expected GET')
      }
    })
  })
})
