using Microsoft.AspNetCore.Mvc;
using Models;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly AppSettings _appSettings;

        public TokenController(AppSettings appSettings)
        {
            _appSettings = appSettings;
        }

        [HttpGet]
        public IActionResult GetToken()
        {
            return Ok(new { token = _appSettings.ApiToken });
        }
    }
} 