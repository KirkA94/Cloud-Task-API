package com.kirkaustin.cloudtaskapi.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import jakarta.validation.constraints.NotBlank;



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
    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    // Optional longer text
    @NotBlank(message = "Description is required")
    @Column(nullable = false)
    private String description;

    // Defaults to false if not set
    @Column(nullable = false)
    private boolean completed;

    // When the task was created
    private LocalDateTime createdAt;

    // Automatically set createdAt before saving to the database
    @PrePersist
protected void onCreate() {
    createdAt = LocalDateTime.now();
}
}