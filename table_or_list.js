$(function () {
	$.getJSON('table_or_list.json', function (e) {
		console.log(e);
		// FULL Table
		$("#fulltable").append("<h2>Table (" + e.fileName + ")");
		$("#fulltable").append("<table>");
		$("#fulltable table").append("<caption>" + e.fileName);
		$("#fulltable table").append("<tr class='th'>");
		$("#fulltable table tr.th").append("<th scope='col'> </th>");
		for (var a = 0; a < e.products.length; a++) {
			$.each(e.products[a], function (ka, va) {
				$("#fulltable table tr.th").append("<th scope='col'>" + e.products[a][ka][0].title + "</th>");
			});
		}
		for (var b = 0; b < e.people.length; b++) {
			$.each(e.people[b], function (kb, vb) {
				$("#fulltable table").append("<tr data-layer=" + b + "><th scope='row'>" + e.people[b][kb][0].y_headers[0].title);
				for (var c = 0; c < e.people[b][kb][0].x_options.length; c++) {
					$.each(e.people[b][kb][0].x_options[c], function (kc, vc) {
						if (e.people[b][kb][0].x_options[c][kc] === "true") {
							$("#fulltable table tr[data-layer='" + b + "']").append("<td> <span class='visually-hidden'>yes</span><span aria-hidden='true'>&check;</span> ");
						} else {
							$("#fulltable table tr[data-layer='" + b + "']").append("<td> <span class='visually-hidden'>no</span> ");
						}
					});
				}
			});
		}
	});
	// FULL LIST
	$.getJSON('table_or_list.json', function (e) {
		$("#fulllist").append("<hr><h2>List (" + e.fileName + ")");
		for (var b = 0; b < e.people.length; b++) { // b = 0 - 8
			$.each(e.people[b], function (kb, vb) {
				$("#fulllist").append("<h3>" + e.people[b][kb][0].y_headers[0].title);
				$("#fulllist").append("<ul data-layer='" + b + "'>");
				for (var c = 0; c < e.people[b][kb][0].x_options.length; c++) { // c = 0 - 5

					$.each(e.people[b][kb][0].x_options[c], function (kc, vc) {
						if (e.people[b][kb][0].x_options[c][kc] === "true") {

							//alert("c=" + c + " | kc=" + kc );
							$("#fulllist ul[data-layer='" + b + "']").append("<li>" + e.products[c][kc][0].title);
						} else {
							// do nothing
						}
					});
				}
			});
		}
	});


	// PART OF LIST 1
	$.getJSON('table_or_list.json', function (e) {
		$("#category1").append("<hr><h2> Part of List (" + e.people[0].youth_1_9[0].y_headers[0].title + ")");
		$("#category1").append("<ul data-layer='category1'>");
		for (var c = 0; c < e.people[0].youth_1_9[0].x_options.length; c++) { // c = 0 - 5
			$.each(e.people[0].youth_1_9[0].x_options[c], function (kc, vc) {
				if (e.people[0].youth_1_9[0].x_options[c][kc] === "true") {
					$("#category1 ul[data-layer='category1']").append("<li>" + e.products[c][kc][0].title);
				} else {
					// do nothing
				}
			});
		}
	});

	// PART OF LIST 2
	$.getJSON('table_or_list.json', function (e) {
		$("#category2").append("<hr><h2> Part of List (" + e.people[1].youth_10_15[0].y_headers[0].title + ")");
		$("#category2").append("<ul data-layer='category2'>");
		for (var c = 0; c < e.people[1].youth_10_15[0].x_options.length; c++) { // c = 0 - 5
			$.each(e.people[1].youth_10_15[0].x_options[c], function (kc, vc) {
				if (e.people[1].youth_10_15[0].x_options[c][kc] === "true") {
					$("#category2 ul[data-layer='category2']").append("<li>" + e.products[c][kc][0].title);
				} else {
					// do nothing
				}
			});
		}
	});

	// DROPDOWN
	$.getJSON('table_or_list.json', function (e) {
		$("#dropdown").append("<hr><h2> Dropdown (" + e.fileName + ")");
		//$("#dropdown").append("<form>");

		$("#dropdown").append("<select>");
		for (i = 0; i < e.people.length; i++) {
			$.each(e.people[i], function (ki, vi) {
				var headers = e.people[i][ki][0].y_headers[0].title;
				$("select").append("<option value='" + ki + "' data-item='" + i + "'>" + headers);
			});
		}
		$("#dropdown").append(" <button id='submit'> show </button> ");
        
		$("#dropdown").append("<div id='results'>");
        
		$("#submit").on("click keypress", function () {
			$("#results").html("").append("<ul>");
			var ygroup = $("option:selected").val();
            var ytitle = $("option:selected").text();
			var item = $("option:selected").attr("data-item");
            $("#results").prepend('<p>For people in the category "' + ytitle + '" use the following methods of contact:</p>');
            
			for (var i = 0; i < e.people[item][ygroup][0].x_options.length; i++) { // c = 0 - 5
				$.each(e.people[item][ygroup][0].x_options[i], function (ki, vi) {
					if (e.people[item][ygroup][0].x_options[i][ki] === "true") {
                        
						$("#results ul").append("<li>" + e.products[i][ki][0].title);
					} else {
						// do nothing
					}
				});
			}
		});
	});
});