#!/bin/bash

(tmux kill-session -t frontend >/dev/null && echo "Killed frontend tmux session! Continuing...")

(tmux kill-session -t backend >/dev/null && echo "Killed backend tmux session! Continuing...")

echo "Done!"
