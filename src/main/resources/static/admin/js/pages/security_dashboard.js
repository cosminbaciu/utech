function User(id, email, roles, allRoles) {

    var self = this;
    self.id = id;
    self.email = email;
    self.roles = ko.observableArray(roles);
    self.allRoles = ko.observableArray(allRoles);

    self.selectedGroup = ko.observable();

    self.availableGroups = ko.computed(function () {

        var all = ko.observableArray([]);

        console.log("Starting to reduce groups");
        console.log("Current roles: ", self.roles());
        console.log("All     roles: ", self.allRoles());

        self.allRoles().forEach(function (availableRole, index) {

            var found = false;
            self.roles().forEach(function (existingRole, index2) {

                if(availableRole.id === existingRole.id) {

                    found = true;
                }
            });

            if(!found) {
                console.log("Found available role: ", availableRole);
                all.push(new RoleDTO(availableRole.id, availableRole.name));
            }
        });

        return all();
    });

    self.addToGroup = function () {

        console.log("Available Groups: ", self.availableGroups())

        console.log("User selected: ", self.id);
        // get the role from e
        console.log("Role selected: ", self.selectedGroup());

        var data = {
            userId: self.id,
            roleId: self.selectedGroup().id
        };

        $.ajax({
            type: 'POST',
            url: '/api/admin/security/api/users/addRole',
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log("POST", returnedData);
                self.roles.removeAll();
                returnedData.roles.forEach(function(newRole) {
                    self.roles.push(new RoleDTO(newRole.id, newRole.name));
                });
            },
            contentType: "application/json",
            dataType: 'json'
        });
    };

    function arrayFirstIndexOf(array, predicate, predicateOwner) {
        for (var i = 0, j = array.length; i < j; i++) {
            if (predicate.call(predicateOwner, array[i])) {
                return i;
            }
        }
        return -1;
    }
};

function RoleDTO(id, name) {

    var self = this;
    self.id = id;
    self.name = name;
};

function Role(id, name) {

    var self = this;
    self.id = id;
    self.name = ko.observable(name);
    self.modifiedName = ko.observable(name);

    self.isClean = ko.computed(function () {

        return self.name() === self.modifiedName();
    });

    self.editAction = function () {

        var data = {
            id: self.id,
            name: self.modifiedName()
        };

        $.ajax({
            type: 'POST',
            url: '/api/admin/security/api/roles/edit',
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api/admin/security/api/roles/edit', returnedData);
                self.name(returnedData.name);
                self.modifiedName(returnedData.name);
            },
            contentType: 'application/json',
            dataType: 'json'
        });
    };
};

function Permission(id, name) {

    var self = this;
    self.id = id;
    self.name = ko.observable(name);
    self.modifiedName = ko.observable(name);

    self.isClean = ko.computed(function () {

        console.log(self.name() === self.modifiedName());
        return self.name() === self.modifiedName();
    });

    self.editAction = function () {

        var data = {
            id: self.id,
            name: self.modifiedName()
        };

        $.ajax({
            type: 'POST',
            url: '/api/admin/security/api/permissions/edit',
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api/admin/security/api/permissions/edit', returnedData);
                self.name(returnedData.name);
                self.modifiedName(returnedData.name);
            },
            contentType: 'application/json',
            dataType: 'json'
        });
    };
};

function MyViewModel() {

    var _this = this;
    _this.users = ko.observableArray();
    _this.roles = ko.observableArray();
    _this.roleDTOs = ko.observableArray();
    _this.permissions = ko.observableArray();

    _this.newRoleName = ko.observable();
    _this.newPermissionName = ko.observable();

    _this.submitNewRole = function () {

        var data = {
            name: _this.newRoleName()
        };

        $.ajax({
            type: 'POST',
            url: '/api/admin/security/api/roles/new',
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api/admin/security/api/roles/new', returnedData);
                _this.roles.push(new Role(returnedData.id, returnedData.name));
                _this.roleDTOs.push(new RoleDTO(returnedData.id, returnedData.name));
                _this.newRoleName('');
            },
            contentType: 'application/json',
            dataType: 'json'
        });
    };

    _this.submitNewPermission = function () {

        var data = {
            name: _this.newPermissionName()
        };

        $.ajax({
            type: 'POST',
            url: '/api/admin/security/api/permissions/new',
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api/admin/security/api/permissions/new', returnedData);
                _this.permissions.push(new Permission(returnedData.id, returnedData.name));
                _this.newPermissionName('');
            },
            contentType: 'application/json',
            dataType: 'json'
        });
    };

    _this.deletePermission = function (permission) {

        var data = {
            id: permission.id
        };

        $.ajax({
            type: 'POST',
            url: '/api/admin/security/api/permissions/delete',
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api/admin/security/api/permissions/delete', returnedData);
                _this.permissions.remove(permission);
            },
            contentType: 'application/json',
            dataType: 'json'
        });
    };

    _this.deleteRole = function (role) {

        var data = {
            id: role.id
        };

        $.ajax({
            type: 'POST',
            url: '/api/admin/security/api/roles/delete',
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api/admin/security/api/roles/delete', returnedData);
                _this.roles.remove(role);
                _this.roleDTOs.remove(new RoleDTO(role.id, role.name()));
            },
            contentType: 'application/json',
            dataType: 'json'
        });
    };

    $.getJSON("/api/admin/security/api/users", function (data) {
        console.log("Users", data);
        data.forEach(function (user, index) {

            var newUser = new User(user.id, user.email, user.groups, this.roleDTOs());
            this.users.push(newUser);

            var rolesKO = user.roles.map(function (role, index) {

                return new RoleDTO(role.id, role.name);
            });
            newUser.roles(rolesKO);
        }, _this);

    });

    $.getJSON("/api/admin/security/api/roles", function (data) {
        console.log("Roles", data);
        data.forEach(function (role) {

            this.roles.push(new Role(role.id, role.name));
            this.roleDTOs.push(new RoleDTO(role.id, role.name));
        }, _this);
    });

    $.getJSON("/api/admin/security/api/permissions", function (data) {
        console.log("Permissions", data);
        data.forEach(function (permission) {

            this.permissions.push(new Permission(permission.id, permission.name));
        }, _this);
    });
};

ko.applyBindings(new MyViewModel());