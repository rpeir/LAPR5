import config from "../../../config";
import { Container } from "typedi";
import IUserRepo from "../../services/IRepos/IUserRepo";

var jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  try {
    var token = req.auth.token;
    const userRepo = Container.get(config.repos.user.name) as IUserRepo;
    let user;

    if (req.auth.token) {//needs decoding
      jwt.verify(token, config.jwtSecret, async function(err, decoded) {
        if (err)
          return res.status(500).send({ auth: false, message: "Failed to authenticate token." });

        user = await userRepo.findById(decoded.id);
      });
    }

    if (req.auth.id) {//no need to decode
      user = await userRepo.findById(req.auth.id);
    }else{//no token
      return res.status(403).send({ auth: false, message: "No token provided" });
    }

    if (!user) {
      next(new Error("Token não corresponde a qualquer utilizador do sistema"));
    } else {
      req.auth.user = user;
      next();
    }

  } catch (e) {
    return next(e);
  }

}

export default verifyToken;
