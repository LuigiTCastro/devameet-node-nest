## NEST.JS - INTRODUCING
Its a framework from NODE.JS (?)
His purpose is to create backends applications from server size (efficients, reliables scalables).
Builded above of NODE and uses TYPESCRIPT as principal language.
Has elements from Objected Oriented Programming, Functional Programming, Reactive Programming.
MODULE approach

Resources:
_Injeção de dependência, controle de rotas, validação de entrada, autenticação, autorização_
_Integração com outros frameworks e bibliotecas populares, como o Express.js_
_Suporte nativo para a construção de APIs RESTful e aplicativos em tempo real._

Command to install on terminal:
    <npm i -g @nestjs/cli> <!-- -g : means that the package will be installed globalment | cli : command line interface -->

Command to create new projects:
    <nest new nome-do-projeto>

Command to start a project in development mode:
    <npm run start:dev>


> PACKAGE.JSON
Contém informações sobre as dependências do projeto, scripts para execução de tarefas específicas, metadados do projeto e outras configurações relacionadas ao ambiente de desenvolvimento. Também inclui informações sobre a versão do projeto, autor, licença, scripts de teste, entre outros metadados relevantes.
_Ponto de entrada de qualquer projeto NODE._ Define como o projeto vai funcionar.


# TEST E2E [EndToEnd] <!-- de ponta a ponta -->
Tests if the code and the application are working


# SOURCE FOLDER [SRC]
This folder has the following files:
    _app.controller,_
    _app.module,_
    _app.service,_
    _main_
<!-- every code begins, on NEST, from the MAIN.TS -->

> [APP.CONTROLLER.SPEC.TS]
Makes the unit test of the controller.

> [APP.CONTROLLER.TS]
Creates HTTP routes through of the decorator `@Controller`.

> [APP.MODULE.TS]
No projeto Nest.js, a importação dos [controllers] e [services] é realizada no arquivo app.module.ts. Esse arquivo é responsável por configurar e definir os módulos da aplicação.
Nele encontra-se a classe  ``AppModule``, que é decorada com o decorator ``@Module``. Nessa classe que são feitas as importações dos controllers e serviços.
Isso garante que eles estão habilitados e disponíveis para uso na aplicação Nest.js.

> [APP.SERVICE.TS]
Imports the INJECTABLE decorator for his class to be injectable in any other class.
<!-- Dependency Injection -->

> [MAIN.TS]
Arquivo responsável por inicializar a aplicação na porta 3000.
Contém o código que cria uma instância do aplicativo Nest.js e inicia o servidor.
Imports the NestFactory and the AppModule.
Creates the BOOTSTRAP function (initialize)

__Bootstrap function__
Creates the NEST project from the AppModule..
And goes up on the 3000 door.


# CLASS-VALIDATOR & DECORATORS
[Class-Validator]: Is a library that provides a decorators and validators cluster to facility the data validation in classes and objects. It allows to specify declaratives validation rules using decorators in class properties. These rules are automatically applied when receiving data. In short, it automatically validates incoming requests without the need to code the validation.

[Decorators]: Way to inject behavior into the class, with economy of code.
__@Module__ : module
File grouping as a microservice.
Piece of code that works autonomously. <!-- can be imported to be used in anothe code -->
__@Injectable__ : service
Dependency injection
__@InjectModel__
__@Controller__ : controller
__@Post__ : controller (@Put, @Get, @Delete)
__@HttpCode__ : controller
__@Body__ : controller
__@Schema__ : schema
__@Prop__

__@IsEmpty__
__@IsNotEmpty__
__@IsString__
__@IsEmail__
__@MinLength__
__@MaxLength__
__@Matches__
