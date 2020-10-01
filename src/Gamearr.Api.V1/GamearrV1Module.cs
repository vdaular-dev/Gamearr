using Nancy;

namespace Gamearr.Api.V1
{
    public abstract class GamearrV1Module : NancyModule
    {
        protected GamearrV1Module(string resource)
            : base("/api/v1/" + resource.Trim('/'))
        {
        }
    }
}
