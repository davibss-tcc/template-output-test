# Teste dos Templates para Geração de Clientes Assíncronos utilizando AsyncAPI

## Repositórios dos templates
[C++ Template](https://github.com/davibss-tcc/asyncapi-cpp-template)

[Angular Template](https://github.com/davibss-tcc/asyncapi-angular-template)

## Utilizando os templates
Neste repositório já existem outputs para os respectivos templates.
Note que como este é um repositório git, o gerador de código irá alertar sobre a geração de código novo, então use a flag `--force-write`.

### Gerando código para C++
```sh
ag edscorbot-async-api.yml https://github.com/davibss-tcc/asyncapi-cpp-template -o ./output_cpp --force-write
```

### Gerando código para Angular
```sh
ag edscorbot-async-api.yml https://github.com/davibss-tcc/asyncapi-angular-template -o ./output_angular --force-write
```

### Parâmetros especiais
Em ambos os templates existe um parâmetro que pode ser passado para gerar um arquivo zip dentro da pasta de output. Para ativar esta funcionalidade basta colocar o parâmetro `zip=true` no final do comando. Desta forma:
```sh
ag edscorbot-async-api.yml https://github.com/davibss-tcc/asyncapi-cpp-template -o ./output_cpp --force-write -p zip=true
```
