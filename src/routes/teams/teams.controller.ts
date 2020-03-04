import { Request, Response, NextFunction } from "express";
const teams = require('../../config/teams.json');

exports.getAllTeams = async function(req: Request, res: Response, next: NextFunction) {
    try {
        return res.json(teams);
    } catch (err) {
        return next(err);
    }
}

exports.getTeam = async function(req: Request, res: Response, next: NextFunction) {
    try {
        const team = teams.find(x => (x.name === req.params.name));
        if (team) return res.json(team);

        return res.json({ msg: 'No result found' });
    } catch (err) {
        return next(err);
    }
}

exports.create = async function(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, img } = req.body;
        if (!name || !img) return res.status(400).send({ error: "No proper payload found" });

        const team = teams.find(x => (x.name === name));
      
        if (team) {
            if ((team.name === name) && (team.img === img)) {
                return res.json({ msg: 'Team already present' });
            }

            teams.forEach((t) => {
                if (team.name === t.name) Object.assign(t, { img });
            });

            return res.json(teams);
        }

        teams.push({ name, img });
        return res.sendStatus(201);
    } catch (err) {
        return next(err);
    }
}