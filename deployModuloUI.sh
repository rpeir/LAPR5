#!/bin/bash

SUDO_PASSWORD="sapo1234"

echo "Deployment 'Modulo Master Data' script started"

cd froggers_sem5pi/ || (echo "Error entering froggers_sem5pi/" && exit 1)

# Atualiza o repositorio
git pull || (echo "Error updating repo" && exit 1)

cd angular-app/ || (echo "Error entering angular-app/" && exit 1)

# Instala as dependencias
(echo $SUDO_PASSWORD | sudo -S npm install && echo "NPM install sucessfully") || (echo "Error installing npm" && exit 1)

# Iniciar mongodb de testes
(echo $SUDO_PASSWORD | sudo -S mongod && echo "Created test database sucessfully") || (echo "Error creating test database" && exit 1)

# run in test env
NODE_ENV=test
npm run test || echo "Unit tests failed"
npm run e2e || echo "End to End tests failed"

# Apagar a base de dados de testes
(echo "db.dropDatabase()" | mongosh) || (echo "Error droping test database" && exit 1)

# Parar mongodb de testes
(echo $SUDO_PASSWORD | sudo -S service stop mongod && echo "MongoDB stoped sucessfully") || (echo "Error stoping test MongoDB" && exit 1)

# run the aplication in deployment env
NODE_ENV=deployment
(ng serve &) || (echo "Failed run aplication" && exit 1)

echo "Deploy script finished execution successfully"

exit
