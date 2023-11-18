:- use_module(library(http/http_server)).
:- use_module(library(http/json)).

runServer:- http_server(http_dispatch,[port(5000)]).

:-http_handler(root(path/lessBuildings), handleLessBuildings, []).

:-http_handler(root(path/lessElevators), handleLessElevators, []).


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
  % get path list of elevators and pathways from path
  getListPathFromPath(Path,ListPath),
  % convert path to json
  PathJson = json([buildings = ListBuildings , paths = ListPath]),
  % send json as response
  reply_json(PathJson).


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
  % get path list of elevators and pathways from path
  getListPathFromPath(Path,ListPath),
  % convert path to json
  PathJson = json([buildings = ListBuildings , paths = ListPath]),
  % send json as response
  reply_json(PathJson).

getListBuildingsFromPath([ListBuildings|ListPath],ListBuildings).

getListPathFromPath([ListBuildings,ListPath],Result):-convert_predicate_list_to_list(ListPath,Result).

% Rule to convert elev/pathW to list format
convert_predicate_to_json_object(elev(From, To), json([element="Elevator", floorSource= From, floorDestination= To])).
convert_predicate_to_json_object(pathW(From, To), json([element="Pathway", floorSource= From, floorDestination= To])).


% Rule to convert a list of elev/pathW to list format
convert_predicate_list_to_list([], []).
convert_predicate_list_to_list([Predicate|Rest], [ListFormat|Result]) :-
    convert_predicate_to_json_object(Predicate, ListFormat),
    convert_predicate_list_to_list(Rest, Result).
