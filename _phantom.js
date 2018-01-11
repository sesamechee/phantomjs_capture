var fs = require('fs');
var page = new WebPage();

var urls = 
[
	'/',
	'/indexes/all-indexes',
	'/indexes/all-indexes/hsi',
	'/indexes/all-indexes/hsi/top-10',
	'/indexes/all-indexes/hsi/tagged-info',
	'/indexes/index-schedule',
	'/indexes/new-indexes-updates',
	'/our-business/licenses-funds-etf-creation',
	'/our-business/licenses-index-linked-product-creation',
	'/our-business/data-dissemination',
	'/our-business/data-products',
	'/our-business/historical-data-order',
	'/our-business/hsics',
	'/our-business/customized-indexes',
	'/our-business/historical-data-order/order',
	'/resources-education/quarterly-publications',
	'/resources-education/reports',
	'/resources-education/factsheets',
	'/resources-education/brochures',
	'/resources-education/daily-reports',
	'/resources-education/index-methodologies',
	'/resources-education/index-operation-guide',
	'/resources-education/index-videos',
	'/resources-education/about-hsi-family',
	'/resources-education/about-index-investment',
	'/resources-education/feature-articles',
	'/resources-education/faf-cap-factor',
	'/newsroom/press-releases',
	'/newsroom/index-other-notices',
	'/newsroom/consultations',
	'/about-us/company-profile',
	'/about-us/company-milestones',
	'/about-us/advisory-committee',
	'/disclaimer',
	'/sitemap'
];

function handle_page(url){
	page.viewportSize = { width: 1920, height: 1080 };
    page.open('http://your-path' + url, function(){
		page.evaluate(function(){
		});
    });
	page.onLoadFinished = function() {
		setTimeout (function(){
			var str = "";
			if( url == "/" ){
				str = "index";
			}else{
				str = url.split('/');
				str = str[str.length - 1];
			}
			console.log( 'Finish Load Page: ' + str );
			page.render(str + '.jpeg', {format: 'jpeg', quality: '100'});
			fs.write( str + '.html', page.content + 'w');
			next_page();
		}, 2000);
    };
}

function next_page(){
    var url = urls.shift();
    if(!url){
        phantom.exit(0);
    }
    handle_page(url);
}

next_page();
