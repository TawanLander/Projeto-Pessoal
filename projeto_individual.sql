create database site;

use site;
show tables;

create table usuario(
id int primary key auto_increment,
nome varchar(60) not null,
email varchar(60) not null,
genero varchar(20) not null,
dtNascimento date not null,
senha varchar(30) not null,
quizes_concluidos int,
tipo char(1) not null
);

insert into usuario values (default, 'Tawan Lander', 'tlander2007@gmail.com', 'Masculino', '2007-04-02', 'SenhaFortona12#', 0, 'a');
delete from usuario where id = 0;
select * from usuario;

create table quiz(
id int primary key auto_increment,
nome varchar(60) not null,
tipo varchar(30) not null,
img varchar(100),
avaliacao float,
fkUsuario int,
constraint fkUsuario_quiz foreign key (fkUsuario) references usuario(id)
);

insert into quiz (nome, tipo) values 
('O Quão bem você conhece Jujutsu Kaisen', 'Perguntas e Respostas');


create table quizes_completos(
dthr datetime default current_timestamp(),
fkUsuario int,
fkQuiz int,
constraint pkDupla_quizes_completos primary key (fkUsuario, fkQuiz),
constraint fkUsuario_quizes_completos foreign key (fkUsuario) references usuario(id),
constraint fkQuiz_quizes_completos foreign key (fkQuiz) references quiz(id)
);

create table perguntas(
id int,
fkQuiz int,
constraint pkDupla_perguntas primary key (id, fkQuiz),
constraint fkQuiz_perguntas foreign key (fkQuiz) references quiz(id),
nome varchar(60) not null,
img varchar(100)
);

insert into perguntas (id, fkQuiz, nome) values
(1, 1, 'Você Gosta de Preto?'),
(2, 1, 'Você Gosta de Branco?'),
(3, 1, 'Você Gosta de Rosa?');


create table opcoes(
id int,
fkPerguntas int,
constraint pkDupla_opcoes primary key (id, fkPerguntas),
constraint fkPerguntas_opcoes foreign key (fkPerguntas) references perguntas(id),
nome varchar(45),
tipo TINYINT
);

insert into opcoes (id, fkPerguntas, nome) values 
(1, 1, 'Sim'),
(1, 2, 'Não'),
(2, 1, 'Se fuder'),
(3, 1, 'ABC'),
(2, 2, 'DEC');