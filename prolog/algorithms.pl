% =================================================
% Find path between buildings
% =================================================

path_between_buildings(BuildingSource,BuildingDestination,Path):-
            path_between_buildings2(BuildingSource,BuildingDestination,[BuildingSource],Path).

path_between_buildings2(BuildingX,BuildingX,PathInv,Path):-!,reverse(PathInv,Path).
path_between_buildings2(BuildingAct,BuildingDestination,VisitedBuildingList,Path):-
            (pathway(BuildingAct,PossibleBuilding,_,_);pathway(PossibleBuilding,BuildingAct,_,_)),
            \+member(PossibleBuilding,VisitedBuildingList),
            path_between_buildings2(PossibleBuilding,BuildingDestination,[PossibleBuilding|VisitedBuildingList],Path).



% ========================================================
% Find path between floors using pathways and elevators
% ========================================================

path_between_floors(FloorSource,FloorDestination,BuildingPath,PathwayElevatorPath):-floor(BuildingSource,FloorSourceList),member(FloorSource,FloorSourceList),
            floor(BuildingDestination,FloorDestinstionList),member(FloorDestination,FloorDestinstionList),
            path_between_buildings(BuildingSource,BuildingDestination,BuildingPath),
            go_Through_floor(FloorSource,FloorDestination,BuildingPath,PathwayElevatorPath).


go_Through_floor(FloorDestination,FloorDestination,_,[]).

go_Through_floor(FloorDestination1,FloorDestination,[BuildingDestination],[elev(FloorDestination1,FloorDestination)]):-
            FloorDestination\==FloorDestination1,
            elevator(BuildingDestination,FloorsServed), member(FloorDestination1,FloorsServed), member(FloorDestination,FloorsServed).

go_Through_floor(FloorAct,FloorDestination,[BuildingAct,BuildingNext|OtherBuildings],[pathW(FloorAct,FloorNext)|OtherPathways]):-
            (pathway(BuildingAct,BuildingNext,FloorAct,FloorNext);pathway(BuildingNext,BuildingAct,FloorNext,FloorAct)),
            go_Through_floor(FloorNext,FloorDestination,[BuildingNext|OtherBuildings],OtherPathways).

go_Through_floor(FloorAct,FloorDestination,[BuildingAct,BuildingNext|OtherBuildings],[elev(FloorAct,FloorAct1),pathW(FloorAct1,FloorNext)|OtherPathways]):-
            (pathway(BuildingAct,BuildingNext,FloorAct1,FloorNext);pathway(BuildingNext,BuildingAct,FloorNext,FloorAct1)),
            FloorAct1\==FloorAct,
            elevator(BuildingAct,FloorsServed), member(FloorAct,FloorsServed), member(FloorAct1,FloorsServed),
            go_Through_floor(FloorNext,FloorDestination,[BuildingNext|OtherBuildings],OtherPathways).
