using ISLE.Interfaces;
using Dapper;
using System.Data;

namespace ISLE.Services
{
    public class UserService:IUserService
    {
        private readonly IDbConnection _db;

        public UserService(IDbConnection db)
        {
            _db = db;
        }
        //驗證
        public bool EmailExists(string email)
        {
            var sql = "SELECT COUNT(1) FROM Users where email = @email";
            var count = _db.ExecuteScalar<int>(sql, new {email = email});
            return count > 0;
        }
        //註冊
        public bool Register(string userName, string email, string password)
        {
            if(EmailExists(email)) return false;

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

            var sql = @"INSERT INTO Users (name, email, password_hash)
                        VALUES (@UserName, @Email, @PasswordHash)";

            var rows = _db.Execute(sql, new { UserName = userName, Email = email, PasswordHash = passwordHash });
            return rows > 0;
        }
    }
}