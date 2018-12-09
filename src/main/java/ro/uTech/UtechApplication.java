package ro.uTech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableScheduling
@EnableAsync
@EnableSwagger2
@EnableJpaRepositories(basePackages = {"ro.uTech.security.repository", "ro.uTech.youtube.repository"})
@EntityScan(basePackages = {"ro.uTech.security.model", "ro.uTech.youtube.model"})
public class UtechApplication {

    public static void main(String[] args) {

        SpringApplication.run(UtechApplication.class, args);
    }
}
