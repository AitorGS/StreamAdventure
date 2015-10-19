
var through2 = require('through2');
var split = require('split');

var counter = 0;

process.stdin.pipe(split()).pipe(
	through2(
		function (buffer, encoding, next){

			String.prototype.transform = counter++ % 2 != 0 ? String.prototype.toUpperCase : String.prototype.toLowerCase;

			this.push(buffer.toString().transform() + '\n');
			next();
		},
		function(done){
			done();
		})
	).pipe(process.stdout);