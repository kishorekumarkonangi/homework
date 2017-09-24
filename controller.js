var app = angular.module("myapp", [])
	.controller("mycontroller",function($scope) {
        $scope.jsondata = [{
                "orderId": "62",
                "name": "kishore"
            },
            {
                "orderId": "90",
                "name": "psha"
            },
            {
                "orderId": "6290",
                "name": "praksha"
            }
        ];

        function csvConverter(JSONData, ReportTitle, ShowLabel) {
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
            var csv = '';
            csv += ReportTitle + '\r\n\n';
            if (ShowLabel) {
                var row = "";
                for (var index in arrData[0]) {
                    row += index + ',';
                }
                row = row.slice(0, -1);

                csv += row + '\r\n';
            }

            for (var i = 0; i < arrData.length; i++) {
                var row = "";

                for (var index in arrData[i]) {
                    row += '"' + arrData[i][index] + '",';
                }
                row.slice(0, row.length - 1);
                csv += row + '\r\n';
            }

            if (csv == '') {
                alert("invalid data");
                return;
            }

            var fileName = "MyReport_";
            fileName += ReportTitle.replace(/ /g, "_");

            var uri = 'data:text/csv;charset=utf-8,' + escape(csv);

            var link = document.createElement("a");
            link.href = uri;

            link.style = "visibility:hidden";
            link.download = fileName + ".csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
		            $scope.createcsv = function() {
alert("heey");
                csvConverter($scope.jsondata, 'Title', true);
            }
});