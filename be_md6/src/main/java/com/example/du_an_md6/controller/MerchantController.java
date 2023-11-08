package com.example.du_an_md6.controller;
import com.example.du_an_md6.mapper.MerchantMapper;
import com.example.du_an_md6.model.Address;
import com.example.du_an_md6.model.Merchant;
import com.example.du_an_md6.model.dto.MerchantDTO;
import com.example.du_an_md6.service.IMerchantService;
import com.example.du_an_md6.service.impl.AddressServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/merchants")
public class MerchantController {

    @Autowired
    IMerchantService merchantService;
    @Autowired
    MerchantMapper merchantMapper;
    @Autowired
    AddressServiceImpl addressService;
    @GetMapping
    public ResponseEntity<List<MerchantDTO>> findAll(){
        List<MerchantDTO> merchantDTOS = merchantMapper.toListDto(merchantService.findAll());
        return new ResponseEntity<>(merchantDTOS, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<MerchantDTO> findOne(@PathVariable Long id){
        Merchant merchant = merchantService.findById(id);
        if (merchant != null){
            return new ResponseEntity<>(merchantMapper.toDto(merchant) ,HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody Merchant merchant){
        addressService.save(merchant.getAddressShop());
            Address address = addressService.findAddressU(merchant.getAddressShop().
                        getCity().getId_city(),
                merchant.getAddressShop().getDistrict().getId_district(),
                merchant.getAddressShop().getWard().getId_ward(),
                merchant.getAddressShop().getAddress_detail());
        merchant.setAddressShop(address);
        merchantService.save(merchant);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
