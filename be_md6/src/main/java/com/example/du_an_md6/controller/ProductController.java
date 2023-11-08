package com.example.du_an_md6.controller;

import com.example.du_an_md6.model.Product;
import com.example.du_an_md6.model.dto.ProductDTO;
import com.example.du_an_md6.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private IProductService productService;

    @GetMapping("{id_merchant}")
    public ResponseEntity<List<Product>> findProductMerchant(@PathVariable Long id_merchant) {
        return new ResponseEntity<>(productService.findProductMerchant(id_merchant), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> findAllProduct() {
        List<ProductDTO> productList = productService.findAll();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/merchant/{id_product}")
    public ResponseEntity<ProductDTO> findById(@PathVariable Long id_product) {
        return ResponseEntity.ok(productService.findById(id_product));
    }

    @PostMapping()
    public ResponseEntity<String> save(@RequestBody ProductDTO product) {
        productService.save(product);
        return ResponseEntity.ok("Create success!!!");
    }

}
