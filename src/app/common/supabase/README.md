# Set admin privileges to User

```sql
UPDATE auth.users SET role = 'supabase_admin' WHERE id = 'user_id';
```

# Configure table Policy

```sql
CREATE POLICY "Mertxe admin"
ON table_name
FOR ALL
USING (auth.role() = 'supabase_admin');
```