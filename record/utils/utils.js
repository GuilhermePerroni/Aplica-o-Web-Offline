// funçao que atualiza status no index

function updateStatus(status){
    document.getElementById('status').innerHTML = status;
}

// 3. Funções de tratamento e status.

// Tratando erros

errorHandler = function(transaction, error){
    updateStatus("Erro: " + error.message);
    return true;
}

nullDataHandler = function(transaction, results){
}


