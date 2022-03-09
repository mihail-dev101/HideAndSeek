using hide_and_seek_backend.Interfaces;

namespace hide_and_seek_backend.Services
{
    public class EncryptDecrypt : IEncryptDecrypt
    {
        public byte[] EncryptOrDecrypt(byte[] text, byte[] key)
        {
            byte[] xor = new byte[text.Length];
            for (int i = 0; i < text.Length; i++)
            {
                xor[i] = (byte)(text[i] ^ key[i % key.Length]);
            }
            return xor;
        }  
    }
}
