/* Formatting function for row details - modify as you need */
function format(data, table_id) {

	var sOut = "<table id=\"example_" + table_id + "\" class=\"loadTable\">";
	sOut += "<thead>";
	sOut += "<tr>";
	sOut += "<th>View Load's SKUs</th>";
	sOut += "<th>Load Volume</th>";
	sOut += "<th>Load Weight</th>";
	sOut += "<th>Full Load</th>";
	sOut += "<th>Load Reason Code</th>";
	sOut += "<th>Load Tenderable</th>";
	sOut += "</tr>";
	sOut += "</thead>";
	sOut += "</table>";
	return sOut;
}

function formatSKUs(data, table_id) {

	var sOut = "<table id=\"exampleSkus_" + table_id + "\" class=\"skuTable\">";
	sOut += "<thead>";
	sOut += "<tr>";
	sOut += "<th>SKU ID</th>";
	sOut += "<th>Merchandise Vendor Number</th>";
	sOut += "<th>Department Number</th>";
	sOut += "<th>Total SKU Quantity</th>";
	sOut += "<th>MOQ</th>";
	sOut += "<th>SOQ</th>";
	sOut += "<th>SER</th>";
	sOut += "<th>DC BUY UOM Quantity</th>";
	sOut += "</tr>";
	sOut += "</thead>";
	sOut += "</table>";
	return sOut;
}

var iTableCounter = 1;

$(document).ready(function() {
	var table = $('#example').DataTable({
		"ajax" : "rs/AppServices/getLoadGroups",
		jQueryUI: true,
		"columns" : [ {
			"className" : 'details-control',
			"orderable" : false,
			"data" : null,
			"defaultContent" : ''
		}, {
			"data" : "orderGroupId"
		}, {
			"data" : "effectiveDate"
		}, {
			"data" : "createTimeStamp"
		}, {
			"data" : "createUserId"
		}, {
			"data" : "loadGroupId"
		}, {
			"data" : "loadGroupVersion"
		}, {
			"data" : "totalLoadCount"
		}, {
			"data" : "orderEligFlag"
		}, {
			"data" : "loadGroupReasonCode"
		} ],
		"order" : [ [ 1, 'asc' ] ]
	});

	// Add event listener for opening and closing details
	$('#example tbody').on('click', 'td.details-control', function() {
		var tr = $(this).closest('tr');
		var row = table.row(tr);

		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		} else {
			// Open this row
			row.child(format(row.data(), iTableCounter)).show();

			var table2 = $('#example_' + iTableCounter).DataTable({
				"ajax" : "ajax/data/trucks.txt",
				"columns" : [ {
					"className" : 'details-control',
					"orderable" : false,
					"destroy": true,
					"data" : null,
					"defaultContent" : ''
				}, {
					"data" : "loadVolume"
				}, {
					"data" : "loadWeight"
				}, {
					"data" : "fullLoad"
				}, {
					"data" : "loadReasonCode"
				}, {
					"data" : "loadTenderElig"
				} ],
				"order" : [ [ 1, 'asc' ] ]
			});
			
			$('#example_' + iTableCounter + ' tbody').on('click', 'td.details-control', function() {
				var tr = $(this).closest('tr');
				var row = table2.row(tr);

				if (row.child.isShown()) {
					// This row is already open - close it
					row.child.hide();
					tr.removeClass('shown');
				} else {
					// Open this row
					row.child(formatSKUs(row.data(), iTableCounter)).show();

					$('#exampleSkus_' + iTableCounter).DataTable({
						"destroy": true,
						"ajax" : "ajax/data/skus.txt",
						"columns" : [ {
							"data" : "skuId"
						}, {
							"data" : "mVendorNbr"
						}, {
							"data" : "deptNbr"
						}, {
							"data" : "totalSkuQty"
						}, {
							"data" : "moq"
						}, {
							"data" : "soq"
						}, {
							"data" : "ser"
						}, {
							"data" : "dcBuyUomQty"
						} ],
						"order" : [ [ 1, 'asc' ] ]
					});
				}
		    } );

			tr.addClass('shown');

			iTableCounter = iTableCounter + 1;
		}
	});
});