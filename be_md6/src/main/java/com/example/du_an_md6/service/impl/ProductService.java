package com.example.du_an_md6.service.impl;

import com.example.du_an_md6.mapper.ProductMapper;
import com.example.du_an_md6.model.Product;
import com.example.du_an_md6.model.dto.ProductDTO;
import com.example.du_an_md6.repository.IProductRepository;
import com.example.du_an_md6.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private ProductMapper productMapper;


    @Override
    public List<ProductDTO> findAll() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(product -> productMapper.toDto(product))
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO findById(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            return productMapper.toDto(product);
        }
        return null;
    }

    @Override
    public void save(ProductDTO productDTO) {
        Product product = productMapper.toEntity(productDTO);
        productRepository.save(product);
    }

    @Override
    public List<ProductDTO> findProductMerchant(Long id_merchant) {
        return productMapper.toListDto(productRepository.findProductMerchant(id_merchant));
    }
}