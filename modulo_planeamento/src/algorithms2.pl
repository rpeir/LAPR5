:-dynamic(connectCell/2).

%=====================================================
%  Create connectCell using matrixCells
%=====================================================
createGraph(_,-1):-!.
createGraph(Line,Column):-createColumn(Line,Column),
          NewColumn is Column - 1,
          createGraph(Line,NewColumn).

% old
%createColumn(0,_):-!.
%createColumn(Line,Column):-m(Line,Column,0),!,
%          NextLine is Line + 1, PreviousLine is Line - 1, NextColumn is Column + 1, PreviousColumn is Column - 1,
%          ((m(NextLine, Column,0), assertz(connectCell(cel(Line,Column),cel(NextLine,Column)));true)),
%          ((m(PreviousLine, Column,0), assertz(connectCell(cel(Line,Column),cel(PreviousLine,Column)));true)),
%          ((m(Line, NextColumn,0), assertz(connectCell(cel(Line,Column),cel(Line,NextColumn)));true)),
%          ((m(Line, PreviousColumn,0), assertz(connectCell(cel(Line,Column),cel(Line,PreviousColumn)));true)),
%          %diagonals
%          ((m(Line,NextColumn,0), m(NextLine,Column,0), assertz(connectCell(cel(Line,Column),cel(NextLine,NextColumn)));true)),
%          ((m(Line,PreviousColumn,0), m(NextLine,Column,0), assertz(connectCell(cel(Line,Column),cel(NextLine,PreviousColumn)));true)),
%          ((m(Line,NextColumn,0), m(PreviousLine,Column,0), assertz(connectCell(cel(Line,Column),cel(PreviousLine,NextColumn)));true)),
%          ((m(Line,PreviousColumn,0), m(PreviousLine,Column,0), assertz(connectCell(cel(Line,Column),cel(PreviousLine,PreviousColumn)));true)),
%          Line1 is Line -1,
%          createColumn(Line1,Column).
%createColumn(Line,Column):-Line1 is Line -1,
%          createColumn(Line1,Column).

createColumn(-1,_):-!.
createColumn(Line,Column):-m(Line,Column,0),!,
          % pode ir para cima
          create_up(Line,Column),
          % verifica se pode ir para baixo
          create_down(Line,Column),
          % pode ir para a esquerda
          create_left(Line,Column),
          % verifica se pode ir para a direita
          create_right(Line,Column),
          Line1 is Line - 1,
          createColumn(Line1,Column).

createColumn(Line,Column):-m(Line,Column,1),!,
          % pode ir para cima
          create_up(Line,Column),
          % verifica se pode ir para baixo
          create_down(Line,Column),
          % NAO pode ir para a esquerda, pq tem parede á esquerda
          % verifica se pode ir para a direita
          create_right(Line,Column),
          Line1 is Line - 1,
          createColumn(Line1,Column).

createColumn(Line,Column):-m(Line,Column,2),!,
           % NAO pode ir para cima, pq tem parede em cima
           % verifica se pode ir para baixo
           create_down(Line,Column),
           % pode ir para a esquerda
           create_left(Line,Column),
           % verifica se pode ir para a direita
           create_right(Line,Column),
           Line1 is Line - 1,
           createColumn(Line1,Column).

createColumn(Line,Column):-m(Line,Column,3),!,
          % NAO pode ir para cima, pq tem parede em cima
          % verifica se pode ir para baixo
          create_down(Line,Column),
          % NAO pode ir para a esquerda, pq tem parede á esquerda
          % verifica se pode ir para a direita
          create_right(Line,Column),
          Line1 is Line - 1,
          createColumn(Line1,Column).

createColumn(Line,Column):-m(Line,Column,4),!,
          % pode ir para cima
          create_up(Line,Column),
          % verifica se pode ir para baixo
          create_down(Line,Column),
          % pode ir para a esquerda
          create_left(Line,Column),
          % verifica se pode ir para a direita
          create_right(Line,Column),
          Line1 is Line - 1,
          createColumn(Line1,Column).

createColumn(Line,Column):-m(Line,Column,5),!,
          % pode ir para cima
          create_up(Line,Column),
          % verifica se pode ir para baixo
          create_down(Line,Column),
          % pode ir para a esquerda
          create_left(Line,Column),
          % verifica se pode ir para a direita
          create_right(Line,Column),
          Line1 is Line - 1,
          createColumn(Line1,Column).

