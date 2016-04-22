'use strict';

var moment = require('moment');

module.exports = function (grunt) {

	grunt.registerMultiTask('humanstxt', 'Update the "last updated" date in a humans.txt', function () {

        // Read the current humans.txt
		function readHumansTxt () {

			var humanstxt = grunt.file.read(options.src);

			grunt.log.writeln('Read current humans.txt at '+ options.src.toString().cyan + '.');

			updateHumansTxt(humanstxt);
		}

        // Update the humans.txt with current date
		function updateHumansTxt (humanstxt) {

			var	currentDate		= moment().format('YYYY/MM/DD'),
				dateRegex		= /\d{4}\/\d{2}\/\d{2}/i,
				previousDate	= (dateRegex.exec(humanstxt))[0];

			humanstxt = humanstxt.replace(previousDate, currentDate);

			grunt.log.writeln('Updated humans.txt to "' + currentDate.toString().cyan + '".');

			writeHumansTxt(humanstxt);
		}

        // Output the updated humans.txt
		function writeHumansTxt (humanstxt) {

			grunt.file.write(options.dest, humanstxt);

			grunt.log.writeln('Wrote updated humans.txt to '+ options.dest.toString().cyan + '.');
		}

		// Merge task-specific and/or target-specific options with these defaults.
		var	done	= this.async(),
			options	= this.options({
				dest: './humans.txt',
				src: './humans.txt'
			});

		readHumansTxt();

		done();
	});
};
