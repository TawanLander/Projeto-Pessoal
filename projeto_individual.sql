create database site;

use site;
show tables;
select count(genero) from usuario group by genero;

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
insert into usuario values (default, 'Tawan Lander', 'sim@sim.com', 'Feminino', '2007-04-02', 'SenhaFortona15#', 0, 'a');
insert into usuario values (default, 'Tawan Lander', 'teste@teste.com', 'Prefiro Não Dizer', '2007-04-02', 'SenhaFortona14#', 0, 'a');
insert into usuario values (default, 'Tawan Lander', 'email@email.com', 'Outro', '2007-04-02', 'SenhaFortona13#', 0, 'a');
delete from usuario where id = 0;
select * from usuario;

create table quiz(
id int primary key auto_increment,
nome varchar(60) not null,
tipo varchar(30) not null,
img varchar(500),
avaliacao float,
fkUsuario int,
constraint fkUsuario_quiz foreign key (fkUsuario) references usuario(id)
);

alter table quiz modify column img varchar(500);

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
nome varchar(100),
tipo TINYINT
);

insert into opcoes (id, fkPerguntas, fkQuiz, nome) values 
(1, 1, 3, 'Sim'),
(1, 2, 3, 'Não'),
(2, 1, 3, 'Se fuder'),
(3, 1, 3, 'ABC'),
(2, 2, 3, 'DEC');

select * from opcoes;
select * from quiz;

insert into quiz (nome, tipo, img) values 
('Você ama mais HunterXHunter do que a Iasmin?', 'Anime', 'https://imgs.search.brave.com/NKktO8yCXQMplrZ8vJUWMPTJHw0M2-gzLVZW1vUDEl4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwLmNicmltYWdl/cy5jb20vd29yZHBy/ZXNzL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIzLzEwL2dvbi1r/aWxsdWEtbGVvcmlv/LWFuZC1rdXJhcGlr/YS1vbi1odW50ZXIt/ZXhhbS1hcmMuanBn/P3E9NDkmZml0PWNy/b3Amdz0zNjAmaD0y/NDAmZHByPTI');

insert into perguntas (id, fkQuiz, nome, img) values 
(1, 6, 'Qual o tipo de NEN do Killua e Gon?', 'https://imgs.search.brave.com/kVThxUfQPLxf2i3cXH97v_8P4g0HjapOeJvJpR8Y3dQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuYmVlYm9tLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/My8wNi9UZW4uanBn/P3c9NjQw'),
(2, 6, 'Que tipo de vilão o Hisoka é?', 'https://imgs.search.brave.com/hODwGctnnHkfBiGsdFG2RwLuY-eXkGRMidGXRdvf3g0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwLmdhbWVyYW50/aW1hZ2VzLmNvbS93/b3JkcHJlc3Mvd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMTEv/SHVudGVyLVgtSHVu/dGVyLS0tUGhhbnRv/bS1Ucm91cGUtTWVt/YmVyLUhpc29rYS1N/YXJyb3ctSW4tSGlz/LVByaW1lLUdvaW5n/LUluLUZvci1UaGUt/S2lsbC5qcGc_cT01/MCZmaXQ9Y3JvcCZ3/PTgyNSZkcHI9MS41'),
(3, 6, 'Quais personagens vieram do continente negro?', 'https://imgs.search.brave.com/so3lMdvTf7uXS6MFzxmPutLvNFd7eaei3CCYeMku_hA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8yaW1n/Lm5ldC9oL29pNjUu/dGlueXBpYy5jb20v/ZG4weWdnLnBuZw');

insert into opcoes (id, fkQuiz, fkPerguntas, nome) values 
(1, 6, 1, 'Fortificador e Fortificador'),
(2, 6, 1, 'Especialista e Especialista'),
(3, 6, 1, 'Transmutador e Fortificador'),
(4, 6, 1, 'Manipulação e Emissão'),
(1, 6, 2, 'Monstro'),
(2, 6, 2, 'Manipulador'),
(3, 6, 2, 'Trágico'),
(4, 6, 2, 'Fanático'),
(1, 6, 3, 'Formiga Quimera, Aluka, Don Freecss'),
(2, 6, 3, 'Formiga Quimera, Gon, Brion'),
(3, 6, 3, 'As 5 calamidades, Aluka, Kurapika'),
(4, 6, 3, 'As 5 calamidades, Formiga Quimera, Don Freecss');

update perguntas set img = 'https://imgs.search.brave.com/TiiX7JcIKjLqPZkE4VwWUhnlmy6YRFHjS5lEvGCe-hk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/V2ZCT0NoZ1g0UWtB/QUFBTS9nb24uZ2lm.gif'
where id = 3 and fkQuiz = 6;