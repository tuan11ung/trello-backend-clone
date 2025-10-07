import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB } from '~/config/mongodb.js'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())

    res.end('<h1>Hello World!</h1>')
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Backend server is running successfully at http://${hostname}:${port}/`)
  })

  exitHook(() => {
    console.log('Exit app')
  })
}

// (async () => {
//   try {
//     console.log('1. Trying to connect to MongoDB...')
//     await CONNECT_DB()
//     console.log('2. Connected to MongoDB successfully!')
//     START_SERVER()
//   } catch (error) {
//     console.error(error)
//     process.exit(1)
//   }
// })()

//Chi khi ket noi toi DB thanh cong thi moi Start server
console.log('1. Trying to connect to MongoDB...')
CONNECT_DB()
  .then( () => {
    console.log('2. Connected to MongoDB successfully!')
  })
  .then( () => START_SERVER())
  .catch( error => {
    console.error(error)
    process.exit(0)
  })
