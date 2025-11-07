# ----- GIAI ĐOẠN 1: Build -----
FROM maven:3.8.5-openjdk-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn package -Dmaven.test.skip=true

# ----- GIAI ĐOẠN 2: Run -----
FROM eclipse-temurin:17-jre-focal
WORKDIR /app
# !!! THAY ĐỔI TÊN FILE .JAR NÀY !!!
COPY --from=builder /app/target/chat-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]