%%%%%%%%%%%%%%%%%%%%%%%%%%
:-dynamic m/3.
:-dynamic nlin/1.
cria_matriz(NCol,NLin):-
    retractall(m(_,_,_)),
    retractall(nlin(_)),
    asserta(nlin(NLin)),
    cria_matriz_0(NCol,NLin).


cria_matriz_0(1,1):-!,asserta(m(1,1,0)).
cria_matriz_0(NCol,1):-!,asserta(m(NCol,1,0)),NCol1 is NCol-1,nlin(NLin),cria_matriz_0(NCol1,NLin).
cria_matriz_0(NCol,NLin):-asserta(m(NCol,NLin,0)),NLin1 is NLin-1,cria_matriz_0(NCol,NLin1).
