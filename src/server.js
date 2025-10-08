import express from 'express'
import exitHook from 'async-exit-hook'
import 'dotenv/config'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb.js'
import { APIs_V1 } from '~/routes/v1'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.use('/v1', APIs_V1)

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Backend server is running successfully at http://${hostname}:${port}/`)
  })

  /**
   * thuc hien tac vu clean up truoc khi dung server
   */
  exitHook(() => {
    console.log('4. Disconnecting from MongoDB')
    CLOSE_DB()
    console.log('5. Disconnected')
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
