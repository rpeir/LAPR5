%======================================
% Generic algorithms
%======================================

%tarefa(Id, FloorSource, FloorDestination, RoomSource, RoomDestination, Time)
:- dynamic tarefa/6.
% diferencasEntrTarefas(IdTarefa1, IdTarefa2, Diferenca)
:- dynamic diferencaEntreTarefas/3.

:- dynamic nrDeTarefas/1.
:- dynamic nrDeGeracoes/1.
:- dynamic populacao/1.
:- dynamic prob_cruzamento/1.
:- dynamic prob_mutacao/1.
:- dynamic nrDeGeracoes/1.

%======================================
gera:-
     gera_populacao(Populacao),
     write('Pop='),write(Populacao),nl,
     avalia_populacao(Populacao,PopulacaoAvaliada),
     write('PopAv='),write(PopulacaoAvaliada),nl,
     ordena_populacao(PopulacaoAvaliada,PopulacaoOrdenada),
     nrDeGeracoes(NrGeracoes),
     gera_geracao(0,NrGeracoes,PopulacaoOrdenada).


%======================================
gera_populacao(Populacao):-
     populacao(Tamanho),
     nrDeTarefas(NrTarefas),
     findall(Tarefa,tarefa(Tarefa,_,_,_,_,_),ListaTarefas),
     gera_populacao(Tamanho,ListaTarefas,NrTarefas,Populacao).

gera_populacao(0,_,_,[]):-!.
gera_populacao(Tamanho,ListaTarefas,NrTarefas,[Individuo|Resto]):-
     Tamanho1 is Tamanho - 1,
     gera_populacao(Tamanho1,ListaTarefas,NrTarefas,Resto),
     gera_individuo(ListaTarefas,NrTarefas,Individuo),
     not(member(Individuo,Resto)).

gera_populacao(Tamanho,ListaTarefas,NrTarefas,Lista):-
      gera_populacao(Tamanho,ListaTarefas,NrTarefas,Lista).

%======================================

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NrTarefas,[G|Resto]):-
    NrTarefasTemp is NrTarefas + 1, % para usar com random
    random(1,NrTarefasTemp,N),
    retira(N,ListaTarefas,G,NovaLista),
    NrTarefas1 is NrTarefas - 1,
    gera_individuo(NovaLista,NrTarefas1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):- N1 is N - 1,
                                  retira(N1,Resto,G,Resto1).

%======================================
avalia_populacao([],[]).
avalia_populacao([Individuo|Resto],[Individuo*V|Resto1]):-
      avalia(Individuo,V),
      avalia_populacao(Resto,Resto1).


avalia([],0).
avalia([Tarefa|Resto],Val):-
      tarefa(Tarefa,_,_,_,_,T),
      avalia(Resto,VResto),
      avaliaDiferencaComProximo(Tarefa,Resto,VNext),
      Val is T + VNext + VResto.


avaliaDiferencaComProximo(_,[],0).
avaliaDiferencaComProximo(Tarefa,[Tarefa2|_],V):-
      tarefa(Tarefa,_,_,_,_,_),
      tarefa(Tarefa2,_,_,_,_,_),
      diferencaEntreTarefas(Tarefa,Tarefa2,V).

