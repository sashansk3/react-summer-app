module.exports = {
  host    : 'localhost',
  port    : 5432,
  db      : 'todos',
  user    : 'postgres',
  password: 'example',
  dialect : "postgres",
  pool    : {
    max    : 5,
    min    : 0,
    acquire: 30000,
    idle   : 10000
  }
}