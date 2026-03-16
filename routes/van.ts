import app = require("teem");
import Usuario = require("../models/usuario");
import Van = require("../models/van");

class VanRoute {
	public static async criar(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u || !u.admin)
			res.redirect(app.root + "/acesso");
		else
			res.render("van/editar", {
				titulo: "Criar Van",
				textoSubmit: "Criar",
				usuario: u,
				item: null
			});
	}

	public static async editar(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u || !u.admin) {
			res.redirect(app.root + "/acesso");
		} else {
			let id = parseInt(req.query["id"] as string);
			let item: Van = null;
			if (isNaN(id) || !(item = await Van.obter(id)))
				res.render("index/nao-encontrado", {
					layout: "layout-sem-form",
					usuario: u
				});
			else
				res.render("van/editar", {
					titulo: "Editar Van",
					usuario: u,
					item: item
				});
		}
	}

	public static async listar(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u || !u.admin)
			res.redirect(app.root + "/acesso");
		else
			res.render("van/listar", {
				layout: "layout-tabela",
				titulo: "Gerenciar Vans",
				datatables: true,
				xlsx: true,
				usuario: u,
				lista: await Van.listar()
			});
	}
}

export = VanRoute;
