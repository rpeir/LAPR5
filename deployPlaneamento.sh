#!/usr/bin/env bash

echo "Deploy script started"

# Atualilza o sistema
cd froggers_sem5pi/ || exit 1

# Atualiza o repositorio
git pull || exit 1

cd modulo_planeamento/ || (echo "Error entering modulo_planeamento/" && exit 1)

swipl start.pl || exit 1

echo "Deploy script finished execution successfully"

exit 0
