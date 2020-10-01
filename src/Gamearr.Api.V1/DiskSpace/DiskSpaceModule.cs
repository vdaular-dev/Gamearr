using System.Collections.Generic;
using NzbDrone.Core.DiskSpace;
using Gamearr.Http;

namespace Gamearr.Api.V1.DiskSpace
{
    public class DiskSpaceModule :GamearrRestModule<DiskSpaceResource>
    {
        private readonly IDiskSpaceService _diskSpaceService;

        public DiskSpaceModule(IDiskSpaceService diskSpaceService)
            :base("diskspace")
        {
            _diskSpaceService = diskSpaceService;
            GetResourceAll = GetFreeSpace;
        }

        public List<DiskSpaceResource> GetFreeSpace()
        {
            return _diskSpaceService.GetFreeSpace().ConvertAll(DiskSpaceResourceMapper.MapToResource);
        }
    }
}
