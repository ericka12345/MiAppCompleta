CREATE DATABASE db_links;

use db_links;

CREATE  TABLE users(
    id INT (11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users 
ADD primary key (id);

ALTER  TABLE  users
MODIFY id int (11) not null auto_increment, auto_increment =2;

describe users;

--tabla de enlaces
CREATE TABLE LINKS (
id int(11) NOT  NULL,
title varchar (150) not null,
url varchar (255) not null,
description TEXT ,
user_id int (11),
created_at timestamp not null DEFAULT  CURRENT_TIMESTAMP,
constraint fk_user FOREIGN KEY  (user_id) REFERENCES users(id)
);

alter TABLE LINKS ADD primary key(id);

alter TABLE LINKS modify id int(11) not null auto_increment, auto_increment =2;

describe LINKS;