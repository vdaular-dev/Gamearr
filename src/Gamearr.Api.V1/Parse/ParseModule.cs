using NzbDrone.Common.Extensions;
using NzbDrone.Core.Parser;
using Gamearr.Api.V1.Albums;
using Gamearr.Api.V1.Artist;
using Gamearr.Http;

namespace Gamearr.Api.V1.Parse
{
    public class ParseModule : GamearrRestModule<ParseResource>
    {
        private readonly IParsingService _parsingService;

        public ParseModule(IParsingService parsingService)
        {
            _parsingService = parsingService;

            GetResourceSingle = Parse;
        }

        private ParseResource Parse()
        {
            var title = Request.Query.Title.Value as string;
            var parsedAlbumInfo = Parser.ParseAlbumTitle(title);

            if (parsedAlbumInfo == null)
            {
                return null;
            }

            var remoteAlbum = _parsingService.Map(parsedAlbumInfo);

            if (remoteAlbum != null)
            {
                return new ParseResource
                {
                    Title = title,
                    ParsedAlbumInfo = remoteAlbum.ParsedAlbumInfo,
                    Artist = remoteAlbum.Artist.ToResource(),
                    Albums = remoteAlbum.Albums.ToResource()
                };
            }
            else
            {
                return new ParseResource
                {
                    Title = title,
                    ParsedAlbumInfo = parsedAlbumInfo
                };
            }
        }
    }
}
