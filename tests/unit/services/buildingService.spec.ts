import sinon from "sinon";
import {IBuildingDTO} from "../../../src/dto/IBuildingDTO";
import {Container} from "typedi";
import {Building} from "../../../src/domain/building/building";
import BuildingService from "../../../src/services/buildingService";
import IBuildingRepo from "../../../src/services/IRepos/IBuildingRepo";
import {BuildingCode} from "../../../src/domain/building/BuildingCode";
import { expect } from 'chai';

describe('building service', () => {
    const sandbox = sinon.createSandbox();

    var defaultBuildingDTO : IBuildingDTO;
    var defaultBuildingProps ;


    beforeEach(function() {
        Container.reset();
        this.timeout(5000);

        let buildingSchemaInstance = require("../../../src/persistence/schemas/buildingSchema").default;
        Container.set("buildingSchema", buildingSchemaInstance);

        let buildingRepoClass = require("../../../src/repos/buildingRepo").default;
        let buildingRepoInstance = Container.get(buildingRepoClass);
        Container.set("BuildingRepo", buildingRepoInstance);

        defaultBuildingDTO = {
            domainId: "1",
            code : "A",
            designation : "Test A",
            description : "Edificio Teste A",
            length : 100,
            width : 100,
            height : 100
        }
        defaultBuildingProps = {
            code: BuildingCode.create("A").getValue(),
            designation: "Test A",
            description: "Edificio Teste A",
            length: 100,
            width: 100,
            height: 100
        }
    });
    it('create building with invalid Code', async () => {
        defaultBuildingDTO.code='buildingCode is not within range 1 to 5';
        let buildingRepoInstance = Container.get("BuildingRepo");
        // @ts-ignore
        sinon.stub(buildingRepoInstance, "findByCode").returns(
            Building.create(defaultBuildingProps).getValue());

        const service= new BuildingService(
            buildingRepoInstance as IBuildingRepo
        );
        await service.createBuilding(defaultBuildingDTO).then((result) => {
            expect(result.isFailure).to.equal(true);
            expect(result.errorValue()).to.equal('buildingCode is not within range 1 to 5.' as unknown as IBuildingDTO);
        });
    });
});

