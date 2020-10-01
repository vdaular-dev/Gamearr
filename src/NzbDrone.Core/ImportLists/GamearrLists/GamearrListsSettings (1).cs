using FluentValidation;
using NzbDrone.Core.Annotations;
using NzbDrone.Core.Validation;

namespace NzbDrone.Core.ImportLists.GamearrLists
{
    public class GamearrListsSettingsValidator : AbstractValidator<GamearrListsSettings>
    {
        public GamearrListsSettingsValidator()
        {
        }
    }

    public class GamearrListsSettings : IImportListSettings
    {
        private static readonly GamearrListsSettingsValidator Validator = new GamearrListsSettingsValidator();

        public GamearrListsSettings()
        {
            BaseUrl = "";
        }

        public string BaseUrl { get; set; }

        [FieldDefinition(0, Label = "List Id", Advanced = true)]
        public string ListId { get; set; }

        public NzbDroneValidationResult Validate()
        {
            return new NzbDroneValidationResult(Validator.Validate(this));
        }
    }
}
