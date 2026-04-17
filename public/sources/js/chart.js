function plotarDadosGeneros(array){
    const quantidade = [];

    for(let i = 0; i < array.length; ++i){
        quantidade.push(array[i]);
    };

    // CHART DE MÉDIA DE GÊNEROS NO SITE
    
    var chartQuizes = new Chart(document.getElementById('chart-generos').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Masculino', 'Feminino', 'Não Identificado', 'Outros'],
            datasets: [{
                borderColor: ['navy', 'lightpink', 'gray', 'black'],
                backgroundColor: ['navy', 'lightpink', 'gray', 'black'],
                data: quantidade
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    display: false
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Distribuição de Gênero',
                    align: 'center',
                    position: 'top',
                    font: {size: 24, weight: 'bold'},
                    padding: {top: 40, bottom: 10},
                    color: '#1c1c1c'
                }
            }
        }
    
    });
}

function plotarDadosIdade(array){
    const quantidade = [];

    for(let i = 0; i < array.length; ++i){
        quantidade.push(array[i]);
    };

    // CHART DE QUANTIDADE DE IDADES NO SITE

    var chartIdades = new Chart(document.getElementById('chart-idade').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-79', '80+'],
            datasets: [{
                backgroundColor: ['lightblue', '#1c1c1c'],
                data: quantidade
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    display: false
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Faixa Etária',
                    align: 'center',
                    position: 'top',
                    font: {size: 24, weight: 'bold'},
                    padding: {top: 40, bottom: 10},
                    color: '#1c1c1c'
                }
            }
        }
    });
}



function plotarDadosMedia(array){
    const quantidade = [];

    for(let i = 0; i < array.length; ++i){
        quantidade.push(array[i]);
    };

    // CHART DE MÉDIA DE QUIZES FEITOS POR USUÁRIO

    var chartMediaQuizes = new Chart(document.getElementById('chart-mediaQuizes').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['1-10', '11-20', '21-30', '31-40', '41+'],
            datasets: [{
                backgroundColor: ['rgb(0, 0, 71)', 'rgb(0, 72, 94)'],
                data: quantidade
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    display: false
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Quizes Feitos por Usuário',
                    align: 'center',
                    position: 'top',
                    font: {size: 24, weight: 'bold'},
                    padding: {top: 40, bottom: 10},
                    color: '#1c1c1c'
                }
            }
        }
    });
}

plotarDadosIdade([10, 10, 0, 10, 20, 40, 50, 50]); // Máx 8
plotarDadosMedia([10, 10, 10, 20, 30]); // Máx 5

fetch('/quiz').then(function(response){
    return response.json;
}).then(function(array){
    plotarDadosGeneros(array);
}).catch(function(error){
    console.log(error);
});