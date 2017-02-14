module.exports = (Franz, options) => {
	function getMessages() {
		let total = 0;
		let updates = 0;
		let optimizations = 0;
		let comments = 0;
		let issues = 0;

		if($('#main-content-wrapper').hasClass('dashboard')) {
			$('#updates-widget-navigation .tab-count').each( function() {
				let available = $(this).find('.center-text').text();

				updates = updates + parseInt(available);
			});

			issues = $('.optimization-widget .gtm_overview_maintenance-comments .center-text').text();
			optimizations = optimizations + parseInt(issues);

			issues = $('.optimization-widget .gtm_overview_maintenance-revisions .center-text').text();
			optimizations = optimizations + parseInt(issues);

			comments = $('.comments-widget .panel-heading button:first-child').text();
			comments = comments.match(/\((.*)\)/)[1];

			total = updates + '/' + optimizations + '/' + comments;
		} else if($('#main-content-wrapper').hasClass('websites')) {
			let sites = $('.websites-category-header div strong').text();
			let warnings = 0;
			let errors = 0;

			$('.website-thumbnail-wrapper').each( function() {
				let status = $(this).find('.site-status');

				if(status.hasClass('status-warning')) {
					warnings++;
				}

				if(status.hasClass('status-down')) {
					errors++;
				}
			});

			total = sites + '/' + warnings + '/' + errors;
		} else if($('#main-content-wrapper').hasClass('site_dashboard')) {
			$('#updates-widget-navigation .tab-count').each( function() {
				let available = $(this).find('.center-text').text();

				updates = updates + parseInt(available);
			});

			$('.count-info').each( function() {
				if($(this).find('a').length) {
					issues = $(this).text();
				} else if($(this).find('span').length) {
					issues = $(this).text();
				} else {
					issues = 0;
				}

				if(issues !== 0) {
					issues = issues.trim().split(' ');

					if(jQuery.type(issues) === 'array' && issues.length > 0) {
						issues = issues[0];
					}
				}

				optimizations = optimizations + parseInt(issues);
			});

			comments = $('.comments-widget .panel-heading button:first-child').text();
			comments = comments.match(/\((.*)\)/)[1];

			total = updates + '/' + optimizations + '/' + comments;
		}

		Franz.setBadge(total);
	}

	Franz.loop(getMessages);
};