#!/bin/bash

echo "Deployment 'Modulo Master Data' script started"

cd froggers_sem5pi/ || (echo "Error entering froggers_sem5pi/" && exit 1)

# Atualiza o repositorio
git pull || (echo "Error updating repo" && exit 1)

#cd master_data/ || (echo "Error entering master_data/" && exit 1)

(cat "sapo1234" | sudo -S mongod) || (echo "Error creating test database" && exit 1)

# run in test env
NODE_ENV=test
npm run test

echo "Deploy script finished execution successfully"

exit
