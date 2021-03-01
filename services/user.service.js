"use strict";

const { MoleculerError } = require("moleculer").Errors;


module.exports = {
	name: "users",
	/**
	 * mixins
	 */
	// mixins: [logMixin, redisMessage],
	/**
	 * Settings
	 */
	settings: {
		logLevel: "debug"// level para os logs referentes a entrada e saída de cada ação deste serviço
	},

	/**
	 * Dependencies
	 */

	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		// message: {
		// 	params: {
		// 		userId: "string",
		// 		name: "string",
		// 		age: "number",
		// 		cpf: "number"
		// 	},
		// 	async handler (ctx) {
		// 		try {
		//
		// 			const { userId, name, age} = ctx.params;
		//
		// 			const config = await ctx.call("user-repo.getByPortfolio", { name });
		//
		// 			await this.addMessageToCache(userId, name, age, config.cpf);
		//
		// 			if (!config.user) {
		// 				await this.broker.emit("user.finished", { userId, name });
		// 			}
		// 			// setTimeout(() => this.eventEmitter(clientId, portfolio));
		// 		} catch (err) {
		// 			this.logger.error({ errorMessage: err.message }, "service error");
		// 			// tratar erros do redis
		// 			throw new MoleculerError(err.message);
		// 		}
		// 	}
		// },
		//
		// // ACTION DE CRIAÇÃO DE MENSAGENS PARA AUXILIAR O DESENVOLVIMENTO
		// // REMOVER ESSA ACTION ANTES DE SUBIR A VERSÃO FINAL PARA O KUBERNETES
		// devMessageCreation: {
		// 	async handler (ctx) {
		// 		await this.broker.call("user.message", {
		// 			userId: "b1",
		// 			name: "carlos",
		// 			age: 22,
		// 			cpf: 123456789
		// 		});
		//
		// 		await new Promise(resolve => setTimeout(resolve, 100));
		//
		// 		await this.broker.call("user.message", {
		// 			userId: "b2",
		// 			name: "carlos",
		// 			age: 22,
		// 			cpf: 123456789
		// 		});
		//
		// 		await new Promise(resolve => setTimeout(resolve, 100));
		//
		// 		await this.broker.call("user.message", {
		// 			userId: "b3",
		// 			name: "carlos",
		// 			age: 22,
		// 			cpf: 123456789
		// 		});
		//
		// 		await new Promise(resolve => setTimeout(resolve, 100));
		//
		// 		await this.broker.call("user.message", {
		// 			userId: "b4",
		// 			name: "carlos",
		// 			age: 22,
		// 			cpf: 123456789
		// 		});
		// 	}
		// }
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

		/**
		 * Emit Event to concat-sender.service
		 *
		 * @param {String} portfolio
		 * @param {String} clientId
		 */
		async eventEmitter (userId, name) {
			this.broker.emit('user.finished', { userId, name });
		}
	}
};
