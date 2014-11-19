//2. Query e visualização de Update

function updateForm(id, nome, idade){
    document.itemForm.id.value = id;
    document.itemForm.nome.value = nome;
    document.itemForm.idade.value = idade;
}

function queryAndUpdateOverview(tabela){
    $('#myModal').foundation('reveal', 'close');
     
	//Remove as linhas existentes para inserção das novas
    var dataRows = document.getElementById("itemData").getElementsByClassName("data");
	
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("itemData").removeChild(row);
    };
    
	//Realiza a leitura no banco e cria novas linhas na tabela.
    var query = "SELECT * FROM EXEMPLO";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
					li.setAttribute("id", row['id']);
                    li.setAttribute("class", "data");
                    li.setAttribute("onclick", "onSelect(this)");
                    
                    var liText = document.createTextNode(row['nome'] + " x "+ row['idade']);
                    li.appendChild(liText);
                    
                    document.getElementById("itemData").appendChild(li);
                }
            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }
}

function onSelect(htmlLIElement){
    $('#myModal').foundation('reveal', 'open'); 
	var id = htmlLIElement.getAttribute("id");
     query = "SELECT * FROM exemplo where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
            
                var row = results.rows.item(0);
                
                updateForm(row['id'], row['nome'], row['idade']);
                
            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }
   
}

function onInsert(){
    var nome = document.itemForm.nome.value;
    var idade = document.itemForm.idade.value;

    if (nome == "" || idade == "") {
        updateStatus("Erro: 'Nome' e 'Idade' são campos obrigatórios!");
    }
    else {
        NovoRegistro("exemplo", "nome, idade", nome+","+idade); 
        queryAndUpdateOverview("exemplo");
    }
}


function onUpdate(){

    var id = document.itemForm.id.value;
    var nome = document.itemForm.nome.value;
    var idade = document.itemForm.idade.value;

    if (nome == "" || idade == "") {
        updateStatus("'Nome' e 'Idade' são campos obrigatórios!");
    }
    else {
        AtualizaRegistro("exemplo", " nome = " + nome + ", idade = " + idade, " where id = " + id);
        queryAndUpdateOverview("exemplo");
    }
}

function onDelete(){
    var id = document.itemForm.id.value;
    
    DeletaRegistro(" exemplo ", " where id = " + id);
    queryAndUpdateOverview("exemplo");
    
}




