package com.example.du_an_md6.service;

import com.example.du_an_md6.model.Account;

public interface IAccountService extends IGenerateService<Account> {
    void delete(Long id);
}
