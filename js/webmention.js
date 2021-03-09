(function (webmentionContext) {

    const url = window.location.href;
    const webmentionBaseUrl = webmentionContext.baseUrl;

    webmentionContext.webmentionsPromise = fetch(webmentionBaseUrl + "/api/mentions.jf2?target=" + encodeURIComponent(url))
        .then(function (response) {
            return response.json();
        })
        .catch(function (ex) {
            console.error('fetch mastodon webmention error' + ex);
        });
})(window.webmentionContext);

