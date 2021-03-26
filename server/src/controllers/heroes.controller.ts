import * as Express from "express";
import Hero from "../models/hero";
import heroes from "../data/heroes.json";

const findAll = async (req: Express.Request, res: Express.Response) => {
	// Return list of all characters from data crawled from website
	try {
		res.json(heroes);
	} catch (error) {
		console.error(error.message);
	}
};

const findById = async (req: Express.Request, res: Express.Response) => {
	// Return 1 character (based on id) from data crawled from website
	try {
		const hero = await heroes.find((x) => x.id == req.params.id);
		res.json(hero);
	} catch (error) {
		console.error(error.message);
	}
};

export default {
	findAll,
	findById,
};
