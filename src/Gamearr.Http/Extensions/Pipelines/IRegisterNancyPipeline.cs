using Nancy.Bootstrapper;

namespace Gamearr.Http.Extensions.Pipelines
{
    public interface IRegisterNancyPipeline
    {
        int Order { get; }

        void Register(IPipelines pipelines);
    }
}