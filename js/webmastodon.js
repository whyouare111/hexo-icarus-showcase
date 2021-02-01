(function (webmastodonConfig) {
    var url = window.location.href;
    // var url = 'https://whyouare111.github.io/hexo-icarus-showcase/2021/01/08/matataki-auth/';
    var webmentionBaseUrl = webmastodonConfig.webmentionBaseUrl;
    var mastodonBaseUrl = webmastodonConfig.mastodonBaseUrl;
    fetch(webmentionBaseUrl + "/api/mentions.jf2?target=" + encodeURIComponent(url))
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var mastodonMention = data.children.filter(function (item) {
                return item.url.startsWith(mastodonBaseUrl) && item.author.url == mastodonBaseUrl;
            })[0];

            if (!!mastodonMention) {
                document.querySelector('a.mastodon-reply').href = mastodonMention['wm-source'];
                document.querySelector('a.mastodon-reblog').href = mastodonMention['wm-source'].replace('reply', 'reblog');
                document.querySelector('a.mastodon-favourite').href = mastodonMention['wm-source'].replace('reply', 'favourite');
            }
        })
        .catch(function (ex) {
            console.error('fetch mastodon webmention error' + ex);
        });
})(window.webmastodonConfig);

