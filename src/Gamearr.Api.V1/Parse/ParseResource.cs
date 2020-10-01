using System.Collections.Generic;
using NzbDrone.Core.Parser.Model;
using Gamearr.Api.V1.Albums;
using Gamearr.Api.V1.Artist;
using Gamearr.Http.REST;

namespace Gamearr.Api.V1.Parse
{
    public class ParseResource : RestResource
    {
        public string Title { get; set; }
        public ParsedAlbumInfo ParsedAlbumInfo { get; set; }
        public ArtistResource Artist { get; set; }
        public List<AlbumResource> Albums { get; set; }
    }
}
