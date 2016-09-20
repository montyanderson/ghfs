const base = "https://api.github.com";

function get(url, cb = () => {}) {
	if(window.$ && window.$.getJSON) {
		$.get(url, cb);
	} else if(fetch) {
		fetch(url)
		.then(res => res.text())
		.then(json => cb(null, json))
		.catch(err => cb(err));
	} else {
		throw new Error("No ajax wrapper found");
	}
}

function getJSON(url, cb = () => {}) {
	get(url, (err, res) => {
		if(err) return cb(err);
		cb(null, JSON.parse(res));
	});
}

class ghfs {
	constructor(repo, ref = "master") {
		this.repo = repo;
		this.ref = ref;
	}

	contents(path = "/", cb = () => {}) {
		getJSON(base + "/repos/" + this.repo + "/contents" + path + "?ref=" + this.ref, (err, files) => {
			if(err) return cb(err);
			cb(null, files.map(f => new ghfsItem(f)));
		});
	}
};

class ghfsItem {
	constructor(item) {
		Object.assign(this, item);

		if(this.encoding == "base64") {
			this.contents = atob(this.contents);
			this.encoding = "utf8";
		}
	}

	download(cb = () => {}) {
		get(this.download_url, cb);
	}
}



module.exports = ghfs;
