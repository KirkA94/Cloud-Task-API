package com.kirkaustin.cloudtaskapi.service;

import com.kirkaustin.cloudtaskapi.exception.TaskNotFoundException;
import com.kirkaustin.cloudtaskapi.model.Task;
import com.kirkaustin.cloudtaskapi.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import java.time.LocalDateTime;
import java.util.List;



@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    //create a task
    public Task createTask(Task task) {
        task.setCreatedAt(LocalDateTime.now());
        return repository.save(task);
    }


    //get all tasks
    public List<Task> getAllTasks() {
        return repository.findAll();
    }


    //get a task by id
    public Task getTask(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    //update a task
    public Task updateTask(Long id, Task updatedTask) {
        Task existing = repository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    
        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setCompleted(updatedTask.isCompleted());
    
        return repository.save(existing);
    }


    //delete a task
    public void deleteTask(Long id) {
        repository.deleteById(id);
    }

    //get tasks by completion status
    public List<Task> getTasksByCompleted(boolean completed) {
        return repository.findByCompleted(completed);
    }

    //pagination and sorting
    public Page<Task> getTasksPaginated(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
    
        Pageable pageable = PageRequest.of(page, size, sort);
        return repository.findAll(pageable);
    }
    
    //pagination, sorting, and filtering by completion status
    public Page<Task> getTasksByCompletedPaginated(boolean completed, int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
    
        Pageable pageable = PageRequest.of(page, size, sort);
        return repository.findByCompleted(completed, pageable);
    }

}