%======================================
% Generic algorithms
%======================================
:- dynamic(tarefa/5).
:- dynamic(diferencaEntreTarefas/3).

:- dynamic(nrDeTarefas/1).
:- dynamic(nrDeGeracoes/1).
:- dynamic(populacao/1).
:- dynamic(prob_cruzamento/1).
:- dynamic(prob_mutacao/1).
:-dynamic(taxa_elitismo/1).
:-dynamic(custoIdeal/1).
:-dynamic(maxEstagnacoes/1).
:-dynamic(lastMin/1).
:-dynamic(nrEstagnacoes/1).
:-dynamic(bestPermutation/1).

custoElevator(15).
custoPathway(10).

%======================================
gera(Resultado):-
     gera_populacao(Populacao),
     write('Pop='),write(Populacao),nl,
     avalia_populacao(Populacao,PopulacaoAvaliada),!,
     write('PopAv='),write(PopulacaoAvaliada),nl,
     ordena_populacao(PopulacaoAvaliada,PopulacaoOrdenada),
     nrDeGeracoes(NrGeracoes),
     asserta(nrEstagnacoes(0)),
     asserta(lastMin(0)),
     gera_geracao(0,NrGeracoes,PopulacaoOrdenada,Resultado).


%======================================
gera_populacao(Populacao):-
     populacao(Tamanho),
     nrDeTarefas(NrTarefas),
     findall(Tarefa,tarefa(Tarefa,_,_,_,_),ListaTarefas),
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
      tarefa(Tarefa,_,_,_,_),
      avalia(Resto,VResto),
      avaliaDiferencaComProximo(Tarefa,Resto,VNext),
      Val is VNext + VResto.


avaliaDiferencaComProximo(_,[],0).
avaliaDiferencaComProximo(Tarefa,[Tarefa2|_],V):-
      tarefa(Tarefa,_,_,_,_),
      tarefa(Tarefa2,_,_,_,_),
      (diferencaEntreTarefas(Tarefa,Tarefa2,V);diferencaEntreTarefas(Tarefa2,Tarefa,V)).

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
verificarEstagnacao([_*V|_]):-
      lastMin(Min),
      (
        (V=Min,
        nrEstagnacoes(NrEstagnacoes),
        NrEstagnacoes1 is NrEstagnacoes + 1,
        retractall(nrEstagnacoes(_)),
        assert(nrEstagnacoes(NrEstagnacoes1)))
      ;
        ((retractall(nrEstagnacoes(_)),
        assert(nrEstagnacoes(0)),
        retractall(lastMin(_)),
        assert(lastMin(V))))
      ).



gera_geracao(G,_,[Individuo*V|Resto],[Individuo*V|Resto]):-
      lastMin(Min),
      V=Min,
      nrEstagnacoes(NrEstagnacoes),
      maxEstagnacoes(MaxEstagnacoes),
      NrEstagnacoes= MaxEstagnacoes,!,
      write('Geracao '),write(G), write(':'), nl,write([Individuo*V|Resto]),nl,
      write('Estagnacao atingida: '),write(NrEstagnacoes),nl,!.


gera_geracao(G,_,[Individuo*V|Resto],[Individuo*V|Resto]):-custoIdeal(CustoIdeal),V=<CustoIdeal,!,
      write('Geracao '),write(G), write(':'), nl,write([Individuo*V|Resto]),nl,
      write('Custo Ideal atingido: '), write(V),nl,!.

gera_geracao(G,G,Populacao,Populacao):-!,
      write('Geracao '),write(G), write(':'), nl, write(Populacao),nl,
      write('Numero maximo de geracoes atingido: '), write(G),nl,!.

gera_geracao(N,G,Populacao,Resultado):-
      write('Geracao '),write(N), write(':'), nl, write(Populacao),nl,
      random_permutation(Populacao,PopulacaoEmbaralhada),
      cruzamento(PopulacaoEmbaralhada,PopulacaoCruzada),
      mutacao(PopulacaoCruzada,PopulacaoMutada),
      avalia_populacao(PopulacaoMutada,PopulacaoAvaliada),!,
      ordena_populacao(PopulacaoAvaliada,PopulacaoOrdenada),
      junta_sem_repetidos(PopulacaoEmbaralhada,PopulacaoOrdenada,PopulacaoMaisNovaPopulacao),
      ordena_populacao(PopulacaoMaisNovaPopulacao,PopulacaoMaisNovaPopulacaoOrdenada),
      taxa_elitismo(Percentual),
      populacao(Qtd),
      nrDePassagens(Qtd,Percentual,NrPassagens),
      separar_n_elementos(PopulacaoMaisNovaPopulacaoOrdenada, NrPassagens, PrimeiroMelhor, Resto),
      QtdRestante is Qtd - NrPassagens,
      selecionarResto(Resto,QtdRestante,Restantes),
      append(PrimeiroMelhor, Restantes, ProximaPopulacao),
      N1 is N + 1,
      verificarEstagnacao(ProximaPopulacao),
      gera_geracao(N1,G,ProximaPopulacao,Resultado).


