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

function Page(page, diaplayText, url, active) {

    var self = this;
    self.page = page;
    self.displayText = diaplayText;
    self.url = url;
    self.active = active;
}

function MyViewModel() {


    var _this = this;
    _this.users = ko.observableArray();
    _this.roles = ko.observableArray();
    _this.pages = ko.observableArray();
    _this.search = ko.observable(false);

    _this.changePage = function(page) {

        if(_this.search()) {

            var data = {
                query: _this.searchQuery()
            };

            $.ajax({
                type: 'POST',
                url: '/api/admin/users/api/search?page=0',
                data: JSON.stringify(data),
                success: function (returnedData) {
                    console.log('POST /api/admin/users/api/search?page=0', returnedData);
                    _this.pages.removeAll();
                    _this.users.removeAll();
                    returnedData.userDTOS.forEach(function (userDTO, index) {

                        var newUser = new User(userDTO.id, userDTO.email, userDTO.groups, this.roles());
                        this.users.push(newUser);

                        var rolesKO = userDTO.roles.map(function (role, index) {

                            return new RoleDTO(role.id, role.name);
                        });
                        newUser.roles(rolesKO);
                    }, _this);


                    _this.pages.push(new Page(0, "First", "/api/admin/users/api/search?page=0", false));

                    for (i = 0; i < data.pages; i++) {

                        _this.pages.push(new Page(i, i+1, "/api/admin/users/api/search?page=" + i, data.pages == 0));
                    }

                    _this.pages.push(new Page(data.pages -1, "Last", "/api/admin/users/api/search?page=" + (data.pages -1), false));
                },
                contentType: 'application/json',
                dataType: 'json'
            });
        } else {

            $.getJSON("/api/admin/users/api/all?page=" + page.page, function (data) {
                console.log("Users", data);
                _this.pages.removeAll();
                _this.users.removeAll();
                data.userDTOS.forEach(function (userDTO, index) {

                    var newUser = new User(userDTO.id, userDTO.email, userDTO.groups, this.roles());
                    _this.users.push(newUser);

                    var rolesKO = userDTO.roles.map(function (role, index) {

                        return new RoleDTO(role.id, role.name);
                    });
                    newUser.roles(rolesKO);
                }, _this);


                _this.pages.push(new Page(0, "First", "/api/admin/users/api/all?page=0", false))

                for (i = 0; i < data.pages; i++) {

                    _this.pages.push(new Page(i, i+1, "/api/admin/users/api/all?page=" + i, data.pages == 0))
                }

                _this.pages.push(new Page(data.pages -1, "Last", "/api/admin/users/api/all?page=" + (data.pages -1), false))
            });
        }
    };

    _this.searchQuery = ko.observable('');
    _this.searchCustomers = function() {

        if(_this.searchQuery() === '') {

            _this.search(false);
            $.getJSON("/api/admin/users/api/all?page=0", function (data) {
                console.log("Users", data);
                _this.pages.removeAll();
                _this.users.removeAll();
                data.userDTOS.forEach(function (userDTO, index) {

                    var newUser = new User(userDTO.id, userDTO.email, userDTO.groups, this.roles());
                    _this.users.push(newUser);

                    var rolesKO = userDTO.roles.map(function (role, index) {

                        return new RoleDTO(role.id, role.name);
                    });
                    newUser.roles(rolesKO);
                }, _this);


                _this.pages.push(new Page(0, "First", "/api/admin/users/api/all?page=0", false))

                for (i = 0; i < data.pages; i++) {

                    _this.pages.push(new Page(i, i+1, "/api/admin/users/api/all?page=" + i, data.pages == 0))
                }

                _this.pages.push(new Page(data.pages - 1, "Last", "/api/admin/users/api/all?page=" + (data.pages -1), false))
            });
        } else {

            _this.search(true);
            var data = {
                query: _this.searchQuery()
            };

            $.ajax({
                type: 'POST',
                url: '/api/admin/users/api/search?page=0',
                data: JSON.stringify(data),
                success: function (returnedData) {
                    console.log('POST /api/admin/users/api/search?page=0', returnedData);
                    _this.pages.removeAll();
                    _this.users.removeAll();
                    returnedData.userDTOS.forEach(function (userDTO, index) {

                        var newUser = new User(userDTO.id, userDTO.email, userDTO.groups, this.roles());
                        _this.users.push(newUser);

                        var rolesKO = userDTO.roles.map(function (role, index) {

                            return new RoleDTO(role.id, role.name);
                        });
                        newUser.roles(rolesKO);
                    }, _this);


                    _this.pages.push(new Page(0, "First", "/api/admin/users/api/search?page=0", false));

                    for (i = 0; i < data.pages; i++) {

                        _this.pages.push(new Page(i, i+1, "/api/admin/users/api/search?page=" + i, data.pages == 0));
                    }

                    _this.pages.push(new Page(data.pages -1, "Last", "/api/admin/users/api/search?page=" + (data.pages -1), false));
                },
                contentType: 'application/json',
                dataType: 'json'
            });
        }
    };

    console.log(_this.pages());

    $.getJSON("/api/admin/security/api/roles", function (data) {
        console.log("Roles", data);
        data.forEach(function (role) {

            this.roles.push(new RoleDTO(role.id, role.name));
        }, _this);
    });

    $.getJSON("/api/admin/users/api/all?page=0", function (data) {
        console.log("Users", data);
        _this.pages.removeAll();
        _this.users.removeAll();
        data.userDTOS.forEach(function (userDTO, index) {

            var newUser = new User(userDTO.id, userDTO.email, userDTO.groups, this.roles());
            _this.users.push(newUser);

            var rolesKO = userDTO.roles.map(function (role, index) {

                return new RoleDTO(role.id, role.name);
            });
            newUser.roles(rolesKO);
        }, _this);


        _this.pages.push(new Page(0, "First", "/api/admin/users/api/all?page=0", false))

        for (i = 0; i < data.pages; i++) {

            _this.pages.push(new Page(i, i+1, "/api/admin/users/api/all?page=" + i, data.pages == 0))
        }

        _this.pages.push(new Page(data.pages - 1, "Last", "/api/admin/users/api/all?page=" + (data.pages -1), false))
    });
};

ko.applyBindings(new MyViewModel());