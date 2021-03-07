const fastify = require('fastify')
const basicQueue = require('./basic-queue')

const app = fastify()

app.post('/issue', async (request, reply) => {
  const { jobId, callbackUrl } = request.body

  basicQueue.add({
    jobId,
    callbackUrl
  }, {
    jobId,
    removeOnComplete: true
  })

  reply.statusCode = 201

  return {
    status: 'Created'
  }
})

app.post('/callback', async (request) => {
  /**
   * jobId,
   * status
   */
  console.log('request.body ->', request.body)

  return {
    status: 'OK'
  }
})

app.listen(3000, () => {
  console.log('listen on 3000')
})