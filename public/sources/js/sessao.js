async function verificarSessao(causa) {

    const resposta = await fetch('/usuarios/verificar', {
        headers: {
            'token': sessionStorage.getItem('token')
        }
    });

    // ! SE A CAUSA FOR COMUM (SEM PARÂMETRO) SIGNIFICA Q O USUÁRIO SÓ NÃO ESTÁ LOGADO, CASO FOR ESPECIAL, SIGNIFICA QUE NÃO HÁ PERMISSÕES PARA ESSE USUÁRIO
    if (!resposta.ok && causa === 'redirecionar') return window.location.href = './index.html' // ? SE TEM CAUSA SIGNIFICA QUE É POR ALGUM MOTIVO QUE O USUÁRIO FOI REDIRECIONADO
    if(!resposta.ok) return false; // ? SE NÃO TEM RESPOSTA RETORNA FALSE (PARA PLOTAGEM DA HEADER, FOOTER E QUIZES)

    const cargo = await resposta.text();
    
    if(causa === 'cargo') return cargo;

    if(causa === 'especial' && cargo === 'p') return window.location.href = './index.html'
    
    return true;
}