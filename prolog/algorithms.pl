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



% =============================================================================
% Find path between floors using pathways and elevators (less elevators)
% =============================================================================

best_path_less_elevators(FloorSource,FloorDestination,BestPath):-
            findall(PathwayElevatorPath,path_between_floors(FloorSource,FloorDestination,_,PathwayElevatorPath),ListPathwayElevatorPath),
            less_elevators(ListPathwayElevatorPath,BestPath,_,_).

less_elevators([PathwayElevatorPath],PathwayElevatorPath,NElev,NPathway):-count(PathwayElevatorPath,NElev,NPathway).

less_elevators([PathwayElevatorPath|OtherPathwayElevatorPath],PathwayElevatorPathR,NElevR,NPathwayR):-
            less_elevators(OtherPathwayElevatorPath,PathwayElevatorPathM,NElev,NPathway),
            count(PathwayElevatorPath,NElev1,NPathway1),
            (((NElev1<NElev;(NElev1==NElev,NPathway1<NPathway)),!,
            NElevR is NElev1, NPathwayR is NPathway1,PathwayElevatorPathR=PathwayElevatorPath);
            (NElevR is NElev,NPathwayR is NPathway,PathwayElevatorPathR=PathwayElevatorPathM)).

count([],0,0).
count([elev(_,_)|L],NElev,NPathway):-count(L,NElevL,NPathway),NElev is NElevL + 1.
count([pathW(_,_)|L],NElev,NPathway):-count(L,NElev,NPathwayL),NPathway is NPathwayL + 1.


% =============================================================================
% Find path between floors using pathways and elevators (less buildings)
% =============================================================================
best_path_less_Buildings(FloorSource,FloorDestination,BestPath):-
            findall([BuildingList, PathwayElevatorPath],path_between_floors(FloorSource,FloorDestination,BuildingList,PathwayElevatorPath),ListBuilidingAndPathwayElevatorPath),
            less_buildings(ListBuilidingAndPathwayElevatorPath,BestPath,_,_,_).

less_buildings([[BuildingList, PathwayElevatorPath]],[BuildingList, PathwayElevatorPath],NBuildings, NElev,NPathway):-
            countBuildings(BuildingList,NBuildings),
            count(PathwayElevatorPath, NElev, NPathway).

less_buildings([[BuildingList, PathwayElevatorPath]|OtherBuilidingAndPathwayElevatorPath],[BuildingListR, PathwayElevatorPathR],NBuildingsR, NElevR,NPathwayR):-
            less_buildings(OtherBuilidingAndPathwayElevatorPath,[BuildingListM, PathwayElevatorPathM],NBuildings, NElev,NPathway),
            countBuildings(BuildingList,NBuildings1),
            count(PathwayElevatorPath, NElev1, NPathway1),
            (((NBuildings1 < NBuildings;(NBuildings1 == NBuildings, NElev1<NElev)),!,
            NBuildingsR is NBuildings1,NElevR is NElev,NPathwayR is NPathway1,BuildingListR=BuildingList,PathwayElevatorPathR=PathwayElevatorPath);
            (NBuildingsR is NBuildings,NElevR is NElev,NPathwayR is NPathway,BuildingListR=BuildingListM,PathwayElevatorPathR=PathwayElevatorPathM)).

countBuildings([],0).
countBuildings([_|L],NBuildings):-countBuildings(L,NBuildingsL),NBuildings is NBuildingsL + 1.
