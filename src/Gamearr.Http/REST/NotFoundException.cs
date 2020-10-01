using Nancy;
using Gamearr.Http.Exceptions;

namespace Gamearr.Http.REST
{
    public class NotFoundException : ApiException
    {
        public NotFoundException(object content = null)
            : base(HttpStatusCode.NotFound, content)
        {
        }
    }
}