window.addEventListener('load', function () {
    var webmentionsPromise = window.webmentionContext.webmentionsPromise;
    var mastodonContext = window.mastodonContext;

    webmentionsPromise && webmentionsPromise
        .then(function (data) {
            var html = '';
            data.children.forEach(function (item) {
                if (!(mastodonContext && item.url.startsWith(mastodonContext.mastodonBaseUrl))) {
                    html += `<article class="media"><div class="media-content"><p class="article-meta level-left">`;

                    if (item.author && item.author.name) {
                        html += `<i class="level-item author" >`;
                        if (item.author.url) {
                            html += `<a target="_blank" href="${item.author.url}" rel="noopener">${item.author.name}</a>`;
                        }
                        else {
                            html += item.author.name;
                        }
                        html += `</i>`;
                    }

                    html += `<time class="level-item" datetime="${item.published}">${item.published.split('T')[0]}</time></p><p class="title level-left"><i class="level-item">🔗</i><a target="_blank" href="${item.url}" rel="noopener" class="level-item">${item.url}</a></p></div></article>`;
                }
                else {
                    html += `<article class="media"><div class="media-content"><p class="title level-right"><span class="level-item">🐘</span><span class="level-item"><a target="_blank" href="${item.url}" rel="noopener">联邦宇宙入口</a></span></p></article></div>`;
                }

            });
            document.querySelector('div.webmention-timeline').innerHTML = html;

        })
        .catch(function (ex) {
            console.error('fetch mastodon webmention error' + ex);
        });
});
