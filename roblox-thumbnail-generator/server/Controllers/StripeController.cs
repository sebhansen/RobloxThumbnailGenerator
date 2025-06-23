using Microsoft.AspNetCore.Mvc;

namespace RobloxThumbnailGenerator.Controllers
{
    [ApiController]
    [Route("api/stripe")]
    public class StripeController : ControllerBase
    {
        [HttpPost("create-session")]
        public IActionResult CreateSession()
        {
            // TODO: Initiate Stripe Checkout session (mocked)
            return Ok(new { sessionId = "mocked_session_id" });
        }

        [HttpPost("webhook")]
        public IActionResult Webhook()
        {
            // TODO: Confirm payment (mocked)
            return Ok();
        }
    }
}
