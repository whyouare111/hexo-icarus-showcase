window.addEventListener('load', function () {
    var webmentionsPromise = window.webmentionContext.webmentionsPromise;

    webmentionsPromise && webmentionsPromise
        .then(function (data) {
            var html = '';
            data.children.forEach(function (item) {
                html += `<article class="media"><div class="media-content"><p class="date"><time datetime="${item.published}">${item.published.split('T')[0]}</time></p><p class="title"><a target="_blank" href="${item.url}" rel="noopener">${item.url}</a></p></div></article>`
            });
            document.querySelector('div.webmention-timeline').innerHTML = html;

        })
        .catch(function (ex) {
            console.error('fetch mastodon webmention error' + ex);
        });
});
