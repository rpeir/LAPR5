:- use_module(library(http/http_server)).
:- use_module(library(http/json)).
:- use_module(library(http/http_unix_daemon)).
:- consult("algorithms3.pl").
:- consult("algorithms2.pl").
:- consult("algorithms.pl").
:- consult("client.pl").

:- initialization(run, main).

run:- http_daemon([port(5000)]).

main:- http_server(http_dispatch).


:-http_handler(root(path/lessBuildings), handleLessBuildings, []).

:-http_handler(root(path/lessElevators), handleLessElevators, []).

:-http_handler(root(path/roomToRoomLessBuildings), handleRoomToRoomLessBuildings, []).

:-http_handler(root(path/roomToRoomLessElevators), handleRoomToRoomLessElevators, []).

:-http_handler(root(taskSequence), handleTaskSequence, [method(post)]).


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

%==========================================================
%Find Task Sequence
%=========================================================
handleTaskSequence(Request):-
  tell('log.txt'),
  http_read_json(Request, TaksJson),
  json_to_prolog(TaksJson, Tasks),
  http_parameters(Request,
   [nrGenerations(NrGenerationsString, [optional(true)]),
    stabilizationCriteriaValue(StabilizationCriteriaValueString, [optional(true)]),
    idealCost(IdealCostString, [optional(true)]),
    populationSize(PopulationSizeString, [optional(true)]),
    crossoverProbability(CrossoverProbabilityString, [optional(true)]),
    mutationProbability(MutationProbabilityString, [optional(true)]),
    elitismRate(ElitismRateString, [optional(true)])]),

    atom_number(NrGenerationsString, NrGenerations),
    atom_number(StabilizationCriteriaValueString, StabilizationCriteriaValue),
    atom_number(IdealCostString, IdealCost),
    atom_number(PopulationSizeString, PopulationSize),
    atom_number(CrossoverProbabilityString, CrossoverProbability),
    atom_number(MutationProbabilityString, MutationProbability),
    atom_number(ElitismRateString, ElitismRate),

  assert_tasks(Tasks),
  asserta(nrDeGeracoes(NrGenerations)),
  asserta(populacao(PopulationSize)),
  asserta(prob_cruzamento(CrossoverProbability)),
  asserta(prob_mutacao(MutationProbability)),
  length(Tasks, NrTasks),
  asserta(nrDeTarefas(NrTasks)),
  asserta(taxa_elitismo(ElitismRate)),
  asserta(custoIdeal(IdealCost)),
  asserta(maxEstagnacoes(StabilizationCriteriaValue)),
  obterListaDeIDs(ListaTarefasIDs),
  (calcularCustoEntreTodasAsTarefas(ListaTarefasIDs);true),
  gera([Lista*_|_]),!,
  (tarefas_to_json_list(Lista, JsonList);true),
  told,
  retractall(tarefa(_)),
  retractall(nrDeGeracoes(_)),
  retractall(populacao(_)),
  retractall(prob_cruzamento(_)),
  retractall(prob_mutacao(_)),
  retractall(nrDeTarefas(_)),
  retractall(taxa_elitismo(_)),
  retractall(custoIdeal(_)),
  retractall(maxEstagnacoes(_)),
  retractall(diferencaEntreTarefas(_)),
  retractall(lastMin(_)),
  retractall(nrEstagnacoes(_)),
  reply_json(JsonList).

%==========================================================
assert_tasks([]).
assert_tasks([Task|Rest]) :-
    assert_task(Task),
    assert_tasks(Rest).

% Extract and assert individual fields of a task
assert_task(Task) :-
    Task = json([id=ID, pickupRoom=PickupRoom, deliveryRoom=DeliveryRoom, pickupFloor=PickupFloor, deliveryFloor=DeliveryFloor]),
    assert(tarefa(ID, PickupFloor, DeliveryFloor,PickupRoom, DeliveryRoom)).

%==========================================================
obterListaDeIDs(ListaTarefasIDs) :-
    findall(ID, tarefa(ID, _, _, _, _), ListaTarefasIDs).

%==========================================================
tarefa_to_json(ID, Json) :-
    tarefa(ID, PickupFloor, DeliveryFloor, PickupRoom, DeliveryRoom),
    Json = json([id=ID, pickupRoom=PickupRoom, deliveryRoom=DeliveryRoom, pickupFloor=PickupFloor, deliveryFloor=DeliveryFloor]).

tarefas_to_json_list([], []).
tarefas_to_json_list([TarefaId|Rest], [Json|JsonRest]) :-
    tarefa_to_json(TarefaId, Json),
    tarefas_to_json_list(Rest, JsonRest).
