"use strict";

const DbMixin = require("../mixins/db.mixin");


module.exports = {
	name: "user",
	mixins: [DbMixin("user")],


	settings: {
		fields: [
			"_id",
			"name",
			"age",
			"cpf"
		],

		// Validator for the `create` & `insert` actions.
		entityValidator: {
			name: "string|min:3",
			age: "number|positive",
			cpf: "number|positive"
		}
	},

	hooks: {
		before: {
			create(ctx) {
				// ctx.params.age = 0;
				// ctx.params.cpf = 0;
			}
		}
	},
	actions: {
		increaseAge: {
			rest: "PUT /:id/age/increase",
			params: {
				id: "string",
				value: "number|integer|positive"
			},
			async handler(ctx) {
				const doc = await this.adapter.updateById(ctx.params.id, { $inc: { age: ctx.params.value } });
				const json = await this.transformDocuments(ctx, ctx.params, doc);
				await this.entityChanged("updated", json, ctx);

				return json;
			}
		},
		decreaseAge: {
			rest: "PUT /:id/age/decrease",
			params: {
				id: "string",
				value: "number|integer|positive"
			},
			async handler(ctx) {
				const doc = await this.adapter.updateById(ctx.params.id, { $inc: { age: -ctx.params.value } });
				const json = await this.transformDocuments(ctx, ctx.params, doc);
				await this.entityChanged("updated", json, ctx);

				return json;
			}
		}
	},

	methods: {
		async seedUsersDB() {
			await this.adapter.insertMany([
				{ name: "Reinaldo", age: 22, cpf: 20186166881 },
				{ name: "Elcio", age: 25, cpf: 122354 },
				{ name: "Paulo", age: 22, cpf: 125478963 },
			]);
		}
	},

	// async afterConnected() {}
};
