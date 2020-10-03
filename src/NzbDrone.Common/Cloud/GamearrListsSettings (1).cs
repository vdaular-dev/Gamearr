using NzbDrone.Common.Http;

namespace NzbDrone.Common.Cloud
{
    public interface IGamearrCloudRequestBuilder
    {
        IHttpRequestBuilderFactory Services { get; }
        IHttpRequestBuilderFactory Search { get; }
        IHttpRequestBuilderFactory InternalSearch { get; }
    }

    public class GamearrCloudRequestBuilder : IGamearrCloudRequestBuilder
    {
        public GamearrCloudRequestBuilder()
        {
            Services = new HttpRequestBuilder("https://services.gamearr.games/v1/")
                .CreateFactory();

            Search = new HttpRequestBuilder("https://api.gamearr.games/api/v0.4/{route}")
                .KeepAlive()
                .CreateFactory();
        }

        public IHttpRequestBuilderFactory Services { get; }

        public IHttpRequestBuilderFactory Search { get; }

        public IHttpRequestBuilderFactory InternalSearch { get; }
    }
}
