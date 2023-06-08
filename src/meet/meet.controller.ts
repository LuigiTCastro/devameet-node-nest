import { Body, Controller, Delete, Get, Post, Put, Request } from "@nestjs/common";
import { MeetService } from "./meet.service";
import { GetMeetDto } from "./dtos/getmeet.dto";
import { CreateMeetDto } from "./dtos/createmeet.dto";

@Controller('meet')
export class MeetController {
    constructor(private readonly meetService: MeetService) { }

    @Post()
    async createMeet(@Request() req, @Body() dto: CreateMeetDto) {
        const { userId } = req?.user;
        await this.meetService.createMeet(userId, dto)
    }

    @Get()
    async getMeet(@Request() req) {
        const { userId } = req?.user; // DOUBT: Esse user funciona como se pegar o id do usuario logado?
        const result = await this.meetService.getMeetsByUser(userId);
        // return result;

        return result?.map((m) => ({
            id: m._id.toString(),
            name: m.name,
            collor: m.collor,
            link: m.link
        }) as GetMeetDto)
    }

    @Put()
    async updateMeet() {

    }

    @Delete()
    async deleteMeet() {

    }

}




/* 
return result?.map((m) => ({ 
id: m._id.toString(), 
name: m.name, 
color: m.color, 
link: m.link, 
}) as GetMeetDto); 

1) result?.map(): O operador de encadeamento opcional (?.) verifica se result é diferente de null/undefined antes de chamar o método map(). Evita erros caso result não esteja definido.
2) m: O parâmetro m representa cada elemento do array result enquanto o map() itera sobre eles.
3) =>: A sintaxe de seta (=>) é usada para definir uma função de retorno de chamada (callback).
4) ({ ... }): Os parênteses {} envolvem o objeto que está sendo criado como resultado da transformação.
5) id: m._id.toString(): A propriedade id do objeto criado recebe o valor do _id convertido para string.
6) name: m.name: A propriedade name do objeto criado recebe o valor da propriedade name do objeto m.
9) as GetMeetDto: realiza uma conversão de tipo, garantindo que o objeto criado seja do tipo GetMeetDto.
10) O map() retorna um novo array com os objetos transformados de acordo com as propriedades especificadas.

In summary, this code snippet loops through the 'result' array and creates a new array with objects that have the following properties: id, name, color, link,
The new array is the GetMeetDto type.

The map() method allows to realize a transformation on the array elements before returning it.
*/