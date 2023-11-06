package com.example.du_an_md6.service.impl;

import com.example.du_an_md6.model.Product;
import com.example.du_an_md6.repository.IProductRepository;
import com.example.du_an_md6.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository productRepository ;
    @Override
    public List<Product> findAll() {
        return null;
    }

    @Override
    public Product findById(Long id) {
        return null;
    }

    @Override
    public void save(Product product) {
        productRepository.save(product);
    }

    @Override
    public List<Product> findProductMerchant(Long id_merchant) {
        return productRepository.findProductMerchant(id_merchant) ;
    }
}
