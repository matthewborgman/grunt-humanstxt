'use strict';

var moment = require('moment');

module.exports = function (grunt) {

	grunt.registerMultiTask('humanstxt', 'Update the "last updated" date in a humans.txt', function () {

        // Read the current humans.txt
		function readHumansTxt () {

			var humanstxt = grunt.file.read(options.dest);

			grunt.log.writeln('Read current humans.txt at '+ options.dest.toString().cyan + '.');

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

			grunt.log.writeln('Humans.txt updated at '+ options.dest.toString().cyan + '.');
		}

		// Merge task-specific and/or target-specific options with these defaults.
		var	done	= this.async(),
			options	= this.options({
				dest: './humans.txt'
			});

		readHumansTxt();

		done();
	});
};
