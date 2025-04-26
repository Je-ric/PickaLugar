var addressDropdownHandlers = {
    // Populate province dropdown based on selected region
    populateProvinces: function() {
        var selectedRegionCode = $(this).val();

        var selectedRegionName = $(this).find("option:selected").text();
        $('#region-text').val(selectedRegionName);

        // Clear dependent inputs
        $('#province-text').val('');
        $('#city-text').val('');
        $('#barangay-text').val('');

        // Reset province dropdown
        let provinceDropdown = $('#province');
        provinceDropdown.empty();
        provinceDropdown.append('<option selected="true" disabled>Choose State/Province</option>');
        provinceDropdown.prop('selectedIndex', 0);

        // Reset city dropdown
        let cityDropdown = $('#city');
        cityDropdown.empty();
        cityDropdown.append('<option selected="true" disabled></option>');
        cityDropdown.prop('selectedIndex', 0);

        // Reset barangay dropdown
        let barangayDropdown = $('#barangay');
        barangayDropdown.empty();
        barangayDropdown.append('<option selected="true" disabled></option>');
        barangayDropdown.prop('selectedIndex', 0);

        // Load and populate province options
        var provinceDataUrl = 'ph-JSON/province.json';
        $.getJSON(provinceDataUrl, function(provinceData) {
            var filteredProvinces = provinceData.filter(function(item) {
                return item.region_code == selectedRegionCode;
            });

            filteredProvinces.sort((a, b) => a.province_name.localeCompare(b.province_name));

            $.each(filteredProvinces, function(index, province) {
                provinceDropdown.append($('<option></option>').attr('value', province.province_code).text(province.province_name));
            });
        });
    },

    // Populate city dropdown based on selected province
    populateCities: function() {
        var selectedProvinceCode = $(this).val();

        var selectedProvinceName = $(this).find("option:selected").text();
        $('#province-text').val(selectedProvinceName);

        // Clear dependent inputs
        $('#city-text').val('');
        $('#barangay-text').val('');

        // Reset city dropdown
        let cityDropdown = $('#city');
        cityDropdown.empty();
        cityDropdown.append('<option selected="true" disabled>Choose city/municipality</option>');
        cityDropdown.prop('selectedIndex', 0);

        // Reset barangay dropdown
        let barangayDropdown = $('#barangay');
        barangayDropdown.empty();
        barangayDropdown.append('<option selected="true" disabled></option>');
        barangayDropdown.prop('selectedIndex', 0);

        // Load and populate city options
        var cityDataUrl = 'ph-JSON/city.json';
        $.getJSON(cityDataUrl, function(cityData) {
            var filteredCities = cityData.filter(function(item) {
                return item.province_code == selectedProvinceCode;
            });

            filteredCities.sort((a, b) => a.city_name.localeCompare(b.city_name));

            $.each(filteredCities, function(index, city) {
                cityDropdown.append($('<option></option>').attr('value', city.city_code).text(city.city_name));
            });
        });
    },

    // Populate barangay dropdown based on selected city
    populateBarangays: function() {
        var selectedCityCode = $(this).val();

        var selectedCityName = $(this).find("option:selected").text();
        $('#city-text').val(selectedCityName);

        // Clear barangay input
        $('#barangay-text').val('');

        // Reset barangay dropdown
        let barangayDropdown = $('#barangay');
        barangayDropdown.empty();
        barangayDropdown.append('<option selected="true" disabled>Choose barangay</option>');
        barangayDropdown.prop('selectedIndex', 0);

        // Load and populate barangay options
        var barangayDataUrl = 'ph-JSON/barangay.json';
        $.getJSON(barangayDataUrl, function(barangayData) {
            var filteredBarangays = barangayData.filter(function(item) {
                return item.city_code == selectedCityCode;
            });

            filteredBarangays.sort((a, b) => a.brgy_name.localeCompare(b.brgy_name));

            $.each(filteredBarangays, function(index, barangay) {
                barangayDropdown.append($('<option></option>').attr('value', barangay.brgy_code).text(barangay.brgy_name));
            });
        });
    },

    // Display selected barangay name in input
    showSelectedBarangay: function() {
        var selectedBarangayName = $(this).find("option:selected").text();
        $('#barangay-text').val(selectedBarangayName);
    },
};

$(function() {
    // Bind dropdown change events to handler functions
    $('#region').on('change', addressDropdownHandlers.populateProvinces);
    $('#province').on('change', addressDropdownHandlers.populateCities);
    $('#city').on('change', addressDropdownHandlers.populateBarangays);
    $('#barangay').on('change', addressDropdownHandlers.showSelectedBarangay);

    // Initialize region dropdown
    let regionDropdown = $('#region');
    regionDropdown.empty();
    regionDropdown.append('<option selected="true" disabled>Choose Region</option>');
    regionDropdown.prop('selectedIndex', 0);

    // Load and populate region options
    const regionDataUrl = 'ph-JSON/region.json';
    $.getJSON(regionDataUrl, function(regionData) {
        $.each(regionData, function(index, region) {
            regionDropdown.append($('<option></option>').attr('value', region.region_code).text(region.region_name));
        });
    });
});
