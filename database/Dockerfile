FROM mysql:8.0-oracle

ENV MY_SQLDATABASE App
ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_HOST database

COPY ./script.sql /docker-entrypoint-initdb.d/