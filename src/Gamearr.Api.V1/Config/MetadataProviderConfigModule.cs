using System;
using System.Linq;
using System.Reflection;
using FluentValidation;
using NzbDrone.Core.Configuration;
using Gamearr.Http;
using NzbDrone.Common.Extensions;
using NzbDrone.Core.Validation;

namespace Gamearr.Api.V1.Config
{
    public class MetadataProviderConfigModule : GamearrConfigModule<MetadataProviderConfigResource>
    {
        public MetadataProviderConfigModule(IConfigService configService)
            : base(configService)
        {
            SharedValidator.RuleFor(c => c.MetadataSource).IsValidUrl().When(c => !c.MetadataSource.IsNullOrWhiteSpace());
        }

        protected override MetadataProviderConfigResource ToResource(IConfigService model)
        {
            return MetadataProviderConfigResourceMapper.ToResource(model);
        }
    }
}
