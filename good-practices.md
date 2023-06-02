## SOLID

## DEPENDENCY INJECTION

## DDD

## DESIGN PATTERN


> Folders
All authentication files in the [AUTH] folder.
All validation files in the [HELPERS] folder.
[DTOS]. <!-- dto: Data Transfer Object - similar datas to entities from the database, but that will not be sent, just transmitted -->

> Files name
Default way of naming files:

'business rule' . 'specification' . 'extension'     ->      ex.: <app.controller.ts>

<!-- design pattern specification: which is the responsibility of that file -->



# SERVICE
Its where all business rule are.

# CONTROLLER
Its where all http routes are. (in adittion invoke the Service)
Controllers are responsibles for handling the HTTP request and returnin the appropriate responses.

# MODULE
Invokes the Service and Controller.


# GOOD PRACTICES STRUCTURE
> SRC

    > AUTH
        > DTOS
        > HELPERS
        _Auth.Service
        _Auth.Controller
        _Auth.Module

    > USER
        > DTOS
        > HELPERS
        > SCHEMA
    
    _App.Module
    _Main



