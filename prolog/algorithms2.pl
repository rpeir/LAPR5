:-dynamic connectCell/2.

createGraph(_,-1):-!.
createGraph(Line,Collum):-createCollum(Line,Collum),
          NewCollum is Collum - 1,
          createGraph(Line,NewCollum).

% old
%createCollum(0,_):-!.
%createCollum(Line,Collum):-m(Line,Collum,0),!,
%          NextLine is Line + 1, PreviousLine is Line - 1, NextCollum is Collum + 1, PreviousCollum is Collum - 1,
%          ((m(NextLine, Collum,0), assertz(connectCell(cel(Line,Collum),cel(NextLine,Collum)));true)),
%          ((m(PreviousLine, Collum,0), assertz(connectCell(cel(Line,Collum),cel(PreviousLine,Collum)));true)),
%          ((m(Line, NextCollum,0), assertz(connectCell(cel(Line,Collum),cel(Line,NextCollum)));true)),
%          ((m(Line, PreviousCollum,0), assertz(connectCell(cel(Line,Collum),cel(Line,PreviousCollum)));true)),
%          %diagonals
%          ((m(Line,NextCollum,0), m(NextLine,Collum,0), assertz(connectCell(cel(Line,Collum),cel(NextLine,NextCollum)));true)),
%          ((m(Line,PreviousCollum,0), m(NextLine,Collum,0), assertz(connectCell(cel(Line,Collum),cel(NextLine,PreviousCollum)));true)),
%          ((m(Line,NextCollum,0), m(PreviousLine,Collum,0), assertz(connectCell(cel(Line,Collum),cel(PreviousLine,NextCollum)));true)),
%          ((m(Line,PreviousCollum,0), m(PreviousLine,Collum,0), assertz(connectCell(cel(Line,Collum),cel(PreviousLine,PreviousCollum)));true)),
%          Line1 is Line -1,
%          createCollum(Line1,Collum).
%createCollum(Line,Collum):-Line1 is Line -1,
%          createCollum(Line1,Collum).

createCollum(-1,_):-!.
createCollum(Line,Collum):-m(Line,Collum,0),!,
          % pode ir para cima
          create_up(Line,Collum),
          % verifica se pode ir para baixo
          create_down(Line,Collum),
          % pode ir para a esquerda
          create_left(Line,Collum),
          % verifica se pode ir para a direita
          create_right(Line,Collum),
          Line1 is Line -1,
          createCollum(Line1,Collum).

createCollum(Line,Collum):-m(Line,Collum,1),!,
          % pode ir para cima
          create_up(Line,Collum),
          % verifica se pode ir para baixo
          create_down(Line,Collum),
          % NAO pode ir para a esquerda, pq tem parede á esquerda
          % verifica se pode ir para a direita
          create_right(Line,Collum),
          Line1 is Line -1,
          createCollum(Line1,Collum).

createCollum(Line,Collum):-m(Line,Collum,2),!,
           % NAO pode ir para cima, pq tem parede em cima
           % verifica se pode ir para baixo
           create_down(Line,Collum),
           % pode ir para a esquerda
           create_left(Line,Collum),
           % verifica se pode ir para a direita
           create_right(Line,Collum),
           Line1 is Line -1,
           createCollum(Line1,Collum).

createCollum(Line,Collum):-m(Line,Collum,3),!,
          % NAO pode ir para cima, pq tem parede em cima
          % verifica se pode ir para baixo
          create_down(Line,Collum),
          % NAO pode ir para a esquerda, pq tem parede á esquerda
          % verifica se pode ir para a direita
          create_right(Line,Collum),
          Line1 is Line -1,
          createCollum(Line1,Collum).


createCollum(Line,Collum):-Line1 is Line -1,
          createCollum(Line1,Collum).


% create connection to cell above, unconditionally
create_up(Line, Collum):- PreviousLine is Line - 1,
          (assertz(connectCell(cel(Line,Collum),cel(PreviousLine,Collum)));true).

% create connection to cell below, if it is not a wall
create_down(Line, Collum):- NextLine is Line + 1,
          ((m(NextLine, Collum,1);m(NextLine, Collum,0)), assertz(connectCell(cel(Line,Collum),cel(NextLine,Collum)));true).

% create connection to cell on the left, unconditionally
create_left(Line, Collum):- PreviousCollum is Collum - 1,
          (assertz(connectCell(cel(Line,Collum),cel(Line,PreviousCollum)));true).

% create connection to cell on the right, if it is not a wall
create_right(Line, Collum):- NextCollum is Collum + 1,
          ((m(Line, NextCollum,2);m(Line, NextCollum,0)), assertz(connectCell(cel(Line,Collum),cel(Line,NextCollum)));true).


:-dynamic bestSolution/2.

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