junta_sem_repetidos(Lista1, Lista2, Resultado) :-
    append(Lista1, Lista2, ListaConcatenada),
    remove_repetidos(ListaConcatenada, Resultado).


remove_repetidos([], []).

remove_repetidos([X | Resto], SemRepetidos) :-
    member(X, Resto),!,
    remove_repetidos(Resto, SemRepetidos).

remove_repetidos([X | Resto], [X | SemRepetidos]) :-
    remove_repetidos(Resto, SemRepetidos).

nrDePassagens(Total, Percentual, Numero) :-
    Percentual >= 0, Percentual =< 1,
    ResultadoBruto is Total * Percentual,
    Numero is round(ResultadoBruto).

separar_n_elementos(ListaOriginal, N, ListaSeparada, Resto) :-
    length(ListaSeparada, N), % Garante que a ListaSeparada tenha comprimento N
    append(ListaSeparada, Resto, ListaOriginal).

selecionarResto(Resto,QtdRestante,Restantes):-
    multiplicarPorRandom(Resto,RandomResto),
    ordena_populacao(RandomResto,RandomRestoOrdenado),
    removerMultiplicaoRandom(RandomRestoOrdenado,RestoOrdenado),
    avalia_populacao(RestoOrdenado,PopulacaoAvaliada),!,
    ordena_populacao(PopulacaoAvaliada,PopulacaoOrdenada),
    separar_n_elementos(PopulacaoOrdenada, QtdRestante, Restantes, _).

multiplicarPorRandom([],[]).
multiplicarPorRandom([Individuo*V|Resto],[Individuo*V1|Resto1]):-
      random(0.0,1.0,Random),
      V1 is V * Random,
      multiplicarPorRandom(Resto,Resto1).

removerMultiplicaoRandom([],[]).
removerMultiplicaoRandom([Individuo*_|Resto],[Individuo|Resto1]):-
      removerMultiplicaoRandom(Resto,Resto1).
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


%=====================================
calcularCustoOfPath([], 0).
calcularCustoOfPath([FloorPath|Rest], Result):-
        calcularCustoOfPath(Rest, Result1),
        length(FloorPath, Result2),
        Result is Result1 + Result2.


calcularCustoEntreTarefas(TarefaId1,TarefaId2):-
        tarefa(TarefaId1,_,FloorDestination,_,RoomDestination),
        tarefa(TarefaId2,FloorSource2,_,RoomSource2,_),
          atom_string(FloorDestination,F1),
          atom_string(FloorSource2,F2),
          atom_string(RoomDestination,R1),
          atom_string(RoomSource2,R2),
        best_path_less_elevators(F1,F2,[_,ListPath]),!,
        count(ListPath,NElev,NPathway),
        custoElevator(ElevatorCost),
        custoPathway(PathwayCost),
        startPath(R1,R2,ListPath,PathInside),!,
        calcularCustoOfPath(PathInside, Custo),
        CustoTotal is Custo + (NElev * ElevatorCost) + (PathwayCost *  NPathway),
        asserta(diferencaEntreTarefas(TarefaId1,TarefaId2,CustoTotal)).

calcularCustoEntreTodasAsTarefas(ListaDeTarefas) :-
    length(ListaDeTarefas, N),
    between(1, N, I),
    between(1, N, J),
    (I < J), % Evita calcular o custo entre a mesma tarefa
    nth1(I, ListaDeTarefas, TarefaId1),
    nth1(J, ListaDeTarefas, TarefaId2),
    calcularCustoEntreTarefas(TarefaId1, TarefaId2),
    fail. % Força a busca por mais soluções
%======================================
% gerar ataravez de Permutacoes
%======================================


geraComPermutacoes:-
      findall(Tarefa,tarefa(Tarefa,_,_,_,_),ListaTarefas),
      asserta(bestPermutation([]*10000)),
      permutation(ListaTarefas,Permutacao),
      comparaPermutacao(Permutacao),
      fail.



comparaPermutacao(Permutacao):-
      avalia_populacao([Permutacao],PopulacaoAvaliada),!,
      bestPermutation(ActualBestSolution),
      append(PopulacaoAvaliada, [ActualBestSolution], PopulacaoPorOrdenar),
      ordena_populacao(PopulacaoPorOrdenar,[BestSolution|_]),
      retractall(bestPermutation(_)),
      asserta(bestPermutation(BestSolution)).
