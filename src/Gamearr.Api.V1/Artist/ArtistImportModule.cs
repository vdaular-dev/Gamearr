using System.Collections.Generic;
using Nancy;
using NzbDrone.Core.Music;
using Gamearr.Http;
using Gamearr.Http.Extensions;

namespace Gamearr.Api.V1.Artist
{
    public class ArtistImportModule : GamearrRestModule<ArtistResource>
    {
        private readonly IAddArtistService _addArtistService;

        public ArtistImportModule(IAddArtistService addArtistService)
            : base("/artist/import")
        {
            _addArtistService = addArtistService;
            Post["/"] = x => Import();
        }


        private Response Import()
        {
            var resource = Request.Body.FromJson<List<ArtistResource>>();
            var newArtists = resource.ToModel();

            return _addArtistService.AddArtists(newArtists).ToResource().AsResponse();
        }
    }
}
