package com.kirkaustin.cloudtaskapi.controller;

import com.kirkaustin.cloudtaskapi.model.Task;
import com.kirkaustin.cloudtaskapi.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("api/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Task> create(@Valid @RequestBody Task task) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.createTask(task));
    }

    @GetMapping
    public List<Task> getAll() {
        return service.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getOne(@PathVariable Long id) {
        return service.getTask(id);
    }

    @PutMapping("/{id}")
public Task update(@PathVariable Long id, @Valid @RequestBody Task task) {
    return service.updateTask(id, task);
}

@DeleteMapping("/{id}")
public void delete(@PathVariable Long id) {
    service.deleteTask(id);
}

}
