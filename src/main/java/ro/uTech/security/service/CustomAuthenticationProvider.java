package ro.uTech.security.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class CustomAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {

    private static final Logger log = LoggerFactory.getLogger(CustomAuthenticationProvider.class);
    private final Map<String, String> usersAndPasswords = new HashMap<>();

    private PasswordEncoder passwordEncoder;
    private AuthenticationUserDetailsService userDetailsService;

    @PostConstruct
    public void initUsers() {
        // this will add a user and encode its password to md5
        // Spring StandardPasswordEncoder will add salt by default
        usersAndPasswords.put("user", passwordEncoder.encode("user"));
        usersAndPasswords.put("admin", passwordEncoder.encode("admin"));
    }

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
        // Do nothing
    }

    @Override
    protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {

        log.debug("Authentication = {}", authentication);

        if (!usersAndPasswords.containsKey(username)) {
            throw new UsernameNotFoundException("User name not found : " + username);
        }

        String password = authentication.getCredentials().toString();
        String encodedPassword = usersAndPasswords.get(username);
        if (!passwordEncoder.matches(password, encodedPassword)) {
            throw new BadCredentialsException("Wrong password");
        }
        return new User(username, password, createAuthorities("role1", "role2"));
    }

    private Collection<? extends GrantedAuthority> createAuthorities(String... roles) {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        for (String role : roles) {
            authorities.add(new SimpleGrantedAuthority(role));
        }
        return authorities;
    }

    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public void setUserDetailsService(AuthenticationUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }
}
