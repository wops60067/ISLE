namespace ISLE.Interfaces{
    public interface IUserService{
        bool EmailExists(string email);
        bool Register(string userName, string email, string password);
    }
}