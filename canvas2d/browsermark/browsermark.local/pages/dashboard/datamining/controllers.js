/* Angular Controllers file */
var app = angular.module('dataMining', []);

app.controller('formCtrl', function($scope, $http)
{
    // Default values
    $scope.datamining =
    {
        "resultsperpage": 500,
        "searchfield": "browser"
    };

    $scope.hidden_export = "; display: none";

    $scope.notSorted = function(obj){
        if (!obj) {
            return [];
        }
        return Object.keys(obj);
    }

    $http.post('/dashboard/datamining/query', {"get-versions": 1}).success(function(response)
    {
        $scope.versions = response;
    });
    $http.post('/dashboard/datamining/query', {"get-countries": 1}).success(function(response)
    {
        $scope.countries = response;
    });
    $http.post('/dashboard/datamining/query', {"get-categories": 1}).success(function(response)
    {
        $scope.categories = response;
    });
    $http.post('/dashboard/datamining/query', {"get-browsers": 1}).success(function(response)
    {
        $scope.browsers = response;
    });
    $http.post('/dashboard/datamining/query', {"get-engines": 1}).success(function(response)
    {
        $scope.engines = response;
    });
    $http.post('/dashboard/datamining/query', {"get-oss": 1}).success(function(response)
    {
        $scope.oss = response;
    });
    $http.post('/dashboard/datamining/query', {"get-detectednames": 1}).success(function(response)
    {
        $scope.detectednames = response;
    });
    $http.post('/dashboard/datamining/query', {"get-givennames": 1}).success(function(response)
    {
        $scope.givennames = response;
    });

    $scope.searchfields = [
        "browser", "layout_engine", "os_name", "detected_name", "given_name", "css_full", "css_partial",
        "css_not_supported", "html5_valid_elements", "html5_invalid_elements", "html5_valid_attributes",
        "html5_invalid_attributes", "html5_valid_selectors", "html5_invalid_selectors", "html5_valid_events",
        "html5_invalid_events", "html5_valid_misc", "html5_invalid_misc"
    ];

    $scope.groupfields = [
        "browser, browser_version", "layout_engine, layout_engine_version", "os_name, os_version",
        "detected_name", "given_name", "country"
    ];

    $scope.resultsperpage = [100,200,300,400,500,600,700,800,900,1000];

    $scope.recalculate = function(data)
    {
        data = data || {};
        data.getcount = 1;
        $http.post('/dashboard/datamining/query', data).success(function(response)
        {
            $scope.count = response[0].cnt;
        });
    }

    // Update counts field
    $scope.recalculate();

    $scope.getdata = function(data, pagenum)
    {
        data = data || {};
        pagenum = pagenum || 0;
        $scope.selected = pagenum;
        $scope.hidden_export = "; display: none";
        $scope.result = "";

        // First get pages count
        $scope.recalculate(data);
        delete data.getcount;
        data.page = pagenum;

        var pagesCount = Math.ceil(parseInt($scope.count) / data.resultsperpage);
        $scope.pageRange = [];
        for (var i = 0; i < pagesCount; i++)
        {
            $scope.pageRange.push(i);
        }

        // Get data
        $http.post('/dashboard/datamining/query', data).success(function(response)
        {
            // Set result
            $scope.result = response;
            $scope.hidden_export = "";
        });
    }

    $scope.isSelected = function(section) {
        return $scope.selected === section;
    }
});

/*
 $.post('/dashboard/datamining/query', {'get-detectednames': '1'}, function(data)
 {
 $scope.detectednames = data;
 }, 'json');

 $.post('/dashboard/datamining/query', {'get-givennames': '1'}, function(data)
 {
 $scope.givennames = data;
 }, 'json');
 }
 */