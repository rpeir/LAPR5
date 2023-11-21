:-dynamic connectCell/2.

createGraph(_,0):-!.
createGraph(Line,Collum):-createCollum(Line,Collum),
          NewCollum is Collum - 1,
          createGraph(Line,NewCollum).

createCollum(0,_):-!.
createCollum(Line,Collum):-m(Line,Collum,0),!,
          NextLine is Line + 1, PreviousLine is Line - 1, NextCollum is Collum + 1, PreviousCollum is Collum - 1,
          ((m(NextLine, Collum,0), assertz(connectCell(cel(Line,Collum),cel(NextLine,Collum)));true)),
          ((m(PreviousLine, Collum,0), assertz(connectCell(cel(Line,Collum),cel(PreviousLine,Collum)));true)),
          ((m(Line, NextCollum,0), assertz(connectCell(cel(Line,Collum),cel(Line,NextCollum)));true)),
          ((m(Line, PreviousCollum,0), assertz(connectCell(cel(Line,Collum),cel(Line,PreviousCollum)));true)),
          %diagonals
          ((m(Line,NextCollum,0), m(NextLine,Collum,0), assertz(connectCell(cel(Line,Collum),cel(NextLine,NextCollum)));true)),
          ((m(Line,PreviousCollum,0), m(NextLine,Collum,0), assertz(connectCell(cel(Line,Collum),cel(NextLine,PreviousCollum)));true)),
          ((m(Line,NextCollum,0), m(PreviousLine,Collum,0), assertz(connectCell(cel(Line,Collum),cel(PreviousLine,NextCollum)));true)),
          ((m(Line,PreviousCollum,0), m(PreviousLine,Collum,0), assertz(connectCell(cel(Line,Collum),cel(PreviousLine,PreviousCollum)));true)),
          Line1 is Line -1,
          createCollum(Line1,Collum).
createCollum(Line,Collum):-Line1 is Line -1,
          createCollum(Line1,Collum).


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



