#!/bin/bash

# config properties
BACKEND_FOLDER="./"
NG_FOLDER="./angular-app"
GESTAO_TAREFAS_FOLDER="./modulo_gestao_tarefas/GestaoTarefas"
PLANEAMENTO_FOLDER="./modulo_planeamento"
DB_TEST_MONGO=test
BACKEND_PORT=4000
FRONTEND_PORT=4200
PLANEAMENTO_PORT=5000
GESTAO_TAREFAS_PORT=6000
MIGRATIONS_FILE="Migrations.tar"

# users info
CAMPUS_MANAGER_INFO='{
  "domainId": "0053887e-90a6-44e8-90e2-83b73c53b760",
  "firstName": "Campus",
  "lastName": "Manager",
  "email": "campusmanager@isep.ipp.pt",
  "phoneNumber": "912345678",
  "password": "$argon2i$v=19$m=4096,t=3,p=1$2mE4wTc69f246Va/1SQRlghT5FOK8ZpZC5Zhb8cDFEw$h7EFbL3MRK6p1eCt7q7zwjdyLHe0kRkFp9aYioICC8g",
  "role": "fafccb7c-a116-44d2-8293-7dcac6c613da"
}
'

TASK_MANAGER_INFO='{
  "domainId": "0053887e-90a6-44e8-90e2-83b73c53b762",
  "firstName": "Task",
  "lastName": "Manager",
  "email": "taskmanager@isep.ipp.pt",
  "phoneNumber": "912345678",
  "password": "$argon2i$v=19$m=4096,t=3,p=1$smfnMRCPI3zW23nfXDFXNNL5rsl+h+Zii8pmgVphs60$UONoDflt2wzIraq/M7H2CT51bzVlz+QrLK9Cqu1BfyY",
  "role": "d36807b0-bdc3-41e8-9203-0c115d76f4be"
}
'

FLEET_MANAGER_INFO='{
  "domainId": "0053887e-90a6-44e8-90e2-83b73c53b769",
  "firstName": "Fleet",
  "lastName": "Manager",
  "email": "fleetmanager@isep.ipp.pt",
  "phoneNumber": "912345678",
  "password": "$argon2i$v=19$m=4096,t=3,p=1$2mE4wTc69f246Va/1SQRlghT5FOK8ZpZC5Zhb8cDFEw$h7EFbL3MRK6p1eCt7q7zwjdyLHe0kRkFp9aYioICC8g",
  "role": "300f8037-b14d-41dc-bd0f-df4d9d37ee82"
}
'

ADMIN_INFO='{
  "domainId": "0053887e-90a6-44e8-90e2-83b73c53b710",
  "firstName": "System",
  "lastName": "Admin",
  "email": "sysadmin@isep.ipp.pt",
  "phoneNumber": "912345678",
  "password": "$argon2i$v=19$m=4096,t=3,p=1$2mE4wTc69f246Va/1SQRlghT5FOK8ZpZC5Zhb8cDFEw$h7EFbL3MRK6p1eCt7q7zwjdyLHe0kRkFp9aYioICC8g",
  "role": "155b7468-fa3e-4625-b8cf-92db2b0e25b3"
}
'

USER_INFO='{
  "domainId": "0053887e-90a6-44e8-90e2-83b73c53b763",
  "firstName": "José",
  "lastName": "Figueiras",
  "email": "1210123@isep.ipp.pt",
  "phoneNumber": "912345678",
  "nif": "215912275",
  "password": "$argon2i$v=19$m=4096,t=3,p=1$5oNW7UPoscdyGiADRUo2q3ygpTHNCS0GIgSeXDPd15o$YAIuHS5gCJGnvnsdsapVW0fp2OKytlNYzwHIVxafLaM",
  "role": "b4143d58-2561-41d9-996e-c9eddd22adf6"
}'

