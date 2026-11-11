CREATE TABLE conversations (
    id int AUTO_INCREMENT PRIMARY KEY,
    title varchar(50)
);

CREATE TABLE messages (
    id int AUTO_INCREMENT PRIMARY KEY,
    conversation_id int,
    role varchar(10),
    content text,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);
