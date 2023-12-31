#!/bin/bash

(tmux kill-session -t frontend >/dev/null && echo "Killed frontend tmux session! Continuing...")

(tmux kill-session -t backend >/dev/null && echo "Killed backend tmux session! Continuing...")

(tmux kill-session -t gestao_tarefas >/dev/null && echo "Killed gestao_tarefas tmux session! Continuing...")

(tmux kill-session -t planeamento >/dev/null && echo "Killed planeamento tmux session! Continuing...")

echo "Done!"
