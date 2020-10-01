using System.Collections.Generic;
using NzbDrone.Core.MetadataSource;

namespace NzbDrone.Core.ImportLists.GamearrLists
{
    public class GamearrListsRequestGenerator : IImportListRequestGenerator
    {
        public GamearrListsSettings Settings { get; set; }

        private readonly IMetadataRequestBuilder _requestBulder;

        public GamearrListsRequestGenerator(IMetadataRequestBuilder requestBuilder)
        {
            _requestBulder = requestBuilder;
        }

        public virtual ImportListPageableRequestChain GetListItems()
        {
            var pageableRequests = new ImportListPageableRequestChain();

            pageableRequests.Add(GetPagedRequests());

            return pageableRequests;
        }

        private IEnumerable<ImportListRequest> GetPagedRequests()
        {
            var request = _requestBulder.GetRequestBuilder()
                                        .Create()
                                        .SetSegment("route", "chart/" + Settings.ListId)
                                        .Build();

            yield return new ImportListRequest(request);
        }
    }
}
