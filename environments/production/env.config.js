module.exports = {
  elasticsearch: {
    host: 'http://elasticsearch.elasticsearch.svc.cluster.local:9200',
    indexPattern: '[myproject-]YYYY.MM.DD',
    logLevel: 10,
    logName: 'myproject',
    type: 'logs'
  },
  nats: 'nats://localhost:4222',
  database: {
    username: 'pgmais-bus',
    password: 'fakePass!PgMais',
    host: '10.10.1.18',
    port: '31055',
    dialect: 'mysql',
    database: 'myproject'
  },
  redis: {
    host: 'redis-myproject',
    port: 6379,
    password: 'myproject@123',
    db: 15
  }
};
