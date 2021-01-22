function loadRss(urls, limit) {

	const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser())
	var frag = document.createDocumentFragment()
	var hasBegun = true
	urls.forEach((u) => {
		try {
			var url = new URL(u)
		}
		catch (e) {
			console.error('URL invalid');
			return
		}

		fetch('/proxy.php', {
			headers: {
				'X-Proxy-url': url
			},
			cache: "no-cache"
		}).then((res) => {

			res.text().then((xmlTxt) => {
				/* Parse the RSS Feed and display the content */
				try {
					let doc = DOMPARSER(xmlTxt, "text/xml")
					let heading = document.createElement('h1')
					let headingLink = document.createElement('a');
					headingLink.href = doc.querySelector('channel>link').textContent;
					headingLink.target = '_blank';
					headingLink.rel = 'noopener';
					headingLink.textContent = doc.querySelector('channel>title').textContent;
					heading.appendChild(headingLink);

					frag.appendChild(heading)
					// frag.appendChild(document.createElement('hr'));
					let items = doc.querySelectorAll('item');
					for (let k = 0; k < items.length; k++) {
						if (!!limit && k>= limit) {
							break;
						}
						let item = items[k];
						let temp = document.importNode(document.querySelector('template').content, true);
						let i = item.querySelector.bind(item)
						let t = temp.querySelector.bind(temp)
						t('a').textContent = !!i('title') ? i('title').textContent : '-'
						t('a').href = !!i('link') ? i('link').textContent : '#'
						t('p').innerHTML = !!i('description') ? i('description').textContent : '-'
						frag.appendChild(temp)
					}

				} catch (e) {
					console.error('Error in parsing the feed')
				}
				if (hasBegun) {
					document.querySelector('output').textContent = '';
					hasBegun = false;
				}
				document.querySelector('output').appendChild(frag)
			})
		}).catch(() => console.error('Error in fetching the RSS feed'))

	});
}