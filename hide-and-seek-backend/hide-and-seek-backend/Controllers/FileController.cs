using hide_and_seek_backend.Interfaces;
using hide_and_seek_backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace hide_and_seek_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IEncryptDecrypt _encrypt;
        private readonly string folderName = @".\Data";

        public FileController(IEncryptDecrypt encrypt) => _encrypt = encrypt;

        [HttpPost("ImportFile")]
        public IActionResult ImportFile([FromForm] IFormFile file, [FromForm] string key, [FromForm] string operation)
        {
            byte[] byteArray;
            byte[] keyBytes;
            string newExtension;
            string extension = Path.GetExtension(file.FileName);
            string name = file.FileName;
            string baseName = name.Split('.')[0];
            string[] extensions = name.Split('.').Where(val => val != baseName).ToArray();
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                byteArray = memoryStream.ToArray();
                keyBytes = Encoding.ASCII.GetBytes(key);
                if (operation == "encrypt")
                {
                    newExtension = Path.ChangeExtension(extension, $"{extension}.enc");
                }
                else
                {
                    if(extension.Length == 1)
                    {
                        newExtension = Path.ChangeExtension(extension, ".dec");
                    }
                    if (extension.Length == 2)
                    {
                        newExtension = $".{extensions[0]}";
                    }
                    newExtension = $".{string.Join(".", extensions.Where(val => val != "enc").ToArray())}";
                    
                }

                byte[] encryptedFile = _encrypt.EncryptOrDecrypt(byteArray, keyBytes);
                //string folderName = @".\Data";
                string filename = name.Split(".")[0] + newExtension;
                string path = System.IO.Path.Combine(folderName, filename);

                System.IO.File.WriteAllBytes(path, encryptedFile);
                
            }
            return Ok();
        }

        [HttpGet("Download")]
        public FileContentResult Download()
        {
            return File(System.IO.File.ReadAllBytes(System.IO.Directory.GetFiles(folderName)[0]),
                "application/octet-stream", Path.GetFileName(System.IO.Directory.GetFiles(folderName)[0]));
        }
    }
}
