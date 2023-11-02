package com.example.du_an_md6.model;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_product;
    @ManyToOne
    @JoinColumn(name = "id_merchant")
    private Merchant merchant;
    @NotEmpty
    @Column(unique = true)
    private String name;
    private double price;
    private double priceSale;
    private String image;
    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean isDelete;
    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;
    @ColumnDefault("0")
    private int view;
    @ColumnDefault("0")
    private int purchase;
    @Column(nullable = false)
    @ColumnDefault("true")
    private boolean status;
    private String timeMake;
}
