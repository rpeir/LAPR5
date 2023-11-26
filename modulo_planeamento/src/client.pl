:- use_module(library(http/http_json)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_client)).

% =================================================
% Find all buildings and floors
% =================================================

:- dynamic floor/2.
:-dynamic m/3.
:-dynamic elevatorLocation/3.
:-dynamic pathwayLocation/4.
:-dynamic roomLocation/4.
:- dynamic elevator/2.
:- dynamic pathway/4.

getFloors():-
    % Open an HTTP connection and read the JSON response
    url(BaseURL),
    format(atom(URL), BaseURL, ['/api/planning/floors']),
    http_open(URL, ResultJSON, []),
    % Parse the JSON response into a Prolog term
    json_read_dict(ResultJSON, ResultValue, []),
    % Close the HTTP connection
    close(ResultJSON),
    % Extract and process the JSON data
    process_Floor_json_data(ResultValue).

% process the JSON data and construct the floor/2 facts
process_Floor_json_data([]).
process_Floor_json_data([BuildingObj | RestData]) :-
    % Extract the "building" and "floors" properties from the object
    get_dict(building, BuildingObj, Building),
    get_dict(floors, BuildingObj, Floors),
    % Create a floor fact with the extracted data
    F = floor(Building, Floors),
    assert(F),
    % Recursively process the rest of the JSON data
    process_Floor_json_data(RestData).

% =================================================
% Find all elevators and floors
% =================================================


getElevators():-
    % Open an HTTP connection and read the JSON response
    url(BaseURL),
    format(atom(URL), BaseURL, ['/api/planning/elevators']),
    http_open(URL, ResultJSON, []),
    % Parse the JSON response into a Prolog term
    json_read_dict(ResultJSON, ResultValue, []),
    % Close the HTTP connection
    close(ResultJSON),
    % Extract and process the JSON data
    process_Elevator_json_data(ResultValue).

%process the JSON data and construct the elevator/2 facts
process_Elevator_json_data([]).
process_Elevator_json_data([ElevatorObj | RestData]) :-
    % Extract the "buildingDesignation" and "floors" properties from the object
    get_dict(building, ElevatorObj, Building),
    get_dict(floors, ElevatorObj, Floors),
    % Create a elevator fact with the extracted data
    E = elevator(Building, Floors),
        assert(E),
    % Recursively process the rest of the JSON data
    process_Elevator_json_data(RestData).

% =================================================
% Find all patwhays, buildings and floors
% =================================================



getPathways():-
    % Open an HTTP connection and read the JSON response
    url(BaseURL),
    format(atom(URL), BaseURL, ['/api/planning/pathways']),
    http_open(URL, ResultJSON, []),
    % Parse the JSON response into a Prolog term
    json_read_dict(ResultJSON, ResultValue, []),
    % Close the HTTP connection
    close(ResultJSON),
    % Extract and process the JSON data
    process_Pathway_json_data(ResultValue).

%process the JSON data and construct the pathway/4 facts
process_Pathway_json_data([]).
process_Pathway_json_data([PathwayObj | RestData]) :-
    % Extract the"buildingDesignation" and "floors" properties from the object
    get_dict(buildingSource, PathwayObj, BuildingSource),
    get_dict(buildingDestination, PathwayObj, BuildingDestination),
    get_dict(floorSource, PathwayObj, FloorSource),
    get_dict(floorDestination, PathwayObj, FloorDestination),
    % Create a pathway fact with the extracted data
    P = pathway(BuildingSource, BuildingDestination, FloorSource, FloorDestination),
        assert(P),
    % Recursively process the rest of the JSON data
    process_Pathway_json_data(RestData).

% =================================================
% Find floor matrix
% =================================================

getFloorMatrix(Floor,MaxLines, MaxColumns):-
    % Construct the URL with the floor as a query parameter
    url(BaseURL),
    format(atom(PreURL), BaseURL, ['/api/planning/floorPlanningMatrix?floor=~w']),
    format(atom(URL), PreURL, [Floor]),
    % Open an HTTP connection and read the JSON response
    http_open(URL, ResultJSON, []),
    % Parse the JSON response into a Prolog term
    json_read_dict(ResultJSON, ResultValue, []),
    % Close the HTTP connection
    close(ResultJSON),
    % Extract and process the JSON data
    process_matrix_json_data(ResultValue,MaxLines, MaxColumns).

