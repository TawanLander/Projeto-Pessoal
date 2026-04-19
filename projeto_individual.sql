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
img varchar(250),
avaliacao float,
fkUsuario int,
constraint fkUsuario_quiz foreign key (fkUsuario) references usuario(id)
);
alter table quiz modify column img varchar(250);

insert into quiz (nome, tipo) values 
('O Quão bem você conhece Jujutsu Kaisen', 'Perguntas e Respostas');
update quiz set img = 'https://imgs.search.brave.com/rs3IF83xfOwf66lYvTOQAC0Wx9pnvvDzJVPEbNG_bfg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RzLzQwNC9l/ZmIxOWMxNzc2NTI1/MjEuWTNKdmNDd3hO/VEF3TERFeE56TXNN/Q3d6TkRrLmpwZw'
where id = 3;

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
(1, 3, 'Você Gosta de Preto?'),
(2, 3, 'Você Gosta de Branco?'),
(3, 3, 'Você Gosta de Rosa?');

create table opcoes(
id int,
fkPerguntas int,
fkQuiz int,
constraint pkTripla_opcoes primary key (id, fkPerguntas, fkQuiz),
constraint fkPerguntas_opcoes foreign key (fkPerguntas) references perguntas(id),
constraint fkQuiz_opcoes foreign key (fkQuiz) references quiz(id),
nome varchar(45),
tipo TINYINT
);

insert into opcoes (id, fkPerguntas, fkQuiz, nome) values 
(1, 1, 3, 'Sim'),
(1, 2, 3, 'Não'),
(2, 1, 3, 'Se fuder'),
(3, 1, 3, 'ABC'),
(2, 2, 3, 'DEC');

select * from opcoes;

