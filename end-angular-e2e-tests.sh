#!/bin/bash

MIGRATIONS_FILE="Migrations.tar"
GESTAO_TAREFAS_FOLDER=./modulo_gestao_tarefas/GestaoTarefas

(tmux kill-session -t frontend >/dev/null && echo "Killed frontend tmux session! Continuing...")

(tmux kill-session -t backend >/dev/null && echo "Killed backend tmux session! Continuing...")

(tmux kill-session -t gestao_tarefas >/dev/null && echo "Killed gestao_tarefas tmux session! Continuing...")

(tmux kill-session -t planeamento >/dev/null && echo "Killed planeamento tmux session! Continuing...")

fuser -n tcp 5000 -k && echo "Killed planeamento prolog HTTP service"

# restore the gestao_tarefas migrations

( rm -r $GESTAO_TAREFAS_FOLDER/Migrations
tar -x -p -f $MIGRATIONS_FILE &&
rm $MIGRATIONS_FILE &&
echo "Restored $MIGRATIONS_FILE" ) || echo "Error removing $MIGRATIONS_FILE"


echo "Done!"
