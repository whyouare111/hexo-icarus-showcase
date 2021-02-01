(function (webmastodon) {
    var url = window.location.href;
    var url = 'https://whyouare111.github.io/hexo-icarus-showcase/2021/01/08/matataki-auth/';
    var webmentionBaseUrl = webmastodon.webmentionBaseUrl;
    var mastodonBaseUrl = webmastodon.mastodonBaseUrl;

    var openModal = function(url){
        window.open(url,'mastodon-intent','width=445,height=600,resizable=no,menubar=no,status=no,scrollbars=yes');
    };

    fetch(webmentionBaseUrl + "/api/mentions.jf2?target=" + encodeURIComponent(url))
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var mastodonMention = data.children.filter(function (item) {
                return item.url.startsWith(mastodonBaseUrl) && item.author.url == mastodonBaseUrl;
            })[0];

            if (!!mastodonMention) {
                webmastodon.reply  = function(){
                    openModal(mastodonMention['wm-source']);
                };
                webmastodon.reblog  = function(){
                    openModal(mastodonMention['wm-source'].replace('reply', 'reblog'));
                };
                webmastodon.favourite  = function(){
                    openModal(mastodonMention['wm-source']).replace('reply', 'favourite');
                };

            }
        })
        .catch(function (ex) {
            console.error('fetch mastodon webmention error' + ex);
        });
})(window.webmastodon);

