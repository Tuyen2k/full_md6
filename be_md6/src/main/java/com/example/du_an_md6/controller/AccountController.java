package com.example.du_an_md6.controller;


import com.example.du_an_md6.jwt.service.JwtService;
import com.example.du_an_md6.model.Account;
import com.example.du_an_md6.model.Role;
import com.example.du_an_md6.service.IAccountService;
import com.example.du_an_md6.service.IRoleService;
import com.example.du_an_md6.service.impl.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class AccountController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AddressService addressService;

    @Autowired
    private IAccountService userService;

    @Autowired
    private IRoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    @GetMapping
//    public ResponseEntity<List<UserDTO>> findAll() {
//        return new ResponseEntity<>(userService.findAllDTO(), HttpStatus.OK);
//    }
//    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
//    public ResponseEntity<Object> findById(@PathVariable Long id) {
//        UserDTO user = userService.findOne(id);
//        if (user != null) {
//            return new ResponseEntity<>(user, HttpStatus.OK);
//        }
//        return new ResponseEntity<>("Not Found User", HttpStatus.NO_CONTENT);
//    }
//
//    @RequestMapping(value = "/login", method = RequestMethod.POST)
//    public ResponseEntity<?> login(@RequestBody Account user) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(user.getName(), user.getPassword()));
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        String jwt = jwtService.generateTokenLogin(authentication);
//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//        Account userInfo = userService.findByUsername(user.getName());
//        return ResponseEntity.ok(new JwtResponse(userInfo.getId_account(), jwt,
//                userInfo.getName(), userInfo.getName(), userDetails.getAuthorities(), userInfo.getAddress_delivery()));
//    }
//
//    @RequestMapping(value = "/register", method = RequestMethod.POST)
//    public ResponseEntity<String> register(@RequestBody Account user) {
//        if (user.getPassword().equals(user.getConfirm_password())){
//            user.setPassword(passwordEncoder.encode(user.getPassword()));
//            user.setConfirm_password(passwordEncoder.encode(user.getConfirm_password()));
//            Role role_user = roleService.findById(2L);
//            user.setRole(role_user);
//            addressService.save(user.getAddress_delivery());
//            user.setAddress_delivery(addressService.findLast());
//            userService.save(user);
//            return new ResponseEntity<>("Register successfully!", HttpStatus.OK);
//        }
//       else{
//            return new ResponseEntity<>("Password confirmation is incorrect!", HttpStatus.OK);
//        }
//    }



    @RequestMapping(value = "/roles", method = RequestMethod.GET)
    public ResponseEntity<List<Role>> getRoles() {
        return new ResponseEntity<>(roleService.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        userService.delete(id);
        return ResponseEntity.ok("Delete success!!!");
    }

    @PostMapping("/update")
    public ResponseEntity<String> save(@RequestBody Account account){
        userService.save(account);
        return ResponseEntity.ok("Update success!!!");
    }

    @PostMapping("/up_role/{id}")
    public ResponseEntity<Void> upRole(@RequestBody Role role,
                                       @PathVariable Long id){
        Account account = userService.findById(id);
        account.setRole(role);
        userService.save(account);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
