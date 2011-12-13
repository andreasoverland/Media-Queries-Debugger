function checkMediaQueries() {
	var report = '';
	var links = document.getElementsByTagName( 'LINK' );
	report += "<div style='text-align: left;'>Current browser viewport size: " + window.innerWidth + "x" + window.innerHeight + "</div>";
	report += "<br/>";
	for ( var L = 0; L < links.length; L++ ) {
		var media = links[L].media;
		var doesMatch = window.matchMedia( media ).matches;
		if( media !== '' && media !== undefined ){
			report += " <span class='label " + doesMatch + "'>" + doesMatch + "</span><a href='"+links[L].href+"'> " + media + "</a><br/>";
		}
	}

    var stylesheets = document.styleSheets;
    for( var ss=0;ss<stylesheets.length;ss++){
        report += getMqFromCssFile( stylesheets[ss]);
    }

	var reportContainer = document.getElementById( 'reportContainer' );
	if( reportContainer == undefined ){
		reportContainer = document.createElement('div');
		reportContainer.id = 'reportContainer';
		reportContainer.className = 'floatingReportContainer';
		document.getElementsByTagName('body')[0].appendChild( reportContainer );
	}
	reportContainer.innerHTML = report;
}

window.onresize = checkMediaQueries;
checkMediaQueries();


function getMqFromCssFile( stylesheet ){
    var report = '';
    var rules = stylesheet.rules || stylesheet.cssRules;
    if( rules !== null && rules != undefined ){
        for( var rc=0;  rc<rules.length ;rc++){
            var cssRule = rules[rc];
            if( cssRule.type == 4 ){

                var media = cssRule.media[0];

                var doesMatch = window.matchMedia( media ).matches;
                if( media !== '' && media !== undefined ){
                    report += " <span class='label " + doesMatch + "'>" + doesMatch + "</span><a href='"+stylesheet.href+"'> " + media + "</a><br/>";
                }
            }
            else if( cssRule.type == 3 ){

                report += getMqFromCssFile( cssRule.styleSheet );
            }
        }
    }
    return report;

}