createColumn(Line,Column):-m(Line,Column,6),!,
          % pode ir para cima
          create_up(Line,Column),
          % verifica se pode ir para baixo
          create_down(Line,Column),
          % pode ir para a esquerda
          create_left(Line,Column),
          % verifica se pode ir para a direita
          create_right(Line,Column),
          Line1 is Line - 1,
          createColumn(Line1,Column).


createColumn(Line,Column):-Line1 is Line - 1,
          createColumn(Line1,Column).


% create connection to cell above, unconditionally
create_up(Line, Column):- PreviousLine is Line - 1,
          (assertz(connectCell(cel(Line,Column),cel(PreviousLine,Column)));true).

% create connection to cell below, if it is not a wall
create_down(Line, Column):- NextLine is Line + 1,
          ((m(NextLine, Column,0);m(NextLine, Column,1);m(NextLine, Column,4);m(NextLine, Column,5);m(NextLine, Column,6)),
          assertz(connectCell(cel(Line,Column),cel(NextLine,Column)));true).

% create connection to cell on the left, unconditionally
create_left(Line, Column):- PreviousColumn is Column - 1,
          (assertz(connectCell(cel(Line,Column),cel(Line,PreviousColumn)));true).

% create connection to cell on the right, if it is not a wall
create_right(Line, Column):- NextColumn is Column + 1,
          ((m(Line, NextColumn,2);m(Line, NextColumn,0);m(Line, NextColumn,4);m(Line, NextColumn,5);m(Line, NextColumn,6)),
           assertz(connectCell(cel(Line,Column),cel(Line,NextColumn)));true).

%=====================================================


%=====================================================
% FindPath using DFS
%=====================================================

:-dynamic(bestSolution/2).
% to use in complexity analysis
better_dfs1(Origin, Destination, Cost, Path):-
%get_time(Ti),
(better_dfs(Origin,Destination);true),
retract(bestSolution(Path,Cost)).
%get_time(Tf),
%T is Tf-Ti,
%write('Solution: '), write(T), nl.

better_dfs(Origin, Destination):-
          assertz(bestSolution(_,10000)),
          dfs(Origin, Destination, Path),
          atualizeBestSolution(Path),
          %allow backtrack
          fail.

atualizeBestSolution(Path):-bestSolution(_,Cost),
          length(Path,NewCost),
          NewCost < Cost, retract(bestSolution(_,_)),
          assertz(bestSolution(Path,NewCost)).


dfs(Origin, Destination, Path):-dfs2(Origin, Destination, [Origin], Path).

dfs2(Destination, Destination, LA, Path):-reverse(LA, Path).

dfs2(Actual, Destination, LA, Path):-connectCell(Actual, Next),
          \+member(Next, LA),
          dfs2(Next, Destination, [Next|LA], Path).

%=====================================================
% FindPath from a room to a pathway
%=====================================================

findPathFromRoomToPathway(Room, PathwayDestination, Path):-roomLocation(_,Room,RoomLine,RoomColumn),
          pathwayLocation(_,PathwayDestination,PathwayLine,PathwayColumn),
          %(better_dfs(cel(RoomLine,RoomColumn), cel(PathwayLine,PathwayColumn));true),
          %(better_aStar(cel(RoomLine,RoomColumn), cel(PathwayLine,PathwayColumn));true),
          %bestSolution(Path,_),!.
          aStar(cel(RoomLine,RoomColumn), cel(PathwayLine,PathwayColumn), Path, _),!.

%=====================================================
% FindPath from a pathway to a room
%=====================================================
findPathFromPathwayToRoom(PathwaySource, RoomDestination, Path):-roomLocation(_,RoomDestination,RoomLine,RoomColumn),
          pathwayLocation(PathwaySource,_,PathwayLine,PathwayColumn),
          %(better_dfs(cel(PathwayLine,PathwayColumn), cel(RoomLine,RoomColumn));true),
          %(better_aStar(cel(PathwayLine,PathwayColumn), cel(RoomLine,RoomColumn));true),
          %bestSolution(Path,_),!.
          aStar(cel(PathwayLine,PathwayColumn), cel(RoomLine,RoomColumn), Path, _),!.

%=====================================================
% FindPath from a room to elevator
%=====================================================
findPathFromRoomToElevator(Room, Elevator, Path):-roomLocation(_,Room,RoomLine,RoomColumn),
          elevatorLocation(Elevator,ElevatorLine,ElevatorColumn),
          %(better_dfs(cel(RoomLine,RoomColumn), cel(ElevatorLine,ElevatorColumn));true),
          %(better_aStar(cel(RoomLine,RoomColumn), cel(ElevatorLine,ElevatorColumn));true),
          %bestSolution(Path,_),!.
          aStar(cel(RoomLine,RoomColumn), cel(ElevatorLine,ElevatorColumn), Path, _),!.

