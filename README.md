# Projeto RobDroneGo
Projeto Integrador LAPR5 ISEP - 3DB - G8 2023/24

## Development

We use `node` version `18.18.0`

```
nvm install 18.18.0
```

```
nvm use 18.18.0
```

The first time, you will need to run

```
npm install
```

Then just start the server with

```
npm run start
```
It uses nodemon for livereloading :peace-fingers:

# API Modulo de Gestão de Informação

## Buildings

- **URL:** `/buildings`
- **Methods:** GET, POST, PATCH

### GET
List all buildings

### POST
Create a new building

Every parameter is required
#### Request Body Example:
```json
{
  "code" : "A",
  "designation" : "A",
  "description" : "Building A",
  "length" : 50,
  "width" : 50,
  "height" : 50
}

```

### PATCH
Update an already existing building

*code* is required
#### Request Body Example
```json
{
  "code" : "A",
  "description" : "Edificio A"
}
```

## Elevators

- **URL:** `/elevators`
- **Methods:** GET, POST, PATCH, PUT

### GET
List all elevators from a building

*buildingDesignation* is required in the query string in the URL
#### Request URL example
````
 ... /elevators?buildingDesignation=A
````

### POST
Create a new elevaton in a building

*designation*, *buildingDesignation* and *floorsServed* are required

*brand*, *modelE*, *serialNumber* and *description* are optional

#### Request Body Example
````json
{
  "designation" : "elevA1",
  "buildingDesignation" : "A",
  "floorsServed" : [1,2,3],
  "brand" : "isepELEV",
  "modelE" : "frogELEV",
  "serialNumber" : "2324-29OUT23",
  "description" : "Elevator Building A"
}
````

### PATCH
Update an already existing elevator

Must have the *id* parameter in the body request
All other parameters are optional

#### Request Body Example
````json
{
  "id" : "4d7aed79-c83a-4f6b-ac74-59214e9d3db2",
  "designation" : "elevA1",
  "buildingDesignation" : "A",
  "floorsServed" : [1,2,3],
  "brand" : "isepELEV",
  "modelE" : "frogELEV",
  "serialNumber" : "2324-29OUT23",
  "description" : "Elevator Building A"
}
````

### PUT
Update all of an already existing elevator, or create a new one if does not exist

All parameters are required
#### Request Body Example
````json
{
  "id" : "4d7aed79-c83a-4f6b-ac74-59214e9d3db2",
  "designation" : "elevA1",
  "buildingDesignation" : "A",
  "floorsServed" : [1,2,3],
  "brand" : "isepELEV",
  "modelE" : "frogELEV",
  "serialNumber" : "2324-29OUT23",
  "description" : "Elevator Building A"
}
````

## Floors

- **URL:** `/floors`
- **Methods:** GET, POST, PUT, PATCH

### GET
#### get floors of a building
  *buildingDesignation* required

##### Request URL example
````
 ... /floors/building?buildingDesignation=A
````
#### get buildings with min and max floors
  *max* required
  *min* required

##### Request URL example
````
 ... /floors/building/max/min?max=4&min=3
````

#### get floors of a building with pathways to other buildings
  *buildingDesignation* is required in the string query

##### Request URL example
````
 ... /floors/with-pathways?buildingDesignation=A
````

### POST
Create a new floor in a building

*floorNr*, *building*, and *description* are required

*building* is the building's designation
*floorMap* is optional
#### Request Body Example
````json
{
  "floorNr": 1,
  "building": "A",
  "description" : "Classrooms' Floor"
}
````

### PUT
Update an existing floor or create a new one if it does not exist

*domainId*, *floorNr*, and *description* are required
#### Request Body Example
````json
{
  "domainId": "5ece65e3-567b-4717-a7c4-7bca6011f654",
  "floorNr": 1,
  "description" : "Classrooms' Floor"
}
````

### PATCH
Upload a floorMap of a floor

*floorNr*, *building* and *floorMap* are required
*building* is building id
#### Request Body Example
````json
{
  "building": "A",
  "floorNr": 1,
  "floorMap" : {
    "..." : "..."
  }
}
````

## Rooms

- **URL:** `/rooms`
- **Methods:** POST

### POST
Create a new room

All parameters are required

*building* parameter must be the building's code
#### Request Body Example
````json
{
  "name" : "A101",
  "description" : "Classroom A101",
  "category" : "classroom",
  "floor" : 1,
  "building" : "A"
}
````

## Pathways

- **URL:** `/pathways`
- **Methods:** GET, POST, PUT, PATCH

### GET
Gets all pathways between two buildings

*buildingSource* and *buildingDestination* are required parameters of the query string of the URL
These are the domain ID of the buildings
#### Request URL example
````
 ... /pathways?buildingSource=ac214d2f-b722-4546-a7f1-971023a5ddf8&buildingDestination=ee1a010a-141f-4e94-ac2c-99138bac5514
````

### POST
Create a new pathway between two buildings

All parameters are required
#### Request Body Example
````json
{
  "buildingSource" : "ac214d2f-b722-4546-a7f1-971023a5ddf8",
  "buildingDestination" : "ee1a010a-141f-4e94-ac2c-99138bac5514",
  "floorSource" : "0bbfd8f2-c474-42df-bf23-f6008c177f13",
  "floorDestination" : "be8aaa66-2399-4662-acea-1cc49e72288c",
  "description" : "Pathway from A1 to B1"
}
````

### PUT
Update an existing pathway, or create a new one if it does not exist

All parameters are required
#### Request Body Example
````json
{
  "domainId" : "c32055e7-4943-450c-aa59-4c7a118f9550",
  "buildingSource" : "ac214d2f-b722-4546-a7f1-971023a5ddf8",
  "buildingDestination" : "ee1a010a-141f-4e94-ac2c-99138bac5514",
  "floorSource" : "0bbfd8f2-c474-42df-bf23-f6008c177f13",
  "floorDestination" : "be8aaa66-2399-4662-acea-1cc49e72288c",
  "description" : "Pathway from A1 to B1"
}
````

### PATCH
Update an already existing pathway

The *domainId* is required on the query string of the URL
#### Request URL Example
````
 ... /pathways?domainId=c32055e7-4943-450c-aa59-4c7a118f9550
````

#### Request Body Example
````json
{
  "description" : "Passagem do A1 para o B1"
}
````


## Robots

- **URL:** `/robots`
- **Methods:** GET, POST, PATCH

### GET
Get all robots

### POST
Create a new robot

#### Request Body Example
````json
{
  "nickName": "RobotA",
  "robotCode": "picker-0001",
  "serialNr": "1234567",
  "description": "Robot A",
  "robotType": "RobotTypeA"
}
````

### PATCH
Update an already existing robot

#### disable by nickname
It should have the URL `... /robots/disable-by-nick`

##### Request Body Example
````json
{
  "nickname" : "RobotA"
}
````

#### disable by code
It should have the URL `... /robots/disable-by-code`

##### Request Body Example
````json
{
  "robotCode" : "picker-0001"
}
````

## Robot Type

- **URL:** `/robotTypes`
- **Methods:** POST

### POST
Create a new Robot Type

All parameters are required
#### Request Body Example
````json
{
  "name" : "RobotTypeA",
  "taskTypes" : ["surveillance", "delivery"],
  "robotTypeModel" : "Model1",
  "brand" : "isepROBOTS"
}
````
