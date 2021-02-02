(function (webmentionContext) {
    // var url = 'https://whyouare111.github.io/hexo-icarus-showcase/2021/01/08/matataki-auth/';
    // var url = 'https://whyouare111.github.io/hexo-icarus-showcase/2021/02/02/webmention-demo/';
    var url = window.location.href;
    const webmentionBaseUrl = webmentionContext.baseUrl;

    webmentionContext.webmentionsPromise = fetch(webmentionBaseUrl + "/api/mentions.jf2?target=" + encodeURIComponent(url))
        .then(function (response) {
            return response.json();
        })
        .catch(function (ex) {
            console.error('fetch mastodon webmention error' + ex);
        });
})(window.webmentionContext);

