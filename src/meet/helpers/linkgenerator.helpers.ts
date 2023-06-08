const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
const size = 12;

export const generateLink = () => {
    let randomString = '';

    for (var i = 0; i < size; i++) {

        if (i == 3 || i == 8) {
            randomString += '-'
        }

        else {
            var rnum = Math.floor(Math.random() * chars.length);
            randomString += chars.substring(rnum, rnum + 1)
        }
    }

    return randomString;
}


// Math.random(): A função Math.random() retorna um número decimal aleatório entre 0 (inclusive) e 1 (exclusivo).
// Math.floor(): A função Math.floor() arredonda para baixo o número decimal retornado por Math.random(), resultando em um número inteiro.
// Math.random() * chars.length: Multiplicar o número aleatório pela quantidade de caracteres disponíveis em chars resulta em um número aleatório dentro do intervalo de 0 a chars.length - 1.
// rnum: O resultado é armazenado na variável rnum, que representa um índice aleatório dentro da string chars.
// chars.substring(rnum, rnum + 1): A função substring() é usada para extrair uma substring de chars começando no índice rnum e com um comprimento de 1 caractere. Isso significa que estamos pegando um caractere aleatório de chars com base no índice gerado em rnum.
// randomString += chars.substring(rnum, rnum + 1): O caractere aleatório é concatenado à variável randomString, que vai acumulando os caracteres gerados aleatoriamente.