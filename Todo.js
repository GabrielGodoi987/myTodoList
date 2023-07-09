//botão Submit que adiciona dados na lista 
const pushBtn = document.getElementById("pushBtn");
// input onde será escrito os dados
const textInput = document.getElementById("textInput");
//tabela, onde será inserido todos os dados
const table = document.getElementById("TodoTable");

//id que vai ser incrementado todas as vezes que criarmos um novo elemento
var i = 0;

//lista que receberá os dados
const TodoList = {
    todo: [],
};




pushBtn.addEventListener("click", (el) => {
    el.preventDefault();

    // Cria um novo objeto 'newTodo' com um id incrementado e o valor do campo de texto
    const newTodo = { id: i++, Content: textInput.value };
    TodoList.todo.push(newTodo); // Adiciona o novo objeto ao array 'todo' em 'TodoList'

    console.log(TodoList);

    //insertAdjacentHTML insere elementos html em uma parte do código, aqui especificamos a tabela, sendo a parte do corpo dela
    table.insertAdjacentHTML("beforebegin", `
    <tr>
        <td>${newTodo.id}</td>
        <td>${newTodo.Content}</td>
        <td><button id='btn-editar' onclick="update(event)" class='btn btn-success shadow' type='submit'>Editar</button></td>
        <td><button id='btn-excluir'  data-id='${newTodo.id}' onclick="Delete(event)" class='btn btn-danger shadow' type='submit'>Excluir</button></td>
    </tr>
 `);

    textInput.value = ''; // Limpa o campo de texto após adicionar o novo item
});

function update(event) {
    // Encontra o elemento 'tr'(table row) pai mais próximo a partir do elemento clicado
    var tr = event.target.closest("tr");
    var td = tr.querySelectorAll("td"); // Obtém todas as células 'td' dentro da linha
    var id = td[0].textContent; // Obtém o conteúdo da primeira célula (id)
    var content = td[1]; // Obtém a referência para a segunda célula (Content)

    var indexid = TodoList.todo.findIndex((todo) => todo.id == id); // Encontra o índice do objeto no array 'todo' com base no id

    var confirmation;
    var update;

    if (indexid != -1) {
        confirmation = confirm("Are you sure you want to update this?");

        if (confirmation == true) {
            update = prompt("Type the new content to update this Todo");
            TodoList.todo[indexid].Content = update; // Atualiza o conteúdo do objeto no array 'todo'
            content.textContent = TodoList.todo[indexid].Content; // Atualiza o conteúdo da célula 'td' no DOM
            console.log(TodoList);
        }
    }
}

function Delete(event) {
    var confirmation = confirm('Are you sure you want to delete it?');

    if (confirmation === true) {
        var tr = event.target.closest("tr"); // Encontra o elemento 'tr' pai mais próximo a partir do elemento clicado
        var td = tr.querySelectorAll("td"); // Obtém todas as células 'td' dentro da linha
        var id = td[0].textContent; // Obtém o conteúdo da primeira célula (id)

        var indexid = TodoList.todo.findIndex((todo) => todo.id == id); // Encontra o índice do objeto no array 'todo' com base no id

        if (indexid != -1) {
            var erase = TodoList.todo.splice(indexid, 1); // Remove o objeto do array 'todo'
            tr.remove(); // Remove a linha correspondente do DOM
            console.log(TodoList);
        }

        console.log(indexid);
    } else {
        alert("Okay, the element is not deleted");
    }
}



