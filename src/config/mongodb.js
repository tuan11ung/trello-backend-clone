/**
 * ntuanhung82
 * LvJL9ztKLTiRvtPb
 */

const MONGODB_URI = 'mongodb+srv://ntuanhung82:LvJL9ztKLTiRvtPb@cluster0-tuan11ungdev.vyjlqrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-Tuan11ungDev'
const DATABASE_NAME = 'trello-fullstack'

import { MongoClient, ServerApiVersion } from 'mongodb'

//Khoi tao 1 obj trelloDatabaseInstance ban dau la null (vi chua ket noi)
let trelloDatabaseInstance = null

//Khoi tao 1 obj mongoClientInstance de connect toi MongoDB
const mongoClientInstance = new MongoClient(MONGODB_URI, {
  //Luu y: serverApi co tu mongodb v5.0.0 tro len, co the khong can dung no, con neu dung la chung ta se chi dinh 1 Stable API version cua mongoDB
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//connect toi MongoDB va tra ve obj database neu thanh cong
export const CONNECT_DB = async () => {
  //Goi ket noi toi MongoDB Atlas voi URI da khai bao trong than cuar mongoClientInstance
  await mongoClientInstance.connect()

  //Ket noi thanh cong thi lay ra DB theo ten va gan nguoc no vao bien toan cuc trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)

}


//Function GET_DB(ko phai async) co nhiem vu export ra cai Trello Database Instance sau khi da connect thanh cong toi MongoDB de chung ta su dung o nhieu noi khac nhau trong code
//Luu y: dam bao chi goi GET_DB sau khi da goi CONNECT_DB thanh cong
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to database first!')
  return trelloDatabaseInstance
}