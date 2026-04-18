function salvarDados(p) {
    fetch('/quizes').then(response => {
        if (response.ok) {
            response.json().then(r => {
                r.reverse();
                sessionStorage.setItem(`quiz`, p)
            })
        } else {
            console.error('Erro na coleta de dados SALVARQUIZ.JS')
        }
    });
}