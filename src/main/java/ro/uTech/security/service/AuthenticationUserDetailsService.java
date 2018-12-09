package ro.uTech.security.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.uTech.security.model.CustomUserDetails;
import ro.uTech.security.model.domain.Role;
import ro.uTech.security.model.domain.RolePermission;
import ro.uTech.security.model.domain.User;
import ro.uTech.security.model.domain.UserRole;
import ro.uTech.security.repository.UserRepository;

import java.util.*;

@Service
@Transactional(readOnly = true)
public class AuthenticationUserDetailsService implements UserDetailsService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public AuthenticationUserDetailsService() {
        super();
    }


    @Autowired
    private UserRepository userRepository;

    /**
     * Wraps a {@link Role} role to {@link SimpleGrantedAuthority} objects
     *
     * @param role {@link String} of roles
     * @return list of granted authorities
     */
    public static Set<SimpleGrantedAuthority> getGrantedAuthorities(Role role) {

        Set<SimpleGrantedAuthority> authorities = new HashSet<>();

        Set<RolePermission> rolePermissions = new HashSet<>(role.getRolePermissions());
        for (RolePermission rolePermission : rolePermissions) {
            authorities.add(new SimpleGrantedAuthority(rolePermission.getPermission().getName()));
        }

        return authorities;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        logger.trace("Begging to load user by username [" + username + "]");
        try {
            User user = userRepository.findByUsername(username);

            if (user == null) {
                throw new UsernameNotFoundException(username);
            }

            boolean enabled = true;
            boolean accountNonExpired = true;
            boolean credentialsNonExpired = true;
            boolean accountNonLocked = true;

            // adapt as needed
            logger.trace("Finished loading user by username [" + username + "]");

            return new CustomUserDetails(user.getUsername(),
                    user.getEncryptedPassword(), user.getEmail(), enabled, accountNonExpired,
                    credentialsNonExpired, accountNonLocked,
                    getAuthorities(user.getUserRoles()));

        } catch (Exception e) {
            logger.trace("Failed to load user by username [" + username + "]");
            throw new RuntimeException(e);
        }
    }

    /**
     * Retrieves a collection of {@link GrantedAuthority} based on a list of
     * roles
     *
     * @param userRoles the assigned roles of the user
     * @return a collection of {@link GrantedAuthority}
     */
    public Collection<? extends GrantedAuthority> getAuthorities(Collection<UserRole> userRoles) {

        Set<SimpleGrantedAuthority> authList = new TreeSet<>(
                new SimpleGrantedAuthorityComparator());

        for (UserRole userRole : userRoles) {
            authList.addAll(getGrantedAuthorities(userRole.getRole()));
        }

        return authList;
    }

    private static class SimpleGrantedAuthorityComparator implements
            Comparator<SimpleGrantedAuthority> {

        @Override
        public int compare(SimpleGrantedAuthority o1, SimpleGrantedAuthority o2) {
            return o1.equals(o2) ? 0 : -1;
        }
    }
}
