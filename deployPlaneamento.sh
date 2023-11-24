#!/usr/bin/env bash

echo "Deploy script started"

# Atualilza o sistema
echo $sudopass | sudo -S apt-get update
echo $sudopass | sudo -S apt-get upgrade -y

cd froggers_sem5pi/

# Atualiza o repositorio
git pull

cd modulo_planeamento/

swipl start.pl

echo "Deploy script finished execution"

