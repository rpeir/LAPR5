#!/bin/bash

echo "Deployment 'Modulo Planeamento' script started"

cd froggers_sem5pi/ || (echo "Error entering froggers_sem5pi/" && exit 1)

# Atualiza o repositorio
git pull || (echo "Error updating repo" && exit 1)

cd modulo_planeamento/ || (echo "Error entering modulo_planeamento/" && exit 1)

# Mata processo que esteja a usar a porta 5000 (outra instancia do swipl)
fuser -n tcp 5000 -k  && echo "Killed running instance" || echo "No instance running of server. Continuing"

cd src/ || (echo "Error entering modulo_planeamento/src" && exit 1)

# Inicia modulo
swipl server.pl ../env/prod.pl || (echo "Error starting server" && exit 1)

echo "Deploy script finished execution successfully"

exit
