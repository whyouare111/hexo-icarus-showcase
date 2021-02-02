window.addEventListener('load', function () {
    var webmentionsPromise = window.webmentionContext.webmentionsPromise;
    var mastodonContext = window.mastodonContext;
    var mastodonBaseUrl = mastodonContext.mastodonBaseUrl;

    var openModal = function (url) {
        window.open(url, 'mastodon-intent', 'width=445,height=600,resizable=no,menubar=no,status=no,scrollbars=yes');
    };
    webmentionsPromise && webmentionsPromise
        .then(function (data) {
            var mastodonMention = data.children.filter(function (item) {
                return item.url.startsWith(mastodonBaseUrl) && item.author.url == mastodonBaseUrl;
            })[0];

            if (!!mastodonMention) {
                mastodonContext.reply = function () {
                    openModal(mastodonMention['wm-source']);
                };
                mastodonContext.reblog = function () {
                    openModal(mastodonMention['wm-source'].replace('reply', 'reblog'));
                };
                mastodonContext.favourite = function () {
                    openModal(mastodonMention['wm-source']).replace('reply', 'favourite');
                };
            }
        })
        .catch(function (ex) {
            console.error('fetch mastodon webmention error' + ex);
        });
});
