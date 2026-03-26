package com.kirkaustin.cloudtaskapi.service;

import com.kirkaustin.cloudtaskapi.exception.TaskNotFoundException;
import com.kirkaustin.cloudtaskapi.model.Task;
import com.kirkaustin.cloudtaskapi.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public Task createTask(Task task) {
        task.setCreatedAt(LocalDateTime.now());
        return repository.save(task);
    }

    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    public Task getTask(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    public Task updateTask(Long id, Task updatedTask) {
        Task existing = repository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    
        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setCompleted(updatedTask.isCompleted());
    
        return repository.save(existing);
    }
    
    public void deleteTask(Long id) {
        repository.deleteById(id);
    }
}