package ro.uTech;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import ro.uTech.security.service.AuthenticationUserDetailsService;

/**
 * Created by an on 2016-07-18.
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationUserDetailsService authenticationUserDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().headers().frameOptions().disable()
                .and()
                .authorizeRequests()
                .antMatchers("/", "/register*//*",
                        "/fonts*/*", "/css*/*",
                        "/img*/*", "/img*/*", "/wsdl*/*","/feed*/*","/connect/facebook*", "/facebook*/*",
                        "/js*/*", "/login*", "/me/guest",
                        "/items/delete*/*",
                        "/signin*/**", "/signup*/**",
                        "/admin*/**", "/admin/security/api/login",
                        "/me/userRegistered", "/register/changePasswordAfterReset*/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .usernameParameter("username").passwordParameter("password")
                .successForwardUrl("/admin/security/api/login")
                .and().httpBasic().and().csrf().disable()
                .logout()
                .logoutSuccessUrl("/login?logout");
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {


        auth.userDetailsService(authenticationUserDetailsService).passwordEncoder(getPasswordEncoder());

        // auth.authenticationProvider(myAuthProvider());
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authenticationUserDetailsService).passwordEncoder(getPasswordEncoder());

        // auth.authenticationProvider(myAuthProvider());
    }

    @Bean(name = "passwordEncoder")
    public PasswordEncoder getPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

}
