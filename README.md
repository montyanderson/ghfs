# ghfs

Interface with a repository on Github as if it were a filesystem.

``` javascript
var repo = new ghfs("montyanderson/storm", "master");

repo.contents(function(err, files) {
	console.log(err || files);

	files.forEach(function(file) {
		file.download(function(err, data) {
			console.log(err || data);
		});
	});
});
```

## class ghfs

### ghfs#constructor(repo, ref)

``` javascript
var repo = new ghfs("montyanderson/storm", "master");
```

### ghfs#contents(path, callback)

``` javascript
repo.contents("/", function(err, items) {
	items.forEach(function(item) {
		console.log(item.name);
	});
});
```

```
.eslintrc.json
.gitignore
.travis.yml
README.md
gulpfile.js
index.js
index.mustache
lib
package.json
process.json
routes
scripts
styles
```

### ghfsItem#download()

``` javascript
repo.contents("/", function(err, items) {
	items.filter(function(item) {
		return item.type == "file";
	}).forEach(function(file) {
		file.download(function(err, data) {
			console.log(data);
		});
	});	
});
```