%======================================
ordena_populacao(PopulacaoAv,PopulacaoAvOrd):-
                bsort(PopulacaoAv,PopulacaoAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
      bsort(Xs,Zs),
      btroca([X|Zs],Ys).

btroca([X],[X]):-!.
btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
      VX>VY,!,
      btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


%======================================
gera_geracao(G,G,Populacao):-!,
      write('Geracao '),write(G), write(':'), nl, write(Populacao),nl.

gera_geracao(N,G,Populacao):-
      write('Geracao '),write(N), write(':'), nl, write(Populacao),nl,
      cruzamento(Populacao,PopulacaoCruzada),
      mutacao(PopulacaoCruzada,PopulacaoMutada),
      avalia_populacao(PopulacaoMutada,PopulacaoAvaliada),
      ordena_populacao(PopulacaoAvaliada,PopulacaoOrdenada),
      N1 is N + 1,
      gera_geracao(N1,G,PopulacaoOrdenada).

%======================================
gerar_pontos_cruzamento(P1,P2):-
      gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
      nrDeTarefas(NrTarefas),
      NrTarefas1 is NrTarefas + 1,
      random(1,NrTarefas1,P11),
      random(1,NrTarefas1,P21),
      P11\==P21,!,
      ((P11<P21,!, P1=P11, P2=P21);(P1=P21,P2=P11)).

gerar_pontos_cruzamento1(P1,P2):-
      gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Individuo*_],[Individuo]).
cruzamento([Individuo1*_,Individuo2*_|Resto],[NIndividuo1,NIndividuo2|Resto1]):-
      gerar_pontos_cruzamento(P1,P2),
      prob_cruzamento(Pcruz),
      random(0.0,1.0,Pc),
      ((Pc=<Pcruz,!,
      cruzar(Individuo1,Individuo2,P1,P2,NIndividuo1),
      cruzar(Individuo2,Individuo1,P1,P2,NIndividuo2))
      ;(NIndividuo1=Individuo1,NIndividuo2=Individuo2)),
      cruzamento(Resto,Resto1).


preencheh([],[]).
preencheh([_|Resto],[h|Resto1]):-preencheh(Resto,Resto1).

sublista(L1,I1,I2,L):-I1<I2,!,
      sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!, N3 is N2 - 1,
      sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-N3 is N1 - 1,
        N4 is N2 - 1,
        sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-nrDeTarefas(NrTarefas),
        T is NrTarefas - K,
        rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-N1 is N - 1,
        append(R,[X],R1),
        rr(N1,R1,R2).

elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-not(member(X,L)),!,
        elimina(R1,L,R2).

elimina([_|R1],L,R2):-elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
        nrDeTarefas(NrTarefas),
        ((N>NrTarefas,!,N1 is N mod NrTarefas);N1=N),
        insere1(X,N1,L,L1),
        N2 is N + 1,
        insere(R,L1,N2,L2).

insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-N1 is N - 1,
        insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
        sublista(Ind1,P1,P2,Sub1),
        nrDeTarefas(NrTarefas),
        R is NrTarefas - P2,
        rotate_right(Ind2,R,Ind21),
        elimina(Ind21,Sub1,Sub2),
        P3 is P2 + 1,
        insere(Sub2,Sub1,P3,NInd1),
        eliminah(NInd1,NInd11).

eliminah([],[]).
eliminah([h|R1],R2):-!,
        eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-eliminah(R1,R2).

%======================================
mutacao([],[]).
mutacao([Individuo|Rest],[NIndividuo|Rest1]):-
      prob_mutacao(Pmut),
      random(0.0,1.0,Pm),
      ((Pm<Pmut,!,
      mutacao1(Individuo,NIndividuo))
      ;(NIndividuo=Individuo)),
      mutacao(Rest,Rest1).

mutacao1(Individuo,NIndividuo):-
      gerar_pontos_cruzamento(P1,P2),
      mutacao22(Individuo,P1,P2,NIndividuo).

mutacao22([G1|Individuo],1,P2,[G2|NIndividuo]):-
        !,P21 is P2 - 1,
        mutacao23(G1,P21,Individuo,G2,NIndividuo).

mutacao22([G|Individuo],P1,P2,[G|NIndividuo]):-
        P11 is P1 - 1,
        P21 is P2 - 1,
        mutacao22(Individuo,P11,P21,NIndividuo).

mutacao23(G1,1,[G2|Individuo],G2,[G1|Individuo]):-!.
mutacao23(G1,P,[G|Individuo],G2,[G|NIndividuo]):-P1 is P - 1,
        mutacao23(G1,P1,Individuo,G2,NIndividuo).
