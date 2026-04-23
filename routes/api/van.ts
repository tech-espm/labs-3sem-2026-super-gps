import app = require("teem");
import Usuario = require("../../models/usuario");
import Van = require("../../models/van");

class VanApiRoute {
	public static async listar(req: app.Request, res: app.Response) {
		const u = await Usuario.cookie(req, res, true);
		if (!u)
			return;

		res.json(await Van.listar());
	}

	@app.http.post()
	public static async criar(req: app.Request, res: app.Response) {
		const u = await Usuario.cookie(req, res, true);
		if (!u)
			return;

		const erro = await Van.criar(req.body);

		if (erro) {
			res.status(400).json(erro);
			return;
		}

		res.sendStatus(204);
	}

	@app.http.post()
	public static async editar(req: app.Request, res: app.Response) {
		const u = await Usuario.cookie(req, res, true);
		if (!u)
			return;

		const erro = await Van.editar(req.body);

		if (erro) {
			res.status(400).json(erro);
			return;
		}

		res.sendStatus(204);
	}

	@app.http.delete()
	public static async excluir(req: app.Request, res: app.Response) {
		const u = await Usuario.cookie(req, res, true);
		if (!u)
			return;

		const id = parseInt(req.query["id"] as string);

		if (isNaN(id)) {
			res.status(400).json("Id inválido");
			return;
		}

		const erro = await Van.excluir(id);

		if (erro) {
			res.status(400).json(erro);
			return;
		}

		res.sendStatus(204);
	}

	public static async listarCoordenadas(req: app.Request, res: app.Response) {
		res.json(await Van.listarCoordenadas());
	}

	@app.http.post()
	public static async loginMotorista(req: app.Request, res: app.Response) {

		let apelido = req.body.apelido;
		let senha = req.body.senha;
		let placa = req.body.placa;

		let van = await Van.loginMotorista(apelido, senha, placa);

		if (!van) {
			res.json({ success: false });
			return;
		}

		res.json({ success: true, value: van });
	}

	@app.http.post()
	public static async salvarLoc(req: app.Request, res: app.Response) {


		let idVan = parseInt(req.body.idVan);
		let latitude = parseFloat(req.body.latitude);
		let longitude = parseFloat(req.body.longitude);

		if (isNaN(idVan) || isNaN(latitude) || isNaN(longitude)) {
			res.json({ success: false, error: "Dados inválidos" });
			return;
		}

		let erro = await Van.salvarLoc(idVan, latitude, longitude);

		if (erro) {
			res.json({ success: false, error: erro });
			return;
		}

		res.json({ success: true });

	}
}

export = VanApiRoute;