ROLES='[{
  "domainId": "300f8037-b14d-41dc-bd0f-df4d9d37ee82",
  "name": "fleet manager"
},
{
  "domainId": "fafccb7c-a116-44d2-8293-7dcac6c613da",
  "name": "campus manager"
},
{
  "domainId": "d36807b0-bdc3-41e8-9203-0c115d76f4be",
  "name": "task manager"
},
{
  "domainId": "b4143d58-2561-41d9-996e-c9eddd22adf6",
  "name": "user"
},
{
  "domainId": "155b7468-fa3e-4625-b8cf-92db2b0e25b3",
  "name": "admin"
}]
'
############################################

# check if needed commans exist
# check if mongosh exist
if ! command -v mongosh > /dev/null
then
    echo "mongosh could not be found. Install it!"
    exit 1
fi

# check if fuser exist
if ! command -v fuser > /dev/null
then
    echo "fuser could not be found. Install it!"
    exit 1
fi

# check if tmux exist
if ! command -v tmux > /dev/null
then
    echo "tmux could not be found. Install it!"
    exit 1
fi

# check if mysql exist
if ! command -v mysql > /dev/null
then
    echo "mysql could not be found. Install it!"
    exit 1
fi

# check if dotnet exist
if ! command -v dotnet > /dev/null
then
    echo "dotnet could not be found. Install it!"
    exit 1
fi

# check if npm exist
if ! command -v npm > /dev/null
then
    echo "npm could not be found. Install it!"
    exit 1
fi

# check if swipl exist
if ! command -v swipl > /dev/null
then
    echo "swipl could not be found. Install it!"
    exit 1
fi

# ask if user has 'dotnet ef' installed
echo "Ensure tou have 'dotnet ef' installed, or else gestao_tarefas wont work"
echo "To install, try 'dotnet tool install --global dotnet-ef'"
echo ""
echo "If you are sure, press enter to continue"
read -r REPLY
############################################

# start the script
echo "Starting..."

# check if mongod is running
if ! pgrep -x mongod >/dev/null; then
	echo "Error: MongoDB not running! Try 'sudo mongod' or 'sudo systemctl start mongod' to start it!"
	exit 1
fi
echo "MongoDB running! Continuing..."

# clear test db mongod
( ( echo "use $DB_TEST_MONGO\n db.dropDatabase()" | mongosh ) &&
echo "Cleared mongoDB test database! Continuing..." ) || ( echo "Error clearing mongoDB test database" && exit 1 )

############################################

# check if mysql is running
if ! pgrep -x mysqld >/dev/null; then
  echo "Error: MySQL not running! Try 'sudo mysqld' or 'sudo systemctl start mysql' to start it!"
  exit 1
fi
echo "MySQL running! Continuing..."

# clear test db mysql
echo "Enter the password to MySQL root user (By Default: NO PASSWORD [Just press enter])"
echo "DROP SCHEMA db;" | mysql -u root -p
( ( echo "CREATE SCHEMA db;" | mysql -u root -p ) &&
echo "Cleared MySQL test database! Continuing..." ) || ( echo "Error clearing MySQL test database" && exit 1 )

# tar the normal migrations
( tar -c -p -f $MIGRATIONS_FILE $GESTAO_TAREFAS_FOLDER/Migrations  && echo "Compacted normal gestao_tarefas migrations. Continuing..." &&
rm -r $GESTAO_TAREFAS_FOLDER/Migrations/ && echo "Removed normal gestao_tarefas migrations. Continuing..." ) ||
( echo "Error compacting the old migrations" && exit 1 )

############################################

# kill frontend test tmux
( tmux kill-session -t frontend >/dev/null && echo "Killed frontend tmux session! Continuing..." )

# check if frontend port is being used
if fuser -n tcp $FRONTEND_PORT >/dev/null; then
	echo "Detected other frontend running! Close it!"
	echo "Close it and press enter to continue."
	read -r REPLY
else
	echo "Not detected other frontend running! Continuing...";
fi

# run frontend test
( tmux new-session -d -s frontend &&
tmux send-keys -t frontend "cd $NG_FOLDER && npm run start-test" C-m &&
echo "Created frontend tmux session! Continuing..." ) || ( echo "Error creating frontend tmux session" && exit 1 )

############################################

# kill backend test tmux
( tmux kill-session -t backend >/dev/null && echo "Killed backend tmux session! Continuing..." )

