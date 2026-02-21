package com.kirkaustin.cloudtaskapi.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    //this map directly to my databases.... im learning !!!!
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // ID of Task
    private long id;

    // title of the task
    private String title;

    // what the task is
    private String description;

    // is the task completed yes or no
    private boolean completed;

    //date and time task was created
    private LocalDateTime createdAt;

}
