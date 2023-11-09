:- use_module(library(http/http_json)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_client)).

% =================================================
% Find all buildings and floors
% =================================================

:- dynamic floor/2.

getFloors():-
    % Open an HTTP connection and read the JSON response
    http_open('http://localhost:4000/api/planning/floors', ResultJSON, []),
    % Parse the JSON response into a Prolog term
    json_read_dict(ResultJSON, ResultValue, []),
    % Close the HTTP connection
    close(ResultJSON),
    % Extract and process the JSON data
    process_Floor_json_data(ResultValue).

% Define a predicate to process the JSON data and construct the floor/2 facts
process_Floor_json_data([]).
process_Floor_json_data([BuildingObj | RestData]) :-
    % Extract the "building" and "floors" properties from the object
    get_dict(building, BuildingObj, Building),
    get_dict(floors, BuildingObj, Floors),
    % Create a building/2 fact with the extracted data
    F = floor(Building, Floors),
    assert(F),
    % Recursively process the rest of the JSON data
    process_Floor_json_data(RestData).

% =================================================
% Find all elevators and floors
% =================================================

:- dynamic elevator/2.

getElevators():-
    % Open an HTTP connection and read the JSON response
    http_open('http://localhost:4000/api/planning/elevators', ResultJSON, []),
    % Parse the JSON response into a Prolog term
    json_read_dict(ResultJSON, ResultValue, []),
    % Close the HTTP connection
    close(ResultJSON),
    % Extract and process the JSON data
    process_Elevator_json_data(ResultValue).

% Define a predicate to process the JSON data and construct the elevator/2 facts
process_Elevator_json_data([]).
process_Elevator_json_data([ElevatorObj | RestData]) :-
    % Extract the "buildingDesignation" and "floors" properties from the object
    get_dict(buildingDesignation, ElevatorObj, Building),
    get_dict(floorsServed, ElevatorObj, Floors),
    % Create a building/2 fact with the extracted data
    E = elevator(Building, Floors),
        assert(E),
    % Recursively process the rest of the JSON data
    process_Elevator_json_data(RestData).

% =================================================
% Find all patwhays, buildings and floors
% =================================================

:- dynamic pathway/4.

getPathways():-
    % Open an HTTP connection and read the JSON response
    http_open('http://localhost:4000/api/planning/pathways', ResultJSON, []),
    % Parse the JSON response into a Prolog term
    json_read_dict(ResultJSON, ResultValue, []),
    % Close the HTTP connection
    close(ResultJSON),
    % Extract and process the JSON data
    process_Pathway_json_data(ResultValue).

% Define a predicate to process the JSON data and construct the pathway/4 facts
process_Pathway_json_data([]).
process_Pathway_json_data([PathwayObj | RestData]) :-
    % Extract the "buildingDesignation" and "floors" properties from the object
    get_dict(buildingSource, PathwayObj, BuildingSource),
    get_dict(buildingDestination, PathwayObj, BuildingDestination),
    get_dict(floorSource, PathwayObj, FloorSource),
    get_dict(floorDestination, PathwayObj, FloorDestination),
    % Create a building/2 fact with the extracted data
    P = pathway(BuildingSource, BuildingDestination, FloorSource, FloorDestination),
        assert(P),
    % Recursively process the rest of the JSON data
    process_Pathway_json_data(RestData).
