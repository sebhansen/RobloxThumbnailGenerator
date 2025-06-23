using Microsoft.AspNetCore.Mvc;
using RobloxThumbnailGenerator.Models;

namespace RobloxThumbnailGenerator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenerateController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] GenerationRequest request)
        {
            // For now, we'll just return a mock success response.

            if (request == null || request.ImageData == null || request.ImageData.Length == 0)
            {
                return BadRequest("No image data provided.");
            }

            // Mocked response: return 5 placeholder images
            var mockResults = Enumerable.Range(1, 5).Select(i => new ThumbnailResult
            {
                ImageUrl = $"https://via.placeholder.com/256x144.png?text=Preview+{i}",
                IsBlurred = true // To simulate the preview
            }).ToList();

            Console.WriteLine($"Received generation request: Prompt='{request.Prompt}', Style='{request.Style}', AspectRatio='{request.AspectRatio}', Images={request.ImageData.Length}");

            return Ok(mockResults);
        }
    }
}
