module.exports = {
	elasticsearch: {
		host: 'elasticsearch:9200',
		indexPattern: '[logs-myproject-]YYYY.MM.DD',
		logLevel: 10,
		logName: 'myproject',
		type: 'logs'
	},
	nats: 'nats://nats:4222',
	database: {
		username: 'dbUser',
		password: 'dbPassword',
		host: 'mysql',
		port: '3306',
		dialect: 'mysql',
		database: 'dbDatabase',
		schema: 'dbSchema'
	},
	redis: {
		host: 'redis',
		port: 6379,
		password: 'myproject@123',
		db: 15,
		maxTime: 24 * 60 * 60
	},
	// apiGatewayUrl: 'https://webhook.site/332a6035-003b-4ecb-86dc-1ee14eefe5bc'
};
