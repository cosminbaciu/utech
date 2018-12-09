package ro.uTech.security.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import ro.uTech.security.model.domain.*;
import ro.uTech.security.model.dto.RoleSearchDTO;
import ro.uTech.security.repository.RoleRepository;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/admin/roles/api")
public class RolesAdminAPIController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private RoleRepository roleRepository;

    @RequestMapping(value = "/all",
            produces = {"application/json"}, method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")

    //TODO: again , logic that should stay in Service classes.
    public ResponseEntity<RolePageDTO> getRoles(@RequestParam Integer page) {

        RolePageDTO rolePageDTO = new RolePageDTO();
        Page<Role> rolesPage = roleRepository.findAll(new PageRequest(page, 6));
        List<RolesAdminAPIController.RoleDTO> responseList = mapRolePageToRoleDTOList(rolesPage);
        rolePageDTO.setPage(page);
        rolePageDTO.setPages(rolesPage.getTotalPages());
        rolePageDTO.setRoleDTOS(responseList);

        return new ResponseEntity<>(rolePageDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/search",
            produces = {"application/json"}, method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    public ResponseEntity<RolePageDTO> getRoles(@RequestParam Integer page, @RequestBody RoleSearchDTO roleSearchDTO) {

        RolePageDTO rolePageDTO = new RolePageDTO();
        Page<Role> rolesPage = roleRepository.findByNameContains(roleSearchDTO.getQuery(), new PageRequest(page, 6));
        List<RolesAdminAPIController.RoleDTO> responseList = mapRolePageToRoleDTOList(rolesPage);
        rolePageDTO.setPage(page);
        rolePageDTO.setPages(rolesPage.getTotalPages());
        rolePageDTO.setRoleDTOS(responseList);

        return new ResponseEntity<>(rolePageDTO, HttpStatus.OK);
    }

    private List<RoleDTO> mapRolePageToRoleDTOList(Page<Role> page) {

        List<RoleDTO> roleDTOList = new ArrayList<>();
        for (Role role : page.getContent()) {

            RoleDTO userDTO = mapRoleToRoleDTO(role);
            roleDTOList.add(userDTO);
        }

        return roleDTOList;
    }

    private RoleDTO mapRoleToRoleDTO(Role role) {

        RoleDTO roleDTO = new RoleDTO(role.getId(), role.getName());

        for (RolePermission rp : role.getRolePermissions())
            roleDTO.addPermission(rp);
        return roleDTO;
    }

    class RolePageDTO {

        private Integer page;
        private Integer pages;

        private List<RoleDTO> roleDTOS;

        public Integer getPage() {
            return page;
        }

        public void setPage(Integer page) {
            this.page = page;
        }

        public Integer getPages() {
            return pages;
        }

        public void setPages(Integer pages) {
            this.pages = pages;
        }

        public List<RoleDTO> getRoleDTOS() {
            return roleDTOS;
        }

        public void setRoleDTOS(List<RoleDTO> roleDTOS) {
            this.roleDTOS = roleDTOS;
        }
    }

    class RoleDTO {

        private Long id;
        private String name;

        private List<PermissionDTO> permissions = new ArrayList<>();

        public RoleDTO(Long id, String name) {

            this.id = id;
            this.name = name;
        }

        public Long getId() {

            return id;
        }

        public String getName() {

            return name;
        }

        public void addPermission(RolePermission rolePermission) {

            Permission permission = rolePermission.getPermission();
            PermissionDTO pdto = new PermissionDTO(permission.getId(), permission.getName());
            permissions.add(pdto);
        }

        public List<PermissionDTO> getPermissions() {

            return permissions;
        }
    }

    class PermissionDTO {

        private Long id;
        private String name;

        public PermissionDTO(Long id, String name) {

            this.id = id;
            this.name = name;
        }

        public Long getId() {

            return id;
        }

        public String getName() {

            return name;
        }
    }
}
