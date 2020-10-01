using Nancy;
using Gamearr.Http.Exceptions;

namespace Gamearr.Http.REST
{
    public class UnsupportedMediaTypeException : ApiException
    {
        public UnsupportedMediaTypeException(object content = null)
            : base(HttpStatusCode.UnsupportedMediaType, content)
        {
        }
    }
}
