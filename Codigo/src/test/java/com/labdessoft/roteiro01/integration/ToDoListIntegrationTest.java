package com.labdessoft.roteiro01.integration;

import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.entity.TaskType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ToDoListIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    private Long createTaskAndGetId() {
        String url = "/api/tasks";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        Task task = new Task("Learn Spring Boot", "Understand the basics of Spring Boot", TaskType.DATA, null, null, null, false);
        HttpEntity<Task> entity = new HttpEntity<>(task, headers);

        ResponseEntity<Task> response = restTemplate.exchange(url, HttpMethod.POST, entity, Task.class);

        assertThat(response.getStatusCodeValue()).isEqualTo(201);
        assertThat(response.getBody().getTitle()).isEqualTo("Learn Spring Boot");

        return response.getBody().getId();
    }

    @Test
    public void testCreateTask() {
        Long taskId = createTaskAndGetId();
        assertThat(taskId).isNotNull();
    }

    @Test
    public void testGetAllTasks() {
        createTaskAndGetId(); // Ensure there is at least one task
        String url = "/api/tasks";

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).contains("Learn Spring Boot");
    }

    @Test
    public void testUpdateTask() {
        Long taskId = createTaskAndGetId(); // Ensure there is a task to update
        String updateUrl = "/api/tasks/" + taskId;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        Task updatedTask = new Task("Updated Task", "Updated Description", TaskType.DATA, null, null, null, false);
        HttpEntity<Task> updateEntity = new HttpEntity<>(updatedTask, headers);

        ResponseEntity<Task> updateResponse = restTemplate.exchange(updateUrl, HttpMethod.PUT, updateEntity, Task.class);

        assertThat(updateResponse.getStatusCodeValue()).isEqualTo(200);
        assertThat(updateResponse.getBody().getTitle()).isEqualTo("Updated Task");
    }

    @Test
    public void testDeleteTask() {
        Long taskId = createTaskAndGetId(); // Ensure there is a task to delete
        String deleteUrl = "/api/tasks/" + taskId;
        ResponseEntity<Void> deleteResponse = restTemplate.exchange(deleteUrl, HttpMethod.DELETE, null, Void.class);

        assertThat(deleteResponse.getStatusCodeValue()).isEqualTo(204);
    }

    @Test
    public void testMarkTaskAsCompleted() {
        Long taskId = createTaskAndGetId(); // Ensure there is a task to mark as completed
        String completeUrl = "/api/tasks/" + taskId + "/complete";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<Void> completeEntity = new HttpEntity<>(null, headers);
        ResponseEntity<Task> completeResponse = restTemplate.exchange(completeUrl, HttpMethod.PATCH, completeEntity, Task.class);

        assertThat(completeResponse.getStatusCodeValue()).isEqualTo(200);
        assertThat(completeResponse.getBody().isCompleted()).isTrue();
    }

    @Test
    public void testViewTask() {
        Long taskId = createTaskAndGetId(); // Ensure there is a task to view
        String viewUrl = "/api/tasks/" + taskId;
        ResponseEntity<Task> viewResponse = restTemplate.getForEntity(viewUrl, Task.class);

        assertThat(viewResponse.getStatusCodeValue()).isEqualTo(200);
        assertThat(viewResponse.getBody().getTitle()).isEqualTo("Learn Spring Boot");
    }
}