process_matrixValues_json_data([]).
process_matrixValues_json_data([MatrixObj | RestData]) :-
    % Extract the  properties from the object
    get_dict(line, MatrixObj, Line),
    get_dict(column, MatrixObj, Column),
    get_dict(value, MatrixObj, Value),
    % Create a matrixCell with the extracted data
    M = m(Line, Column, Value),
        assert(M),
    % Recursively process the rest of the JSON data
    process_matrixValues_json_data(RestData).

process_matrix_json_data(ResultValue, MaxLines, MaxColumns):-
    % Extract the  properties from the object
    get_dict(maxLines, ResultValue, MaxLines),
    get_dict(maxColumns, ResultValue, MaxColumns),
    get_dict(matrix, ResultValue, Matrix),
    % Create a matrixCell with the extracted data
    process_matrixValues_json_data(Matrix).

% =================================================
% Find all elevators locations
% =================================================
getElevatorLocation(Floor):-
    % Construct the URL with the floor as a query parameter
    url(BaseURL),
    format(atom(PreURL), BaseURL, ['/api/planning/planningElevatorLocation?floor=~w']),
    format(atom(URL), PreURL, [Floor]),
    % Open an HTTP connection and read the JSON response
    http_open(URL, ResultJSON, []),
    % Parse the JSON response into a Prolog term
    json_read_dict(ResultJSON, ResultValue, []),
    % Close the HTTP connection
    close(ResultJSON),
    % Extract and process the JSON data
    process_elevatorLocation_json_data(ResultValue).

process_elevatorLocation_json_data([]).
process_elevatorLocation_json_data([ElevatorLocationObj | RestData]) :-
    % Extract the properties from the object
    get_dict(floor, ElevatorLocationObj, Floor),
    get_dict(column, ElevatorLocationObj, Column),
    get_dict(line, ElevatorLocationObj, Line),
    % Create elevatorLocation fact with the extracted data
    E = elevatorLocation(Floor, Column, Line),
        assert(E),
    % Recursively process the rest of the JSON data
    process_elevatorLocation_json_data(RestData).


% =================================================
% Find all pathways locations
% =================================================

getPathwaysLocations(Floor):-
    % Construct the URL with the floor as a query parameter
    url(BaseURL),
    format(atom(PreURL), BaseURL, ['/api/planning/planningPathwayLocation?floor=~w']),
    format(atom(URL), PreURL, [Floor]),
    % Open an HTTP connection and read the JSON response
    http_open(URL, ResultJSON, []),
    % Parse the JSON response into a Prolog term
    json_read_dict(ResultJSON, ResultValue, []),
    % Close the HTTP connection
    close(ResultJSON),
    % Extract and process the JSON data
    process_pathwayLocation_json_data(ResultValue).

process_pathwayLocation_json_data([]).
process_pathwayLocation_json_data([PathwayLocationObj | RestData]) :-
    % Extract the properties from the object
    get_dict(floorSource, PathwayLocationObj, Floor),
    get_dict(floorDestination, PathwayLocationObj, FloorDestination),
    get_dict(column, PathwayLocationObj, Column),
    get_dict(line, PathwayLocationObj, Line),
    % Create a building/2 fact with the extracted data
    P = pathwayLocation(Floor, FloorDestination, Line, Column),
        assert(P),
    % Recursively process the rest of the JSON data
    process_pathwayLocation_json_data(RestData).

% =================================================
% Find all rooms locations
% =================================================

getRoomsLocations(Floor):-
    % Construct the URL with the floor as a query parameter
    url(BaseURL),
    format(atom(PreURL), BaseURL, ['/api/planning/planningRoomsLocation?floor=~w']),
    format(atom(URL), PreURL, [Floor]),
    % Open an HTTP connection and read the JSON response
    http_open(URL, ResultJSON, []),
    % Parse the JSON response into a Prolog term
    json_read_dict(ResultJSON, ResultValue, []),
    % Close the HTTP connection
    close(ResultJSON),
    % Extract and process the JSON data
    process_roomLocation_json_data(ResultValue).

process_roomLocation_json_data([]).
process_roomLocation_json_data([RoomLocationObj | RestData]) :-
    % Extract the properties from the object
    get_dict(floor, RoomLocationObj, Floor),
    get_dict(column, RoomLocationObj, Column),
    get_dict(line, RoomLocationObj, Line),
    get_dict(room, RoomLocationObj, Room),
    % Create a roomLocation/4 fact with the extracted data
    R = roomLocation(Floor, Room, Line, Column),
        assert(R),
    % Recursively process the rest of the JSON data
    process_roomLocation_json_data(RestData).
