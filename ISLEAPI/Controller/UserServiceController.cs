using Microsoft.AspNetCore.Mvc;
using ISLE.Interfaces;

namespace ISLE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (_userService.EmailExists(request.Email))
                return BadRequest("Email already exists.");

            var success = _userService.Register(request.UserName, request.Email, request.Password);
            if (!success)
                return StatusCode(500, "Failed to register user.");

            return Ok(new{ message = "User registered successfully."});
        }

    }
    public class RegisterRequest
    {
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}