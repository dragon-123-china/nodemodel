const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const  Config = require('./config');
const ObjectID = MongoDB.ObjectID;

class Db {
    static getInstance () {
        if (!Db.instance) {
            Db.instance = new Db()
        }
        return Db.instance
    }
    constructor() {
        this.dbClient = '';
        this.connect();
    }
    connect () {
        return new Promise((resolve,reject) => {
            if (!this.dbClient) {
                MongoClient.connect(Config.dbUrl, (err,client) => {
                    if (err) {
                        reject(err)
                        return;
                    }
                    this.dbClient = client.db(Config.dbName)
                    resolve(this.dbClient)
                })
            } else {
                resolve(this.dbClient)
            }
        })
    }
    find (Name, req) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                let result = db.collection(Name).find(req);
                result.toArray((err,dosc) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(dosc)
                    }
                })
            })
        })
    }
    insert (Name,data) {
        return new Promise((resolve,reject) => {
            this.connect().then(db => {
                db.collection(Name).insertOne(data,(err,res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
            })
        })
    }
    update (Name,req,data) {
        return new Promise((resolve,reject) => {
            this.connect().then(db => {
                db.collection(Name).updateOne(req,{$set:data},(err,res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
            })
        })
    }
    remove (Name,req) {
        return new Promise((resolve,reject) => {
            this.connect().then(db => {
                db.collection(Name).removeOne(req,(err,res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
            })
        })
    }
    getObjectId (id) {    /*mongodb里面查询 _id 把字符串转换成对象*/
        return new ObjectID(id);
    }
}
module.exports = Db.getInstance();
