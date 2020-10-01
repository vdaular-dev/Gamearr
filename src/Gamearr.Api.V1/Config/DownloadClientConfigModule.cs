using NzbDrone.Core.Configuration;

namespace Gamearr.Api.V1.Config
{
    public class DownloadClientConfigModule : GamearrConfigModule<DownloadClientConfigResource>
    {
        public DownloadClientConfigModule(IConfigService configService)
            : base(configService)
        {
        }

        protected override DownloadClientConfigResource ToResource(IConfigService model)
        {
            return DownloadClientConfigResourceMapper.ToResource(model);
        }
    }
}
