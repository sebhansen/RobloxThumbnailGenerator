using Microsoft.AspNetCore.Mvc;
using RobloxThumbnailGenerator.Models;

namespace RobloxThumbnailGenerator.Controllers
{
    [ApiController]
    [Route("api/generate")]
    public class GenerateController : ControllerBase
    {
        [HttpPost]
        public IActionResult Generate([FromBody] GenerationRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.ImageData))
            {
                return BadRequest(new { message = "No image data provided." });
            }

            // Mocked response: return 5 locked placeholder images for preview
            var mockResults = Enumerable.Range(1, 5).Select(i => new ThumbnailResult
            {
                Url = $"https://via.placeholder.com/320x180.png?text=Preview+{i}",
                IsLocked = true
            }).ToList();

            Console.WriteLine($"Received generation request: Prompt='{request.Prompt}', ArtStyle='{request.ArtStyle}', AspectRatio='{request.AspectRatio}'");

            return Ok(mockResults);
        }
    }
}
