const faunadb = require('faunadb')
const getId = require('./utils/getId')
const q = faunadb.query

exports.handler = (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: "fnAEDTbsdeACCJ6xukJs5ZDTkEjr1kxe-Vyu4xVF"
  }) 
  const data = JSON.parse(event.body)
  const id = getId(event.path)
  console.log(`Function 'todo-update' invoked. update id: ${id}`)
  return client.query(q.Update(
    q.Ref(q.Collection('CRUD'), `${id}`),
   {data}))
    .then((response) => {
      console.log('success', response)
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
