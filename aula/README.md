# Dicas Gerais

## `Deixar a table com scrool pra rolar no cell`
```
overflow: auto;
```


## Fazer um modal ocupar tela inteira css
>`HTML`
```
 <div class="modal-overlay active"> <!-- Transparente-->
        <div class="modal"> <!-- Branca-->
                Oi
        </div>
    </div>
```

>`CSS`
```
.modal-overlay {
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.7);

    position: fixed; // libera o top
    top: 0; // ocupa tela inteira

    display: flex;
    align-items: center;
    justify-content: center;

    // os abaixo fazem sumir da tela
    opacity: 0;
    visibility: hidden;
}

// quando tiver active aparece de novo
.modal-overlay.active {
    opacity: 1;
    visibility: visible 
}

.modal {
    background: #F0F2f5;
    padding: 2.4rem;
}
```
   

## Tirar um label da tela 
> Leitores de tela ainda conseguem fazer a leitura
```
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
```

## Alterar atributo step
> Em um input type="number"
```
Por padrão pula de 1 em 1 os números
    step="0.01"
```


## Quando for tratar dinheiro
`Não colocar vírgulas nem pontos, simboliza as decimais`
> Ex: 500,00 = 50000`

## Array
#### `splice()`
> Usa em array, espera a posição do array
```
splice(index, quantos elementos deletar em diante)
```

#### split()
> aplicado a string faz separaçõoes em arrays a partir do elemento informado
```
data recebido de um input -> 2021-02-11
split("-")
    resultado ["2021", "02", "11"]
```

## onsubmit
> executa funções quando enviar o form

> event.preventDefault() - Não faça o comportamento padrão, se for um form -> não envia as informações


## trim()
> Tira espaço vazio de uma string

## new Error("MSG")
> Funcionalidade que vai retornar um objeto
> Tratar com 
```
try {
    tentativa de passos 
} catch(error) { 
        se der errado algum dos passos será desperado o catch
    }
```


## localStorage JS PURO
> Armazenamento do navegador
> Ver suas propriedades
```
console.log(localStorage)
```

> setItem <br />
Dois argumentos <br />
Guarda string <br />
Chave e valor <br />
1- nome que quer identificar <br />
    ex localStorage.setItem("dev.finances-transations") <br />
2- oq vai guardar nas chaves <br />
localStorage.setItem("")



## Transformar array p/ String 
```
JSON.stringify(array)
```
## String pra array
```
JSON.parse(json)
```