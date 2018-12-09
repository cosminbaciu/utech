function Role(roleDTO, allPermissions) {

    var self = this;
    self.id = roleDTO.id;
    self.name = ko.observable(roleDTO.name);
    self.permissions = ko.observableArray(roleDTO.permissions);
    self.allPermissions = ko.observableArray(allPermissions);

    self.selectedPermission = ko.observable();

    self.availablePermissions = ko.computed(function () {

        var all = ko.observableArray([]);

        console.log("Starting to reduce permissions");
        console.log("Current permissions: ", self.permissions());
        console.log("All     permissions: ", self.allPermissions());

        self.allPermissions().forEach(function (availablePermission, index) {

            var found = false;
            self.permissions().forEach(function (existingPermission, index2) {

                if(availablePermission.id === existingPermission.id) {

                    found = true;
                }
            });

            if(!found) {
                console.log("Found available permission: ", availablePermission);
                all.push(new PermissionDTO(availablePermission.id, availablePermission.name));
            }
        });

        return all();
    });

    self.addPermission = function () {

        console.log("Available Permissions: ", self.availablePermissions())

        console.log("User selected: ", self.id);
        // get the role from e
        console.log("Permission selected: ", self.selectedPermission());

        var data = {
            roleId: self.id,
            permissionId: self.selectedPermission().id
        };

        $.ajax({
            type: 'POST',
            url: '/api/admin/security/api/roles/addPermission',
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log("POST", returnedData);
                self.permissions.removeAll();
                returnedData.permissions.forEach(function(newPermission) {
                    self.permissions.push(new PermissionDTO(newPermission.id, newPermission.name));
                });
            },
            contentType: "application/json",
            dataType: 'json'
        });
    };
};

function PermissionDTO(id, name) {

    var self = this;
    self.id = id;
    self.name = name;
};

function Page(page, diaplayText, url, active) {

    var self = this;
    self.page = page;
    self.displayText = diaplayText;
    self.url = url;
    self.active = active;
}

