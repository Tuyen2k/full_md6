package com.example.du_an_md6.service.impl;

import com.example.du_an_md6.model.Account;
import com.example.du_an_md6.model.AccountPrinciple;
import com.example.du_an_md6.repository.IAccountRepository;
import com.example.du_an_md6.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService implements UserDetailsService, IAccountService {
    @Autowired
    private IAccountRepository iAccountRepository;

    @Override
    public List<Account> findAll() {
        return null;
    }

    @Override
    public Account findById(Long id) {
        return null;
    }

    @Override
    public void save(Account account) {

    }

    public Account findByUsername(String name) {
        return iAccountRepository.findByName(name);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account user = findByUsername(username);
        if (user != null) {
            return AccountPrinciple.build(user);
        }
        return null;
    }
}
