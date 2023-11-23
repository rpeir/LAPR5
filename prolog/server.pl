:- use_module(library(http/http_server)).
:- use_module(library(http/json)).

runServer:- http_server(http_dispatch,[port(5000)]).

:-http_handler(root(path/lessBuildings), handleLessBuildings, []).

:-http_handler(root(path/lessElevators), handleLessElevators, []).

:-http_handler(root(path/roomToRoomLessBuildings), handleRoomToRoomLessBuildings, []).

:-http_handler(root(path/roomToRoomLessElevators), handleRoomToRoomLessElevators, []).


%=====================================================================
% Find Path between 2 Floors using less buildings
%=====================================================================
handleLessBuildings(Request) :-
  % get params from request
  http_parameters(Request,[floorSource(FloorSource, [optional(true)]),floorDestination(FloorDestination, [optional(true)])]),
  % convert params to atoms to be use in prolog
  atom_string(FloorSource,F1),
  atom_string(FloorDestination,F2),
  % calculate path
  best_path_less_Buildings(F1,F2,Path),
  % get buildings list from path
  getListBuildingsFromPath(Path,ListBuildings),
  %retrive path between flors to calculate path inside floors
  retrivePathFromPathAndBuildings(Path, ListPath),
  % and transform list of elevators and pathways to json
  getListPathJsonFromPath(ListPath,ListPathJson),
  % convert path to json
  PathJson = json([buildings = ListBuildings , paths = ListPathJson]),
  % send json as response
  reply_json(PathJson).

%=====================================================================
% Find Path between 2 Floors using less elevators
%=====================================================================

handleLessElevators(Request) :-
  % get params from request
  http_parameters(Request,[floorSource(FloorSource, [optional(true)]),floorDestination(FloorDestination, [optional(true)])]),
  % convert params to atoms to be use in prolog
  atom_string(FloorSource,F1),
  atom_string(FloorDestination,F2),
  % calculate path
  best_path_less_elevators(F1,F2,Path),
  % get buildings list from path
  getListBuildingsFromPath(Path,ListBuildings),
  %retrive path between flors to calculate path inside floors
  retrivePathFromPathAndBuildings(Path, ListPath),
  % and transform list of elevators and pathways to json
  getListPathJsonFromPath(ListPath,ListPathJson),
  % convert path to json
  PathJson = json([buildings = ListBuildings , paths = ListPathJson]),
  % send json as response
  reply_json(PathJson).

%=====================================================================
getListBuildingsFromPath([ListBuildings|_],ListBuildings).
%=====================================================================
retrivePathFromPathAndBuildings([_,ListPath],ListPath).
%=====================================================================

%=====================================================================
getListPathJsonFromPath(ListPath,Result):-convert_predicate_list_to_list(ListPath,Result).

convertPathInsideObjecToJson(cel(Line,Column), json([line=Line, column= Column])).

convertPathInsideToJson([],[]).
convertPathInsideToJson([Path|Rest],[JsonPath|Result]):-
  convertPathInsideObjecToJson(Path,JsonPath),
  convertPathInsideToJson(Rest,Result).

getJsonPathInside([],[]).
getJsonPathInside([Path|Rest],[JsonPath|Result]):-
  convertPathInsideToJson(Path,JsonPath),
  getJsonPathInside(Rest,Result).

%=====================================================================
% Rule to convert elev/pathW to list format
%=====================================================================
convert_predicate_to_json_object(elev(From, To), json([element="Elevator", floorSource= From, floorDestination= To])).
convert_predicate_to_json_object(pathW(From, To), json([element="Pathway", floorSource= From, floorDestination= To])).

% Rule to convert a list of elev/pathW to list format
convert_predicate_list_to_list([], []).
convert_predicate_list_to_list([Predicate|Rest], [ListFormat|Result]) :-
    convert_predicate_to_json_object(Predicate, ListFormat),
    convert_predicate_list_to_list(Rest, Result).

%=====================================================================
% Find Path between 2 rooms using less buildings
%=====================================================================
handleRoomToRoomLessBuildings(Request):-
  % get params from request
  http_parameters(Request,[floorSource(FloorSource, [optional(true)]),floorDestination(FloorDestination, [optional(true)]), roomSource(RoomSource, [optional(true)]), roomDestination(RoomDestination, [optional(true)])]),
  % convert params to atoms to be use in prolog
  atom_string(FloorSource,F1),
  atom_string(FloorDestination,F2),
  atom_string(RoomSource,R1),
  atom_string(RoomDestination,R2),
  % calculate path
  best_path_less_Buildings(F1,F2,Path),
  % get buildings list from path
  getListBuildingsFromPath(Path,ListBuildings),
  %retrive path between flors to calculate path inside floors
  retrivePathFromPathAndBuildings(Path, ListPath),
  % and transform list of elevators and pathways to json
  getListPathJsonFromPath(ListPath,ListPathJson),
  % get path inside floors
  startPath(R1,R2,ListPath,PathInside),
  % convert path  inside to json
  getJsonPathInside(PathInside,JsonPathInside),
  % convert path to json
  PathJson = json([buildings = ListBuildings , paths = ListPathJson, pathInside = JsonPathInside]),
  % send json as response
  reply_json(PathJson).


  %=====================================================================
  % Find Path between 2 rooms using less elevators
  %=====================================================================
  handleRoomToRoomLessElevators(Request):-
    % get params from request
    http_parameters(Request,[floorSource(FloorSource, [optional(true)]),floorDestination(FloorDestination, [optional(true)]), roomSource(RoomSource, [optional(true)]), roomDestination(RoomDestination, [optional(true)])]),
    % convert params to atoms to be use in prolog
    atom_string(FloorSource,F1),
    atom_string(FloorDestination,F2),
    atom_string(RoomSource,R1),
    atom_string(RoomDestination,R2),
    % calculate path
    best_path_less_elevators(F1,F2,Path),
    % get buildings list from path
    getListBuildingsFromPath(Path,ListBuildings),
    %retrive path between flors to calculate path inside floors
    retrivePathFromPathAndBuildings(Path, ListPath),
    % and transform list of elevators and pathways to json
    getListPathJsonFromPath(ListPath,ListPathJson),
    % get path inside floors
    startPath(R1,R2,ListPath,PathInside),
    % convert path  inside to json
    getJsonPathInside(PathInside,JsonPathInside),
    % convert path to json
    PathJson = json([buildings = ListBuildings , paths = ListPathJson, pathInside = JsonPathInside]),
    % send json as response
    reply_json(PathJson).

