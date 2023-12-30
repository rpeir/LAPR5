#!/bin/bash

# config properties
NG_FOLDER=./angular-app
DB_TEST_MONGO="test"
DB_TEST_MYSQL="db"
BACKEND_PORT=4000
FRONTEND_PORT=4200

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


# start script

# check if needed commans exist
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



cd $NG_FOLDER &&


# check if mongod is running
if ! pgrep -x mongod >/dev/null; then
	echo "Error: MongoDB not running! Try 'sudo mongod' or 'sudo systemctl start mongod' to start it!"
	exit 1
fi
echo "MongoDB running! Continuing..."

# check if mysql is running
if ! pgrep -x mysqld >/dev/null; then
        echo "Error: MySQL not running! Try 'sudo mysqld' or 'sudo systemctl start mysql' to start it!"
        exit 1
fi
echo "MySQL running! Continuing..."

# clear test db mongod
( (echo "use $DB_TEST_MONGO\n db.dropDatabase()" | mongosh) && echo "Cleared mongoDB test database! Continuing...") || (echo "Error clearing mongoDB test database" && exit 1)

# clear test db mysql
( (echo "DROP SCHEMA $DB_TEST_MYSQL; exit;" | mysql -u root -p) && echo "Cleared MySQL test database! Continuing...") || (echo "Error clearing MySQL test database" && exit 1)

# run frontend test
(tmux kill-session -t frontend >/dev/null && echo "Killed frontend tmux session! Continuing...")

if fuser -n tcp $FRONTEND_PORT >/dev/null; then
	echo "Detected other frontend running! Close it!"
	echo "Close it and press enter to continue."
	read REPLY
else
	echo "Not detected other frontend running! Continuing...";
fi

(tmux new -s frontend -d 'npm run start-test' && echo "Created frontend tmux session! Continuing...") || (echo "Error creating frontend tmux session" && exit 1)


# run backend test
(tmux kill-session -t backend >/dev/null && echo "Killed backend tmux session! Continuing...")

if fuser -n tcp $BACKEND_PORT >/dev/null; then
        echo "Detected other frontend running! Close it!"
	echo "Close it and press enter to continue."
        read REPLY
else
        echo "Not detected other backend running! Continuing...";
fi


(tmux new -s backend -d 'cd ../ && npm run start:test' && echo "Created backend tmux session! Continuing...") || (echo "Error creating backend tmux session" && exit 1)


# create db roles
( (echo "use $DB_TEST_MONGO\n db.roles.insertMany( $ROLES )" | mongosh)\
&& echo "Created db roles! Continuing...") || (echo "Error creating db roles" && exit 1)


# create db users
( (echo "use $DB_TEST_MONGO\n db.users.insertMany([ $TASK_MANAGER_INFO , $FLEET_MANAGER_INFO , $CAMPUS_MANAGER_INFO , $ADMIN_INFO , $USER_INFO ])" | mongosh)\
&& echo "Created db users! Continuing...") || (echo "Error creating db users" && exit 1)


echo "Done! Everithing is ready to run e2e angular tests"
