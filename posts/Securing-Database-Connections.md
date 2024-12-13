---
title: Securing Database Connections
date: 2024-12-13
---
No matter what framework or database, I used to use a single database connection string in my projects, such as:
```python
DATABASE_URL="postgresql://Root:Password@000.000.00.00:5432/myDB?schema=public"
```
This practice is dangerous and introduces significant security risks. Using a superuser connection string grants excessive privileges to the application's database connection. If attackers compromises the application, they could potentially exploit these high-level permissions to drop tables or modify critical data, or perform unauthorized database operations.

A more secure approach is to create a dedicated user with minimal, specific permission. For instance:
```sql
-- 1. Create application-specific role
CREATE ROLE app_user WITH LOGIN PASSWORD 'your_secure_password';

-- 2. Grant minimal required privileges
GRANT CONNECT ON DATABASE postgres TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE ON "Message" TO app_user;
GRANT SELECT, INSERT, UPDATE ON "User" TO app_user;
```
This allows for separate connection strategies: use the root user connection  for migrations, and the limited privileges app_user connection for regular application operations:
```python
# Admin connection for migrations
DATABASE_URL="postgresql://Root:Password@000.000.00.00:5432/myDB?schema=public"

# Limited privilege application connection
DATABASE_URL="postgresql://app_user:Password@000.000.00.00:5432/myDB?schema=public"
```
