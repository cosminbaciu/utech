SELECT setval('permissions_id_seq', 2, true);
SELECT setval('roles_id_seq', 2, true);

INSERT INTO permissions (name) VALUES
            ('ROLE_CUSTOMER_VIEW'),
            ('ROLE_CUSTOMER_EDIT'),
            ('ROLE_CUSTOMER_ADMIN');


 INSERT INTO roles (name) VALUES
            ('Customer Support'),
            ('Customer Administrator');

SELECT setval('permissions_id_seq', 8, true);
SELECT setval('roles_id_seq', 5, true);

insert into role_permissions (id, role_id, permission_id) VALUES (DEFAULT , 3, 3);
insert into role_permissions (id, role_id, permission_id) VALUES (DEFAULT , 3, 4);

insert into role_permissions (id, role_id, permission_id) VALUES (DEFAULT , 4, 3);
insert into role_permissions (id, role_id, permission_id) VALUES (DEFAULT , 4, 4);
insert into role_permissions (id, role_id, permission_id) VALUES (DEFAULT , 4, 5);