function MyViewModel() {


    var _this = this;
    _this.roles = ko.observableArray();
    _this.permissions = ko.observableArray();
    _this.pages = ko.observableArray();
    _this.search = ko.observable(false);

    _this.changePage = function(page) {

        if(_this.search()) {

            var data = {
                query: _this.searchQuery()
            };

            $.ajax({
                type: 'POST',
                url: '/api/admin/roles/api/search?page=0',
                data: JSON.stringify(data),
                success: function (returnedData) {
                    console.log('POST /api/admin/roles/api/search?page=0', returnedData);
                    _this.pages.removeAll();
                    _this.roles.removeAll();
                    returnedData.roleDTOS.forEach(function (roleDTO, index) {

                        var newRole = new Role(roleDTO, this.permissions());
                        this.roles.push(newRole);

                        var permissionsKO = roleDTO.permissions.map(function (permission, index) {

                            return new PermissionDTO(permission.id, permission.name);
                        });
                        newRole.permissions(permissionsKO);
                    }, _this);


                    _this.pages.push(new Page(0, "First", "/api/admin/roles/api/search?page=0", false));

                    for (i = 0; i < data.pages; i++) {

                        _this.pages.push(new Page(i, i+1, "/api/admin/roles/api/search?page=" + i, data.pages == 0));
                    }

                    _this.pages.push(new Page(data.pages -1, "Last", "/api/admin/roles/api/search?page=" + (data.pages -1), false));
                },
                contentType: 'application/json',
                dataType: 'json'
            });
        } else {

            $.getJSON("/api/admin/roles/api/all?page=" + page.page, function (data) {
                console.log("Users", data);
                _this.pages.removeAll();
                _this.roles.removeAll();
                data.roleDTOS.forEach(function (roleDTO, index) {

                    var newRole = new Role(roleDTO, this.permissions());
                    _this.roles.push(newRole);

                    var permissionsKO = permissionDTO.permissions.map(function (permission, index) {

                        return new PermissionDTO(permission.id, permission.name);
                    });
                    newRole.permissions(permissionsKO);
                }, _this);


                _this.pages.push(new Page(0, "First", "/api/admin/roles/api/all?page=0", false))

                for (i = 0; i < data.pages; i++) {

                    _this.pages.push(new Page(i, i+1, "/api/admin/roles/api/all?page=" + i, data.pages == 0))
                }

                _this.pages.push(new Page(data.pages -1, "Last", "/api/admin/roles/api/all?page=" + (data.pages -1), false))
            });
        }
    };

    _this.searchQuery = ko.observable('');
    _this.searchRoles = function() {

        if(_this.searchQuery() === '') {

            _this.search(false);
            $.getJSON("/api/admin/roles/api/all?page=0", function (data) {
                console.log("Roles", data);
                _this.pages.removeAll();
                _this.roles.removeAll();
                data.roleDTOS.forEach(function (roleDTO, index) {

                    var newRole = new Role(roleDTO, this.roles());
                    _this.roles.push(newRole);

                    var permissionsKO = roleDTO.permissions.map(function (permission, index) {

                        return new PermissionDTO(permission.id, permission.name);
                    });
                    newRole.permissions(permissionsKO);
                }, _this);


                _this.pages.push(new Page(0, "First", "/api/admin/roles/api/all?page=0", false))

                for (i = 0; i < data.pages; i++) {

                    _this.pages.push(new Page(i, i+1, "/api/admin/roles/api/all?page=" + i, data.pages == 0))
                }

                _this.pages.push(new Page(data.pages - 1, "Last", "/api/admin/roles/api/all?page=" + (data.pages -1), false))
            });
        } else {

            _this.search(true);
            var data = {
                query: _this.searchQuery()
            };

            $.ajax({
                type: 'POST',
                url: '/api/admin/roles/api/search?page=0',
                data: JSON.stringify(data),
                success: function (returnedData) {
                    console.log('POST /api/admin/roles/api/search?page=0', returnedData);
                    _this.pages.removeAll();
                    _this.roles.removeAll();
                    returnedData.roleDTOS.forEach(function (roleDTO, index) {

                        var newRole = new Role(roleDTO, this.roles());
                        _this.roles.push(newRole);

                        var permissionsKO = roleDTO.permissions.map(function (permission, index) {

                            return new PermissionDTO(permission.id, permission.name);
                        });
                        newRole.permissions(permissionsKO);
                    }, _this);


                    _this.pages.push(new Page(0, "First", "/api/admin/roles/api/search?page=0", false));

                    for (i = 0; i < data.pages; i++) {

                        _this.pages.push(new Page(i, i+1, "/api/admin/roles/api/search?page=" + i, data.pages == 0));
                    }

                    _this.pages.push(new Page(data.pages -1, "Last", "/api/admin/roles/api/search?page=" + (data.pages -1), false));
                },
                contentType: 'application/json',
                dataType: 'json'
            });
        }
    };

    console.log(_this.pages());

    $.getJSON("/api/admin/security/api/permissions", function (data) {
        console.log("Roles", data);
        data.forEach(function (permission) {

            this.permissions.push(new PermissionDTO(permission.id, permission.name));
        }, _this);
    });

    $.getJSON("/api/admin/roles/api/all?page=0", function (data) {
        console.log("Roles", data);
        _this.pages.removeAll();
        _this.roles.removeAll();
        data.roleDTOS.forEach(function (roleDTO, index) {

            var newRole = new Role(roleDTO, this.permissions());
            _this.roles.push(newRole);

            var permissionsKO = roleDTO.permissions.map(function (permission, index) {

                return new PermissionDTO(permission.id, permission.name);
            });
            newRole.permissions(permissionsKO);
        }, _this);


        _this.pages.push(new Page(0, "First", "/api/admin/roles/api/all?page=0", false))

        for (i = 0; i < data.pages; i++) {

            _this.pages.push(new Page(i, i+1, "/api/admin/roles/api/all?page=" + i, data.pages == 0))
        }

        _this.pages.push(new Page(data.pages - 1, "Last", "/api/admin/roles/api/all?page=" + (data.pages -1), false))
    });
};

ko.applyBindings(new MyViewModel());