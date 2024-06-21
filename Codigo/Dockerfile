# Etapa de construção
FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app

# Copia o arquivo pom.xml e as dependências do Maven
COPY pom.xml .

# Baixa as dependências sem construir o projeto
RUN mvn dependency:go-offline

# Copia o código-fonte do aplicativo
COPY src ./src

# Compila o aplicativo
RUN mvn clean install

# Etapa de execução
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/roteiro01-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
