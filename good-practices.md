## GOOD PRACTICES WITH NODEJS AND NESTJS

# SOLID

# DEPENDENCY INJECTION

# DDD

# DESIGN PATTERN

# REST | RESTFUL
<!-- Padrão Arquitetural REST? And RESTful? -->


# FOLDERS N' FILES
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
        > Dtos
        > Helpers
        > Decorators
        > Guards
        > Strategies
        _Auth.Service
        _Auth.Controller
        _Auth.Module

    > USER
        > Dtos
        > Helpers
        > Schema
        _User.Service
        _User.Controller
        _User.Module
    
    _App.Module
    _Main
-----------------------------------


``Itens sequence to create a new Entity``
- schema (db)
- dto (model of services)
- helpers (validation messages)
- services: <!-- create, getById, findById, find, update, delete ... -->
- controllers: <!-- Routes: POST, GET, PUT, DELETE -->
- module: <!-- imports, controllers, providers, exports --> 
<!-- imports: are also where the tables are created in the db (the schemas are transformed into real tables -->


``Relationship between Decorators and Layers:``
[@Injectable]
class Service

[@Controller]
class Controller

[@Module]
class Module


``Relationship between the Layers:``
> Module
	> Controller
		> Service
		
[SERVICE]: business rules, dependency injections, creates the services (functions) using the models and dtos.
[CONTROLLER]: routes, http methods, creates functions using the services.
[MODULE]: imports, controller, providers, exports.

<!-- Schema/Model in this case, would be as the REPOSITORY?? -->


# CRUD [CreateReadUpdateDelete]
``POST, GET, PUT, DELETE``

_Entities_: são os modelos da aplicação que irão espelhar as tabelas do banco de dados.
_Repository_: é a camada responsável pela comunicação com o banco de dados.
_Service_: é a camada responsável pela aplicação das regras de negócio.
_Controller_: é a camada responsável pelas rotas, respostas e requisições.
<!-- fonte: https://www.treinaweb.com.br/blog/criando-o-primeiro-crud-com-nestjs -->
<!-- https://www.treinaweb.com.br/blog/rest-nao-e-simplesmente-retornar-json-indo-alem-com-apis-rest -->
