FROM openjdk:8
COPY target/cisampleapp-0.0.1-SNAPSHOT.jar  .
CMD  java -jar  cisampleapp-0.0.1-SNAPSHOT.jar
EXPOSE PORT 8080
