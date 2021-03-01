"use strict";

const fs = require("fs");
const DbService	= require("moleculer-db");


module.exports = function(collection) {
	const cacheCleanEventName = `cache.clean.${collection}`;

	const schema = {
		mixins: [DbService],

		events: {
			async [cacheCleanEventName]() {
				if (this.broker.cacher) {
					await this.broker.cacher.clean(`${this.fullName}.*`);
				}
			}
		},

		methods: {
			async entityChanged(type, json, ctx) {
				ctx.broadcast(cacheCleanEventName);
			}
		},

		async started() {
			// Check the count of items in the DB. If it's empty,
			// call the `seedDB` method of the service.
			if (this.seedDB) {
				const count = await this.adapter.count();
				if (count == 0) {
					this.logger.info(`The '${collection}' collection is empty. Seeding the collection...`);
					await this.seedDB();
					this.logger.info("Seeding is done. Number of records:", await this.adapter.count());
				}
			}
			if (this.seedUsersDB) {
				const count = await this.adapter.count();
				if (count == 0) {
					this.logger.info(`The '${collection}' collection is empty. Seeding the collection...`);
					await this.seedUsersDB();
					this.logger.info("Seeding is done. Number of records:", await this.adapter.count());
				}
			}
		}
	};
	return schema;
};
