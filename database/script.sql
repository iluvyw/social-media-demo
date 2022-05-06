create database App;

use App;

create table Users(
	id int auto_increment,
    username char(50) unique not null,
    password char(200) not null,
    avatar char(100),
    name nchar(50),
    description nchar(50),
    primary key (id)
);

create table Posts(
	id int auto_increment,
    userId int not null,
    username char(50),
    image char(100),
    body mediumtext,
    createAt datetime,
    primary key (id)
);

create table Comments(
	id int auto_increment,
    postId int,
    userId int,
    body tinytext,
    createAt datetime,
    primary key (id)
);

create table Follows(
	followerId int,
    userId int,
    primary key (followerId,userId)
);

alter table Posts
	add constraint fk_posts_users foreign key (userId) references Users(id),
    add constraint fk_posts_users_2 foreign key (username) references Users(username);
;
    
alter table Comments
	add constraint fk_comments_users foreign key (userId) references Users(id),
    add constraint fk_comments_posts foreign key (postId) references Posts(id);
    
alter table Follows
	add constraint fk_follows_follower foreign key (followerId) references Users(id),
    add constraint fk_follows_user foreign key (userId) references Users(id);

