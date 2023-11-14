:- use_module(library(http/http_server)).
:- use_module(library(http/json)).

runServer:- http_server(http_dispatch,[port(5000)]).

:-http_handler(root(path/lessBuildings), handleQuery, []).

handleQuery(Request) :-
  write("hello"),nl,
  http_parameters(Request,[floorSource(FloorSource, [optional(true)]),floorDestination(FloorDestination, [optional(true)])]),
  write(FloorSource),nl,write(FloorDestination),nl,
  best_path_less_elevators(FloorSource,FloorDestination,Path),
  reply_json(Path).
