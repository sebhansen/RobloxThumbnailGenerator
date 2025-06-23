namespace RobloxThumbnailGenerator.Models
{
    public class GenerationRequest
    {
        public string? Prompt { get; set; }
        public string? ImageData { get; set; } // base64 or URL
        public string? ArtStyle { get; set; }
        public string? AspectRatio { get; set; }
    }
}
