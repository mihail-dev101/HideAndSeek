namespace hide_and_seek_backend.Interfaces
{
    public interface IEncryptDecrypt
    {
        byte[] EncryptOrDecrypt(byte[] text, byte[] key);
    }
}
