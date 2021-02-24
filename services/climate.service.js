"use strict";

const { get } = require("http");

module.exports = {
	name: "climate",
	actions: {
		async get() {
			const result = await new Promise((resolve, reject)=>{
				get("http://api.hgbrasil.com/weather",(res) => {
					let data = "";
					res.on("data",(value) => (data += value));
					res.on("error", (error) => reject(error));
					res.on("end",() => resolve(JSON.parse(data)));
				});
			});
			return result;
		},
		async patos(){
			return await this.getPatos();
		}
	},
	methods: {
		async getPatos(){
			const result = await new Promise((resolve, reject)=>{
				get("http://api.hgbrasil.com/weather?woeid=455977",(res) => {
					let data = "";
					res.on("data",(value) => (data += value));
					res.on("error", (error) => reject(error));
					res.on("end",() => resolve(JSON.parse(data)));
				});
			});
			return result;
		}
	}
};

