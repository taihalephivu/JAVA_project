-- Create database if not exists
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'dna_test_db')
BEGIN
    CREATE DATABASE dna_test_db;
END
GO

-- Switch to the database
USE dna_test_db;
GO

-- Grant permissions to sa user
ALTER AUTHORIZATION ON DATABASE::dna_test_db TO sa;
GO

-- Enable mixed mode authentication
EXEC xp_instance_regwrite N'HKEY_LOCAL_MACHINE', 
     N'Software\Microsoft\MSSQLServer\MSSQLServer',
     N'LoginMode', 
     REG_DWORD,
     2;
GO 