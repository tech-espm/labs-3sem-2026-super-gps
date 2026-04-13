import app = require("teem");
import DataUtil = require("../utils/dataUtil");

interface Van {
	id: number;
	apelido: string;
	placa: string;
	modelo: string;
	capacidade: number;
	senha: string | null;
	criacao: string;
}

class Van {
	private static validar(van: Van, criacao: boolean): string {
		if (!van)
			return "Van inválida";

		van.id = parseInt(van.id as any);

		if (!criacao) {
			if (isNaN(van.id))
				return "Id inválido";
		}

		if (!van.apelido || !(van.apelido = van.apelido.normalize().trim()) || van.apelido.length > 100)
			return "Apelido inválido";

		if (!van.placa || !(van.placa = van.placa.normalize().trim().toUpperCase()) || van.placa.length > 7)
			return "Placa inválida";

		if (!van.modelo || !(van.modelo = van.modelo.normalize().trim()) || van.modelo.length > 100)
			return "Modelo inválido";

		van.capacidade = parseInt(van.capacidade as any);
		if (isNaN(van.capacidade) || van.capacidade <= 0)
			return "Capacidade inválida";

		if (!van.senha || !(van.senha = van.senha.normalize().trim()))
			van.senha = null;
		else if (van.senha.length > 45)
			return "Senha inválida";

		return null;
	}

	public static listar(): Promise<Van[]> {
		return app.sql.connect(async (sql) => {
			return (await sql.query("select id, apelido, placa, modelo, capacidade, date_format(criacao, '%d/%m/%Y') criacao from van where exclusao is null")) || [];
		});
	}

	public static obter(id: number): Promise<Van> {
		return app.sql.connect(async (sql) => {
			const lista: Van[] = await sql.query("select id, apelido, placa, modelo, capacidade, senha, date_format(criacao, '%d/%m/%Y') criacao from van where id = ?", [id]);

			return ((lista && lista[0]) || null);
		});
	}

	public static async criar(van: Van): Promise<string> {
		const res = Van.validar(van, true);
		if (res)
			return res;

		return app.sql.connect(async (sql) => {
			try {
				await sql.query("insert into van (apelido, placa, modelo, capacidade, senha, criacao) values (?, ?, ?, ?, ?, now())", [van.apelido, van.placa, van.modelo, van.capacidade, van.senha]);

				return null;
			} catch (e) {
				if (e.code) {
					switch (e.code) {
						case "ER_DUP_ENTRY":
							return `A placa ${van.placa} já está em uso`;
						default:
							throw e;
					}
				} else {
					throw e;
				}
			}
		});
	}

	public static async editar(van: Van): Promise<string> {
		const res = Van.validar(van, false);
		if (res)
			return res;

		return app.sql.connect(async (sql) => {
			await sql.query("update van set apelido = ?, placa = ?, modelo = ?, capacidade = ?, senha = ? where id = ? and exclusao is null", [van.apelido, van.placa, van.modelo, van.capacidade, van.senha, van.id]);

			return (sql.affectedRows ? null : "Van não encontrada");
		});
	}

	public static async excluir(id: number): Promise<string> {
		return app.sql.connect(async (sql) => {
			// Utilizar substr(placa, instr(placa, ':') + 1) para remover o prefixo, caso precise desfazer a exclusão
			await sql.query("update van set placa = concat('@', id, ':', placa), exclusao = ? where id = ? and exclusao is null", [DataUtil.horarioDeBrasiliaISOComHorario(), id]);

			return (sql.affectedRows ? null : "Van não encontrada");
		});
	}

	public static async listarCoordenadas(): Promise<any[]> {
		return app.sql.connect(async (sql) => {
			const vans: any[] = (await sql.query("select id, apelido, placa, modelo, capacidade from van where exclusao is null")) || [];

			let posicoes: any[] = [];

			const dataLimite = DataUtil.horarioDeBrasiliaISOComHorario(-20 * 60);

			for (let i = 0; i < vans.length; i++) {
				const van = vans[i];

				const lista: any[] = (await sql.query("select latitude, longitude from log where idvan = ? and data >= ? order by id desc limit 1", [van.id, dataLimite])) || [];

				if (lista.length) {
					posicoes.push({
						id: van.id,
						apelido: van.apelido,
						placa: van.placa,
						modelo: van.modelo,
						capacidade: van.capacidade,
						latitude: lista[0].latitude,
						longitude: lista[0].longitude,
					});
				}
			}

			return posicoes;
		});
	}

	public static async loginMotorista(apelido: string, senha: string, placa: string): Promise<Van | null> {
		placa = placa.toUpperCase();

		return app.sql.connect(async (sql) => {
			console.log(apelido, senha, placa);
			const lista: Van[] = await sql.query(
				"select id, apelido, placa, modelo, capacidade, senha, date_format(criacao, '%d/%m/%Y') criacao from van where apelido = ? and senha = ? and placa = ? and exclusao is null",
				[apelido, senha, placa]
			);

			return ((lista && lista[0]) || null);
		});
	}
}

export = Van;
