#!/usr/bin/env bash

echo "Deploy script started"

# Atualilza o sistema
(echo $sudopass | sudo -S apt-get update) || exit 1
(echo $sudopass | sudo -S apt-get upgrade -y) || exit 1

cd froggers_sem5pi/ || exit 1

# Atualiza o repositorio
git pull || exit 1

cd modulo_planeamento/ || exit 1

swipl start.pl || exit 1

echo "Deploy script finished execution"

exit 0
