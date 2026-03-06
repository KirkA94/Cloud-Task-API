package com.kirkaustin.cloudtaskapi.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;



//entity tells jpa "this class becomes a database table"
@Entity
//sets table name explicitly (clean & predictable)
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    // PRIMARY KEY (required by JPA)
    @Id
    //creates a generated id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Task title should not be null in the database
    @Column(nullable = false)
    private String title;

    // Optional longer text
    @Column(columnDefinition = "TEXT")
    private String description;

    // Defaults to false if not set
    @Column(nullable = false)
    private boolean completed;

    // When the task was created
    private LocalDateTime createdAt;
}