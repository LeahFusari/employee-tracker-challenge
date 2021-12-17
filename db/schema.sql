DROP TABLE IF EXISTS depts;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;


CREATE TABLE depts (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  dept_id INTEGER,
  FOREIGN KEY (dept_id) REFERENCES depts (id)
  -- CONSTRAINT fk_deptId FOREIGN KEY (dept_id) 
  -- REFERENCES depts(id)
);

CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES roles (id),
  FOREIGN KEY (manager_id) REFERENCES employees (id)
  -- manager_name VARCHAR(30)
  -- CONSTRAINT fk_role FOREIGN KEY (role_id) 
  -- REFERENCES roles(id) ON DELETE CASCADE,
  -- CONSTRAINT fk_manager FOREIGN KEY (manager_id)
  -- REFERENCES employees(id) ON DELETE SET NULL
);