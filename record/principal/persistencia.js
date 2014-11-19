//2. Query e visualização de Update

function NovoRegistro(tabela, campos, valores){
    //var query = "insert into exemplo (nome, idade) VALUES ('gui', 12);";

    var query = "Insert Into " + tabela + "(" + campos + " ) VALUES ( " + valores + " )";

    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Erro: Inserção não realizada");
                }
                else {
                    updateForm("", "", "");
                    updateStatus("Inserção realizada, linha id: " + results.insertId);
                }
            }, errorHandler);
        });
    } 
    catch (e) {
        updateStatus("Erro: Inserção não realizado " + e + ".");
    }
}

function AtualizaRegistro(tabela, campovalor, condicao){
    var query = "Update " + tabela + " Set " + campovalor + condicao ;
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Erro: Atualiação não realizada.");
                }
                else {
                    updateForm("", "", "");
                    updateStatus("Atualização realizada:" + results.rowsAffected);
                }
            }, errorHandler);
        });
    } 
    catch (e) {
        updateStatus("Erro: Atualização não realizado " + e + ".");
    }
}

function DeletaRegistro(tabela, condicao){
    var id = document.itemForm.id.value;
    
    var query = "Delete From " + tabela + condicao;
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Erro: Delete não realizado.");
                }
                else {
                    updateForm("", "", "");
                    updateStatus("Linhas deletadas:" + results.rowsAffected);
                }
            }, errorHandler);
        });
    } 
    catch (e) {
        updateStatus("Erro: DELETE não realizado " + e + ".");
    }
    
}


