import IPlanningAdapter from "./IAdapters/IPlanningAdapter";
import { Service } from "typedi";
import { Result } from "../core/logic/Result";
import { IPathDTO } from "../dto/IPathDTO";
import config from "../../config";
import { PlanningTask } from "../domain/planning/planningTask";

@Service()
export default class PlanningAdapter implements IPlanningAdapter {
  public async getPathLessBuildings(floorSource: string, floorDestination: string) {
    const http = require("http");
    const options = {
      method: "GET",
      host: config.planningHost,
      port: config.planningPort,
      path: "/path/lessBuildings?floorSource=" + floorSource + "&floorDestination=" + floorDestination
    };

    return new Promise<Result<IPathDTO>>((resolve) => {
      let result;

      const request = http.request(options, (res) => {
        if (res.statusCode !== 200) {
          result = Result.fail(`Couldn't find the path.`);
          res.resume();
          resolve(result);
        } else {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("close", () => {
            result = Result.ok(JSON.parse(data));
            resolve(result);
          });
        }
      });

      request.end();

      request.on("error", (err) => {
        result = Result.fail(`Encountered an error trying to make a request: ${err.message}`);
        resolve(result);
      });
    });
  }

  public async getPathLessElevators(floorSource: string, floorDestination: string) {
    const http = require("http");
    const options = {
      method: "GET",
      host: config.planningHost,
      port: config.planningPort,
      path: "/path/lessElevators?floorSource=" + floorSource + "&floorDestination=" + floorDestination
    };

    return new Promise<Result<IPathDTO>>((resolve) => {
      let result;

      const request = http.request(options, (res) => {
        if (res.statusCode !== 200) {
          result = Result.fail(`Couldn't find path.`);
          res.resume();
          resolve(result);
        } else {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("close", () => {
            result = Result.ok(JSON.parse(data));
            resolve(result);
          });
        }
      });

      request.end();

      request.on("error", (err) => {
        result = Result.fail(`Encountered an error trying to make a request: ${err.message}`);
        resolve(result);
      });
    });
  }

  public async getPathLessBuildingsRoomToRoom(floorSource: string, floorDestination: string, roomSource: string, roomDestination: string) {
    const http = require("http");
    const options = {
      method: "GET",
      host: config.planningHost,
      port: config.planningPort,
      path: "/path/roomToRoomLessBuildings?floorSource=" + floorSource
        + "&floorDestination=" + floorDestination
        + "&roomSource=" + roomSource
        +  "&roomDestination=" + roomDestination
    };
    return new Promise<Result<IPathDTO>>((resolve) => {
      let result;

      const request = http.request(options, (res) => {
        if (res.statusCode !== 200) {
          result = Result.fail(`Couldn't find the path.`);
          res.resume();
          resolve(result);
        } else {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("close", () => {
            result = Result.ok(JSON.parse(data));
            resolve(result);
          });
        }
      });

      request.end();

      request.on("error", (err) => {
        result = Result.fail(`Encountered an error trying to make a request: ${err.message}`);
        resolve(result);
      });
    });
  }

  public async getPathLessElevatorsRoomToRoom(floorSource: string, floorDestination: string, roomSource: string, roomDestination: string) {
    const http = require("http");
    const options = {
      method: "GET",
      host: config.planningHost,
      port: config.planningPort,
      path: "/path/roomToRoomLessElevators?floorSource=" + floorSource
        + "&floorDestination=" + floorDestination
        + "&roomSource=" + roomSource
        +  "&roomDestination=" + roomDestination
    };

    return new Promise<Result<IPathDTO>>((resolve) => {
      let result;

      const request = http.request(options, (res) => {
        if (res.statusCode !== 200) {
          result = Result.fail(`Couldn't find the path.`);
          res.resume();
          resolve(result);
        } else {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("close", () => {
            result = Result.ok(JSON.parse(data));
            resolve(result);
          });
        }
      });

      request.end();

      request.on("error", (err) => {
        result = Result.fail(`Encountered an error trying to make a request: ${err.message}`);
        resolve(result);
      });
    });
  }

  getTaskSequence(nrGenerations: number, stabilizationCriteriaValue: number, idealCost: number, planningTask: any[]) {
    const http = require("http");
    const options = {
      method: "POST",
      host: config.planningHost,
      port: config.planningPort,
      path: "/taskSequence?nrGenerations=" + nrGenerations
        + "&stabilizationCriteriaValue=" + stabilizationCriteriaValue
        + "&idealCost=" + idealCost,
      body: planningTask
    };

    return new Promise<Result<PlanningTask[]>>((resolve) => {
      let result;

      const request = http.request(options, (res) => {
        if (res.statusCode !== 200) {
          result = Result.fail(`Couldn't find sequence.`);
          res.resume();
          resolve(result);
        } else {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("close", () => {
            result = Result.ok(JSON.parse(data));
            resolve(result);
          });
        }
      });

      request.end();

      request.on("error", (err) => {
        result = Result.fail(`Encountered an error trying to make a request: ${err.message}`);
        resolve(result);
      });
    } );
  }

}
