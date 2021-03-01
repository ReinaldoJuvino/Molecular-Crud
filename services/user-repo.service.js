// "use strict";
//
// const DbMixin = require("../mixins/db.mixin");
//
//
// module.exports = {
// 	name: "user",
// 	mixins: [DbMixin("user")],
//
//
// 	settings: {
// 		fields: [
// 			"_id",
// 			"name",
// 			"age",
// 			"cpf"
// 		],
//
// 		// Validator for the `create` & `insert` actions.
// 		entityValidator: {
// 			name: "string|min:3",
// 			age: "number|positive",
// 			cpf: "number|positive"
// 		}
// 	},
//
// 	hooks: {
// 		before: {
// 			create(ctx) {
// 				// ctx.params.age = 0;
// 				// ctx.params.cpf = 0;
// 			}
// 		}
// 	},
// 	actions: {
// 		increaseAge: {
// 			rest: "PUT /:id/age/increase",
// 			params: {
// 				id: "string",
// 				value: "number|integer|positive"
// 			},
// 			async handler(ctx) {
// 				const doc = await this.adapter.updateById(ctx.params.id, { $inc: { age: ctx.params.value } });
// 				const json = await this.transformDocuments(ctx, ctx.params, doc);
// 				await this.entityChanged("updated", json, ctx);
// 				return json;
// 			}
// 		},
// 		decreaseAge: {
// 			rest: "PUT /:id/age/decrease",
// 			params: {
// 				id: "string",
// 				value: "number|integer|positive"
// 			},
// 			async handler(ctx) {
// 				const doc = await this.adapter.updateById(ctx.params.id, { $inc: { age: -ctx.params.value } });
// 				const json = await this.transformDocuments(ctx, ctx.params, doc);
// 				await this.entityChanged("updated", json, ctx);
//
// 				return json;
// 			}
// 		}
// 	},
//
// 	methods: {
// 		async seedUsersDB() {
// 			await this.adapter.insertMany([
// 				{ name: "Reinaldo", age: 22, cpf: 20186166881 },
// 				{ name: "Elcio", age: 25, cpf: 122354 },
// 				{ name: "Paulo", age: 22, cpf: 125478963 },
// 			]);
// 		}
// 	},
//
// 	// async afterConnected() {}
// };

"use strict";
const ErrorBuilder = require('../core/errors.builder');
const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");
const envConfig = require("../env.config");

module.exports = {
	name: "users-repo",
	mixins: [DbService],
	adapter: new SqlAdapter(
		envConfig.database.database,
		envConfig.database.username,
		envConfig.database.password,
		{
			host: envConfig.database.host,
			dialect: "mysql",
			port: envConfig.database.port,
			pool: {
				max: 5,
				min: 0,
				idle: 10000
			},
			noSync: true
		}
	),
	model: {
		name: "user_data",
		define: {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			Id: Sequelize.STRING,
			name: Sequelize.STRING,
			age: Sequelize.BOOLEAN,
			cpf: Sequelize.INTEGER
		},
		options: {
			underscored: true,
			noSync: true
		}
	},

	hooks: {
		after: {
			create: (ctx, res) => {
				ctx.emit("users.created", res);
				return res;
			},

			update: (ctx, res) => {
				ctx.emit("users.updated", res);
				return res;
			},

			remove: (ctx, res) => {
				ctx.emit("users.removed", res);
				return res;
			}
		},

		error: {
			create: (ctx, err) => {
				ctx.emit("users.error.create", err);
				return err;
			},

			update: (ctx, err) => {
				ctx.emit("users.error.update", err);
				return err;
			},

			remove: (ctx, err) => {
				ctx.emit("users.error.remove", err);
				return err;
			}
		}
	},

	/**
	 * Settings
	 */
	settings: {
		logLevel: 'debug'// level para os logs referentes a entrada e saída de cada ação deste serviço
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		getByPortfolio: {
			params: {
				name: 'string'
			},
			async handler (ctx) {
				const { name } = ctx.params;
				const data = await this.adapter.findOne({ where: { name } });
				if (data) {
					return data;
				} else {
					const error = ErrorBuilder
						.createPortfolioError(
							`Entity not found. Name: ${name}`,
							404
						);
					this.logger.error({ errorMessage: error.message }, 'Get name error, name not found');
					throw error;
				}
			}
		}

	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created () {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started () {
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped () {

	}
};
