jQuery(function ($) {
    var url = window.location.href;
    // var url = 'https://whyouare111.github.io/hexo-icarus-showcase/2021/01/08/matataki-auth/';
    var webmentionBaseUrl = window.webmastodonConfig.webmentionBaseUrl;
    var mastodonBaseUrl = window.webmastodonConfig.mastodonBaseUrl;
    $.get(webmentionBaseUrl + "/api/mentions.jf2", {
        target: url
    }, function (data) {

        var mastodonMention = data.children.filter(function (item) {
            return item.url.startsWith(mastodonBaseUrl) && item.author.url == mastodonBaseUrl;
        })[0];

        if (!!mastodonMention) {
            $('a.mastodon-reply').attr('href', mastodonMention['wm-source']);
            $('a.mastodon-reblog').attr('href', mastodonMention['wm-source'].replace('reply', 'reblog'));
            $('a.mastodon-favourite').attr('href', mastodonMention['wm-source'].replace('reply', 'favourite'));

        }

    });
});