%=====================================================
% FindPath from elevator to room
%=====================================================
findPathFromElevatorToRoom(Elevator, Room, Path):-roomLocation(_,Room,RoomLine,RoomColumn),
          elevatorLocation(Elevator,ElevatorLine,ElevatorColumn),
          %(better_dfs(cel(ElevatorLine,ElevatorColumn), cel(RoomLine,RoomColumn));true),
          %(better_aStar(cel(ElevatorLine,ElevatorColumn), cel(RoomLine,RoomColumn));true),
          %bestSolution(Path,_),!.
          aStar(cel(ElevatorLine,ElevatorColumn), cel(RoomLine,RoomColumn), Path, _),!.

%=====================================================
% FindPath from a elevator to pathway
%=====================================================
findPathFromElevatorToPathway(Elevator, Pathway, Path):-pathwayLocation(_,Pathway,PathwayLine,PathwayColumn),
          elevatorLocation(Elevator,ElevatorLine,ElevatorColumn),
          %(better_dfs(cel(ElevatorLine,ElevatorColumn), cel(PathwayLine,PathwayColumn));true),
          %(better_aStar(cel(ElevatorLine,ElevatorColumn), cel(PathwayLine,PathwayColumn));true),
          %bestSolution(Path,_),!.
          aStar(cel(ElevatorLine,ElevatorColumn), cel(PathwayLine,PathwayColumn), Path, _),!.

%=====================================================
% FindPath from a pathway to elevator
%=====================================================
findPathFromPathwayToElevator(PathwaySource, Elevator, Path):-pathwayLocation(PathwaySource,_,PathwayLine,PathwayColumn),
          elevatorLocation(Elevator,ElevatorLine,ElevatorColumn),
          %(better_dfs(cel(PathwayLine,PathwayColumn), cel(ElevatorLine,ElevatorColumn));true),
          %(better_aStar(cel(PathwayLine,PathwayColumn), cel(ElevatorLine,ElevatorColumn));true),
          %bestSolution(Path,_),!.
          aStar(cel(PathwayLine,PathwayColumn), cel(ElevatorLine,ElevatorColumn), Path, _),!.

%=====================================================
% FindPath from a pathway to pathway
%=====================================================
findPathFromPathwayToPathway(Pathway1, Pathway2, Path):-pathwayLocation(Pathway1,_,PathwayLine1,PathwayColumn1),
          pathwayLocation(_,Pathway2,PathwayLine2,PathwayColumn2),
          %(better_dfs(cel(PathwayLine1,PathwayColumn1), cel(PathwayLine2,PathwayColumn2));true),
          %(better_aStar(cel(PathwayLine1,PathwayColumn1), cel(PathwayLine2,PathwayColumn2));true),
          %bestSolution(Path,_),!.
          aStar(cel(PathwayLine1,PathwayColumn1), cel(PathwayLine2,PathwayColumn2), Path, _),!.


%=====================================================

%=====================================================
startPath(_,_,[],[]).

startPath(Source,Destination,[pathW(FloorSource, FloorDestination)|OtherPath],Result):-
            preparePathwayInfo(FloorSource),
            findPathFromRoomToPathway(Source,FloorDestination,TempPath),
            retractPathwayInfo,
            continuePathFromPathway(FloorDestination,Destination,OtherPath,[TempPath], Result).

startPath(Source,Destination,[elev(FloorSource, FloorDestination)|OtherPath],Result):-
            prepareElevatorInfo(FloorSource),
            findPathFromRoomToElevator(Source,FloorSource,TempPath),
            retractElevatorInfo,
            continuePathFromElevator(FloorDestination,Destination,OtherPath,[TempPath], Result).

continuePathFromElevator(FloorSource,Destination,[],TempResult, Result):-
            prepareElevatorInfo(FloorSource),
            findPathFromElevatorToRoom(FloorSource,Destination,TempPath),
            retractElevatorInfo,
            reverse([TempPath|TempResult], Result).

continuePathFromElevator(FloorSource,Destination,[pathW(FloorSource, FloorDestination)|OtherPath],TempResult, Result):-
            prepareElevatorInfo(FloorSource),
            getPathwaysLocations(FloorSource),
            findPathFromElevatorToPathway(FloorSource,FloorDestination,TempPath),
            retractElevatorInfo,
            retractall(pathwayLocation(_,_,_,_)),
            continuePathFromPathway(FloorDestination,Destination,OtherPath,[TempPath|TempResult], Result).

