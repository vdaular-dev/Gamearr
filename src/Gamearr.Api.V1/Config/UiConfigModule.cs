using System.Linq;
using System.Reflection;
using NzbDrone.Core.Configuration;
using Gamearr.Http;

namespace Gamearr.Api.V1.Config
{
    public class UiConfigModule : GamearrConfigModule<UiConfigResource>
    {
        public UiConfigModule(IConfigService configService)
            : base(configService)
        {

        }

        protected override UiConfigResource ToResource(IConfigService model)
        {
            return UiConfigResourceMapper.ToResource(model);
        }
    }
}