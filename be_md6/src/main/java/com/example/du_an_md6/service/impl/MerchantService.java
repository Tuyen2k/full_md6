package com.example.du_an_md6.service.impl;

import com.example.du_an_md6.model.Merchant;
import com.example.du_an_md6.repository.IMerchantRepository;
import com.example.du_an_md6.service.IMerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class MerchantService implements IMerchantService {
    @Autowired
    IMerchantRepository merchantRepository;
    @Override
    public List<Merchant> findAll() {
        return merchantRepository.findAll();
    }

    @Override
    public Merchant findById(Long id) {
        if (merchantRepository.findById(id).isPresent()){
            return merchantRepository.findById(id).get();
        } else {
            return null;
        }
    }

    @Override
    public void save(Merchant merchant) {
        merchantRepository.save(merchant);
    }

}
