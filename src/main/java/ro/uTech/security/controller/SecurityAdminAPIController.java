package ro.uTech.security.controller;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import ro.uTech.security.exception.*;
import ro.uTech.security.model.domain.*;
import ro.uTech.security.model.dto.RolePermissionDTO;
import ro.uTech.security.model.dto.UserRoleDTO;
import ro.uTech.security.model.dto.LoginDTO;
import ro.uTech.security.repository.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Created by an on 23.05.2017.
 */
@Controller
@RequestMapping("/security")
public class SecurityAdminAPIController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private RequestCache requestCache = new HttpSessionRequestCache();
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private UserRoleRepository userRoleRepository;
    @Autowired
    private RolePermissionRepository rolePermissionRepository;


    @RequestMapping(value = "/login",
            consumes = {"application/json"},
            produces = {"application/json"}, method = RequestMethod.POST)
    public ResponseEntity<LoginDTO> login(HttpServletRequest request, HttpServletResponse response, @RequestBody LoginDTO loginForm,
                                          BindingResult result) throws ServletException {
        try {
            logger.debug("Trying to authenticate based on JSON " + loginForm);


            HttpSession session = request.getSession(true);
            loginForm.setSessionId(session.getId());

            request.login(loginForm.getUsername(), loginForm.getPassword());

            SavedRequest savedRequest = requestCache.getRequest(request, response);

            if (savedRequest != null) {
                new ResponseEntity<>(loginForm, HttpStatus.OK);
            }

        } catch (ServletException authenticationFailed) {
            result.rejectValue(null, "authentication.failed");
            logger.error("Failed to authenticate based on JSON", authenticationFailed);
            return new ResponseEntity<>(loginForm, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(loginForm, HttpStatus.OK);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR') or hasRole('ROLE_CUSTOMER_VIEW')")
    public String redirect() throws ServletException {

        return "redirect:/admin/customers/dashboard";
    }

    @RequestMapping(value = "/socialLogin",
            consumes = {"application/json"},
            produces = {"application/json"}, method = RequestMethod.POST)
    public ResponseEntity<LoginDTO> loadsagin(HttpServletRequest request, HttpServletResponse response, @RequestBody LoginDTO loginForm,
                                              BindingResult result) throws ServletException {


        return new ResponseEntity<>(loginForm, HttpStatus.OK);
    }

    @RequestMapping(value = "/users",
            produces = {"application/json"}, method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    public ResponseEntity<List<UserDTO>> getUsers() {

        Page<User> page = userRepository.findAll(new PageRequest(0, 10));
        List<UserDTO> responseList = mapUserPageToUserDTOList(page);

        return new ResponseEntity<>(responseList, HttpStatus.OK);
    }

    @RequestMapping(value = "/users/addRole",
            consumes = {"application/json"},
            produces = {"application/json"}, method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    public ResponseEntity<UserDTO> addUserToGroup(@RequestBody @Valid UserRoleDTO userRoleDTO, BindingResult bindingResult) throws InexistentUserException, InexistentRoleException, UserAlreadyBelongsToGroupException {

        User user = userRepository.findOne(userRoleDTO.getUserId());
        if (user == null)
            throw new InexistentUserException(userRoleDTO.getUserId());
        Role role = roleRepository.findOne(userRoleDTO.getRoleId());
        if (user == null)
            throw new InexistentRoleException(userRoleDTO.getRoleId());
        for (UserRole userRole : user.getUserRoles()) {

            logger.debug("RoleId: " + userRole.getRole().getId() + ";GroupId; " + userRoleDTO.getRoleId());

            if (userRole.getRole() != null && userRole.getRole().getId().equals(userRoleDTO.getRoleId()))
                throw new UserAlreadyBelongsToGroupException(userRoleDTO.getUserId(), userRoleDTO.getRoleId());
        }
        // TODO move this to service
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        userRoleRepository.save(userRole);

        UserDTO responseEntity = mapUserToUserDTO(user);
        responseEntity.addRole(userRole);

        logger.debug("User " + user + " received the Role " + role);

        return new ResponseEntity<>(responseEntity, HttpStatus.OK);
    }

    @RequestMapping(value = "/roles/addPermission",
            consumes = {"application/json"},
            produces = {"application/json"}, method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    public ResponseEntity<RoleDTO> addPermissionToRole(@RequestBody @Valid RolePermissionDTO rolePermissionDTO, BindingResult bindingResult) throws InexistentRoleException, InexistentPermissionException, PermissionAlreadyBelongsToRoleException {

        Role role = roleRepository.findOne(rolePermissionDTO.getRoleId());
        if (Objects.isNull(role))
            throw new InexistentRoleException(rolePermissionDTO.getRoleId());
        Permission permission = permissionRepository.findOne(rolePermissionDTO.getPermissionId());
        if (Objects.isNull(permission))
            throw new InexistentPermissionException(rolePermissionDTO.getPermissionId());

        for (RolePermission rolePermission : role.getRolePermissions()) {

            logger.debug("PermissionId: " + rolePermission.getPermission().getId() + ";PermissionId; " + rolePermissionDTO.getPermissionId());

            if (rolePermission.getPermission() != null && rolePermission.getPermission().getId().equals(rolePermissionDTO.getPermissionId()))
                throw new PermissionAlreadyBelongsToRoleException(rolePermissionDTO.getRoleId(), rolePermissionDTO.getPermissionId());
        }

        // TODO move this to service
        RolePermission rolePermission = new RolePermission();
        rolePermission.setRole(role);
        rolePermission.setPermission(permission);
        rolePermissionRepository.save(rolePermission);

        RoleDTO responseEntity = mapRoleToRoleDTO(role);
        responseEntity.addPermission(rolePermission);

        logger.debug("Role " + role + " received the Permission " + permission);

        return new ResponseEntity<>(responseEntity, HttpStatus.OK);
    }

    @RequestMapping(value = "/roles",
            produces = {"application/json"}, method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    public ResponseEntity<List<SecurityAdminAPIController.RoleDTO>> getRoles() {

        JSONObject responseObject = new JSONObject();

        Page<Role> page = roleRepository.findAll(new PageRequest(0, 10));
        List<SecurityAdminAPIController.RoleDTO> responseList = mapRolePageToRoleDTOList(page);

        return new ResponseEntity<>(responseList, HttpStatus.OK);
    }

    @RequestMapping(value = "/roles/new",
            consumes = {"application/json"},
            produces = {"application/json"}, method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    public ResponseEntity<SecurityAdminAPIController.RoleDTO> addNewRole(@RequestBody @Valid ro.uTech.security.model.dto.RoleDTO roleDTO, BindingResult bindingResult) {

        Role role = new Role();
        role.setName(roleDTO.getName());
        roleRepository.save(role);

        SecurityAdminAPIController.RoleDTO responseEntity = mapRoleToRoleDTO(role);

        return new ResponseEntity<>(responseEntity, HttpStatus.OK);
    }

    @RequestMapping(value = "/permissions",
            produces = {"application/json"}, method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    public ResponseEntity<List<PermissionDTO>> getPermissions() {

        JSONObject responseObject = new JSONObject();

        Page<Permission> page = permissionRepository.findAll(new PageRequest(0, 10));
        List<PermissionDTO> responseList = mapPermissionPageToPermissionDTOList(page);

        return new ResponseEntity<>(responseList, HttpStatus.OK);
    }

    @RequestMapping(value = "/permissions/new",
            consumes = {"application/json"},
            produces = {"application/json"}, method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    public ResponseEntity<PermissionDTO> addNewPermission(@RequestBody @Valid PermissionDTO permissionDTO, BindingResult bindingResult) {

        Permission permission = new Permission();
        permission.setName(permissionDTO.getName());
        permissionRepository.save(permission);
        logger.debug(permission.toString());
        PermissionDTO responseEntity = mapPermissionToPermissionDTO(permission);

        logger.debug(responseEntity.toString());
        return new ResponseEntity<>(responseEntity, HttpStatus.OK);
    }

    @RequestMapping(value = "/permissions/delete",
            consumes = {"application/json"},
            produces = {"application/json"}, method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    public ResponseEntity<PermissionDTO> deletePermission(@RequestBody @Valid PermissionDTO permissionDTO, BindingResult bindingResult) {

        permissionRepository.delete(permissionDTO.getId());

        return new ResponseEntity<>(permissionDTO, HttpStatus.OK);
    }

    private List<UserDTO> mapUserPageToUserDTOList(Page<User> page) {

        List<UserDTO> userDTOList = new ArrayList<>();
        for (User u : page.getContent()) {
            UserDTO udto = new UserDTO(u.getId(), u.getEmail());

            for (UserRole ur : u.getUserRoles())
                udto.addRole(ur);
            userDTOList.add(udto);
        }

        return userDTOList;
    }

    private UserDTO mapUserToUserDTO(User user) {

        UserDTO userDTO = new UserDTO(user.getId(), user.getEmail());

        for (UserRole ur : user.getUserRoles())
            userDTO.addRole(ur);

        return userDTO;
    }

    private List<RoleDTO> mapRolePageToRoleDTOList(Page<Role> page) {

        List<RoleDTO> roleDTOList = new ArrayList<>();
        for (Role role : page.getContent()) {
            RoleDTO roleDTO = mapRoleToRoleDTO(role);
            roleDTOList.add(roleDTO);
        }

        return roleDTOList;
    }

    private RoleDTO mapRoleToRoleDTO(Role role) {

        RoleDTO roleDTO = new RoleDTO(role.getId(), role.getName());

        for (RolePermission rp : role.getRolePermissions())
            roleDTO.addPermission(rp);

        return roleDTO;
    }

    private List<PermissionDTO> mapPermissionPageToPermissionDTOList(Page<Permission> page) {

        List<PermissionDTO> permissionDTOList = new ArrayList<>();
        for (Permission permission : page.getContent()) {
            PermissionDTO permissionDTO = mapPermissionToPermissionDTO(permission);
            permissionDTOList.add(permissionDTO);
        }

        return permissionDTOList;
    }

    private PermissionDTO mapPermissionToPermissionDTO(Permission permission) {

        PermissionDTO roleDTO = new PermissionDTO(permission.getId(), permission.getName());

        return roleDTO;
    }

    //TODO: DTOs should stay where they belong, no matter the excuse. One maybe would need the same DTO in the future, but they won't find them in a Controller class.
    class UserDTO {

        private Long id;
        private String email;

        private List<RoleDTO> roles = new ArrayList<>();

        public UserDTO(Long id, String email) {

            this.id = id;
            this.email = email;
        }

        public Long getId() {

            return id;
        }

        public String getEmail() {

            return email;
        }

        public void addRole(UserRole userRole) {

            Role role = userRole.getRole();
            RoleDTO rdto = new RoleDTO(role.getId(), role.getName());
            roles.add(rdto);
        }

        public List<RoleDTO> getRoles() {

            return roles;
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
