using Nancy;

namespace Gamearr.Api.V1
{
    public abstract class GamearrV1FeedModule : NancyModule
    {
        protected GamearrV1FeedModule(string resource)
            : base("/feed/v1/" + resource.Trim('/'))
        {
        }
    }
}