# check if backend port is being used
if fuser -n tcp $BACKEND_PORT >/dev/null; then
        echo "Detected other backend running! Close it!"
	echo "Close it and press enter to continue."
        read REPLY
else
        echo "Not detected other backend running! Continuing...";
fi

# run backend test
( tmux new -s backend -d &&
tmux send-keys -t backend "cd $BACKEND_FOLDER && npm run start:test" C-m &&
echo "Created backend tmux session! Continuing..." ) || ( echo "Error creating backend tmux session" && exit 1 )

############################################

# kill gestao_tarefas test tmux
( tmux kill-session -t gestao_tarefas >/dev/null && echo "Killed gestao_tarefas tmux session! Continuing..." )

# check if gestao_tarefas port is being used
if fuser -n tcp $GESTAO_TAREFAS_PORT >/dev/null; then
        echo "Detected other gestao_tarefas running! Close it!"
	echo "Close it and press enter to continue."
        read -r REPLY
else
        echo "Not detected other gestao_tarefas running! Continuing...";
fi

# create initial gestao_tarefas db (ef migration and ef update)
ASPNETCORE_ENVIRONMENT=Test

( tmux new -s gestao_tarefas -d
tmux send-keys -t gestao_tarefas "ASPNETCORE_ENVIRONMENT=Test" C-m &&
tmux send-keys -t gestao_tarefas "cd $GESTAO_TAREFAS_FOLDER" C-m &&
tmux send-keys -t gestao_tarefas "dotnet ef migrations add InitialCreate -- --environment Test" C-m &&
tmux send-keys -t gestao_tarefas "dotnet ef database update -- --environment Test" C-m &&
# run gestao_tarefas test
tmux send-keys -t gestao_tarefas "dotnet run --launch-profile $ASPNETCORE_ENVIRONMENT" C-m &&
echo "Created gestao_tarefas tmux session! Continuing..." ) || ( echo "Error creating gestao_tarefas tmux session" && exit 1 )

############################################

# kill planeamento test tmux
( tmux kill-session -t planeamento >/dev/null && echo "Killed planeamento tmux session! Continuing..." )

# check if planeamento port is being used
if fuser -n tcp $PLANEAMENTO_PORT >/dev/null; then
        echo "Detected other planeamento running! Close it!"
	echo "Close it and press enter to continue."
        read -r REPLY
else
        echo "Not detected other planeamento running! Continuing...";
fi

# run planeamento test
( tmux new -s planeamento -d &&
tmux send-keys -t planeamento "cd $PLANEAMENTO_FOLDER && swipl env/test.pl src/server.pl" C-m &&
echo "Created planeamento tmux session! Continuing..." ) || ( echo "Error creating planeamento tmux session" && exit 1 )

############################################

# create db roles
( ( echo "use $DB_TEST_MONGO\n db.roles.insertMany( $ROLES )" | mongosh ) &&
echo "Created db roles! Continuing..." ) || ( echo "Error creating db roles" && exit 1 )


# create db users
( ( echo "use $DB_TEST_MONGO\n db.users.insertMany([ $TASK_MANAGER_INFO , $FLEET_MANAGER_INFO , $CAMPUS_MANAGER_INFO , $ADMIN_INFO , $USER_INFO ])" | mongosh ) &&
echo "Created db users! Continuing...") || ( echo "Error creating db users" && exit 1 )

############################################

echo ""
echo "Done! Check if everithing went ok, and it is ready to run e2e angular tests"
echo "To run e2e angular tests, run 'npm run e2e' in $NG_FOLDER"
echo ""
echo "To acess tmux sessions, run 'tmux a -t <session_name>', where <session_name> is one of the following:"
echo "frontend, backend, gestao_tarefas, planeamento"
echo ""
echo "To deactivate the test environment, don't forget to run the script 'end-angular-e2e-tests.sh'"
echo "It will stop all the running machines and restore the normal gestao_tarefas migrations"
echo "NOTE: Please check 'tmux a -t gestao_tarefas', it has much potencial to failure"
