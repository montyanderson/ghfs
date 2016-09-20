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

/**
* Represents a repository
* @constructor
* @argument {string} repo Repository path e.g. montyanderson/storm
* @argument {string} ref Reference e.g. master
*/

class ghfs {
	constructor(repo, ref = "master") {
		this.repo = repo;
		this.ref = ref;
	}

	/**
	* Gets the contents of a directory
	* @function
	* @argument {string} path Path e.g. /
	* @argument {requestCallback} cb Callback
	*/

	contents(path = "/", cb = () => {}) {
		getJSON(base + "/repos/" + this.repo + "/contents" + path + "?ref=" + this.ref, (err, files) => {
			if(err) return cb(err);
			cb(null, files.map(f => new File(f)));
		});
	}
};

/**
* Represents a file
* @constructor
* @private
* @argument {Object} file
*/

class File {
	constructor(file) {
		Object.assign(this, file);

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
