package ro.uTech.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.uTech.security.model.domain.PasswordResetToken;
import ro.uTech.security.model.domain.User;
import ro.uTech.security.repository.PasswordResetTokenRepository;

import java.util.Arrays;
import java.util.Calendar;

@Service
@Transactional
public class SecurityUserServiceSupport implements SecurityUserService {

    @Autowired
    private PasswordResetTokenRepository passwordTokenRepository;
    @Autowired
    private AuthenticationUserDetailsService authenticationUserDetailsService;

    @Override
    public String validatePasswordResetToken(long id, String token) {
        final PasswordResetToken passToken = passwordTokenRepository.findByToken(token);
        if ((passToken == null) || (passToken.getUser()
                .getId() != id)) {
            return "invalidToken";
        }

        final Calendar cal = Calendar.getInstance();
        if ((passToken.getExpiryDate()
                .getTime() - cal.getTime()
                .getTime()) <= 0) {
            return "expired";
        }

        final User user = passToken.getUser();
        UserDetails userDetails = authenticationUserDetailsService.loadUserByUsername(user.getUsername());

        final Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, null, Arrays.asList(new SimpleGrantedAuthority("CHANGE_PASSWORD_PRIVILEGE")));
        SecurityContextHolder.getContext()
                .setAuthentication(auth);
        return null;
    }

}