continuePathFromElevator(FloorSource,Destination,[elev(FloorSource, FloorDestination)|OtherPath],TempResult, Result):-
            prepareElevatorInfo(FloorSource),
            findPathFromElevatorToPathway(FloorSource,FloorDestination,TempPath),
            retractElevatorInfo,
            continuePathFromRoom(FloorDestination,Destination,OtherPath, [TempPath|TempResult], Result).

continuePathFromPathway(FloorSource,Destination,[],TempResult, Result):-
            preparePathwayInfo(FloorSource),
            findPathFromPathwayToRoom(FloorSource,Destination,TempPath),
            retractPathwayInfo,
            reverse([TempPath|TempResult], Result).

continuePathFromPathway(FloorSource,Destination,[pathW(FloorSource, FloorDestination)|OtherPath],TempResult, Result):-
            preparePathwayInfo(FloorSource),
            findPathFromPathwayToPathway(FloorSource,FloorDestination,TempPath),
            retractPathwayInfo,
            continuePathFromPathway(FloorDestination,Destination,OtherPath,[TempPath|TempResult], Result).

continuePathFromPathway(FloorSource,Destination,[elev(FloorSource, FloorDestination)|OtherPath],TempResult, Result):-
            preparePathwayInfo(FloorSource),
            getElevatorLocation(FloorSource),
            findPathFromPathwayToElevator(FloorSource,FloorSource,TempPath),
            retractPathwayInfo,
            retractall(elevatorLocation(_,_,_)),
            continuePathFromElevator(FloorDestination,Destination,OtherPath,[TempPath|TempResult], Result).


%=====================================================
%  Get Floor Matrix, Pathways, Elevators and Rooms Locations
%=====================================================


preparePathwayInfo(FloorSource):-
            getFloorMatrix(FloorSource,MaxLines, MaxColumns),
            getPathwaysLocations(FloorSource),
            getRoomsLocations(FloorSource),
            createGraph(MaxLines, MaxColumns).

prepareElevatorInfo(FloorSource):-
            getFloorMatrix(FloorSource,MaxLines, MaxColumns),
            getElevatorLocation(FloorSource),
            getRoomsLocations(FloorSource),
            createGraph(MaxLines, MaxColumns).

%=====================================================
% Retract Floor Matrix, Pathways, Elevators and Rooms Locations
%=====================================================

retractPathwayInfo:-
            retractall(m(_,_,_)),
            retractall(connectCell(_,_)),
            retractall(roomLocation(_,_,_,_)),
            retractall(pathwayLocation(_,_,_,_)).

retractElevatorInfo:-
            retractall(m(_,_,_)),
            retractall(connectCell(_,_)),
            retractall(roomLocation(_,_,_,_)),
            retractall(elevatorLocation(_,_,_)).


%=====================================================
%A star
%=====================================================
better_aStar1(Origin, Destination, Cost, Path):-
get_time(Ti),
(better_aStar(Origin,Destination);true),
retract(bestSolution(Path,Cost)),
get_time(Tf),
T is Tf-Ti,
write('Solution: '), write(T), nl.

better_aStar(Origin, Destination):-
          assertz(bestSolution(_,10000)),
          aStar(Origin, Destination, Path, _),!,
          atualizeBestSolution(Path),
          %allow backtrack
          fail.


aStar(Origin, Destination, Path, Cost):-
            aStar2(Destination, [(_,0,[Origin])], Path, Cost).

aStar2(Destination, [(_,Cost,[Destination|Temp])|_], Path, Cost):-
             reverse([Destination|Temp], Path).

aStar2(Destination, [(_,ActualCost,ActualList)|Rest], Path, Cost):-
            ActualList = [Actual|_],
            findall((EstimatedCost,NextCost, [Next|ActualList]),
                    (Destination \== Actual, connectCell(Actual, Next), \+member(Next, ActualList),
                    NextCost is ActualCost + 1, estimate(Next, Destination, EstimatedNext),
                    EstimatedCost is NextCost + EstimatedNext), News),
            append(Rest, News, Everything),
            sort(Everything, SortedList),
            aStar2(Destination, SortedList, Path, Cost).

estimate(cel(Line1,Column1), cel(Line2,Column2), Cost):-
            Cost is sqrt((Line1 - Line2)^2 + (Column1 - Column2)^2).

