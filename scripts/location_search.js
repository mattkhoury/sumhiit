
    // Factor out the search logic into a new function
    function performSearch(searchLat, searchLon, searchPlaceName = '') {
        map.flyTo({ center: [searchLon, searchLat], zoom: 15 });
        searchInput.value = searchPlaceName;
        suggestionsPanel.innerHTML = "";

        const searchBounds = new mapboxgl.LngLatBounds();
        searchBounds.extend([searchLon, searchLat]);

        locationItems.forEach((location) => {
            // existing logic to handle location display based on search...
        });

        map.fitBounds(searchBounds, {
            padding: 20,
            maxZoom: 15,
            duration: 0
        });
        updateDistances(searchLat, searchLon);
        sortLocationItemsByDistance();
    }

    mapboxgl.accessToken =
  "pk.eyJ1IjoibWtob3VyeSIsImEiOiJjbHA4M3YycncyZnNqMmlxdTd5bnprbDVuIn0.osk4JyqoalJ6HP589j4-LA";

    const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    });

    map.addControl(new mapboxgl.NavigationControl());

    const locationItems = document.querySelectorAll(
    '[data-studio="location-item"]'
    );
    const searchInput = document.querySelector('[data-studio="search"]');
    const clearSearchButton = document.querySelector(
    '[data-studio="clear-search"]'
    );

    locationItems.forEach((location) => {
    const distanceElement = location.querySelector('[data-studio="distance"]');
    if (distanceElement) {
        distanceElement.style.display = "none";
    }
    });

    function sortLocationItemsAlphabetically() {
    const locationsArray = Array.from(locationItems);
    locationsArray.sort((a, b) => {
        const nameA = a
        .querySelector('[data-studio="name"]')
        .textContent.trim()
        .toLowerCase();
        const nameB = b
        .querySelector('[data-studio="name"]')
        .textContent.trim()
        .toLowerCase();
        return nameA.localeCompare(nameB);
    });

    const container = document.querySelector('[data-studio="location-list"]');
    locationsArray.forEach((location) => container.appendChild(location));
    }

    sortLocationItemsAlphabetically();

    function updateDistances(centerLat, centerLon) {
    locationItems.forEach((location) => {
        const distanceElement = location.querySelector('[data-studio="distance"]');
        if (distanceElement) {
        const locationLon = parseFloat(
            location.querySelector('[data-studio="longitude"]').textContent.trim()
        );
        const locationLat = parseFloat(
            location.querySelector('[data-studio="latitude"]').textContent.trim()
        );
        const distance = distanceInKilometers(
            centerLat,
            centerLon,
            locationLat,
            locationLon
        );
        distanceElement.textContent = `${distance.toFixed(2)} km`;
        distanceElement.style.display = "block";
        }
    });
    }

    function sortLocationItemsByDistance() {
    const locationsArray = Array.from(locationItems);
    locationsArray.sort((a, b) => {
        const distanceA =
        parseFloat(a.querySelector('[data-studio="distance"]').textContent) ||
        Infinity;
        const distanceB =
        parseFloat(b.querySelector('[data-studio="distance"]').textContent) ||
        Infinity;
        return distanceA - distanceB;
    });

    const container = document.querySelector('[data-studio="location-list"]');
    locationsArray.forEach((location) => container.appendChild(location));
    }

    const suggestionsPanel = document.createElement("div");
    suggestionsPanel.classList.add("suggestions-panel");
    searchInput.parentNode.insertBefore(suggestionsPanel, searchInput.nextSibling);

    const RADIUS = 200;
    const bounds = new mapboxgl.LngLatBounds();

    function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
    }

    function distanceInKilometers(lat1, lon1, lat2, lon2) {
    const R = 6371.0; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
    }

    clearSearchButton.addEventListener("click", function () {
    searchInput.value = "";
    suggestionsPanel.innerHTML = "";
    locationItems.forEach((item) => (item.style.display = ""));
    map.fitBounds(bounds, { padding: 20, maxZoom: 15, duration: 0 });
    });

    searchInput.addEventListener("input", function (e) {
    const searchText = e.target.value.toLowerCase();
    suggestionsPanel.innerHTML = "";
    if (searchText.length > 2) {
        const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        searchText
        )}.json?access_token=${mapboxgl.accessToken}&autocomplete=true&limit=5`;

        fetch(geocodingUrl)
        .then((response) => response.json())
        .then((data) => {
            data.features.forEach(function (feature) {
            const suggestion = document.createElement("div");
            suggestion.classList.add("suggestion");
            suggestion.textContent = feature.place_name;
            suggestion.addEventListener("click", function () {
                const [searchLon, searchLat] = feature.center;
                map.flyTo({ center: feature.center, zoom: 15 });
                searchInput.value = feature.place_name;
                suggestionsPanel.innerHTML = "";

                const searchBounds = new mapboxgl.LngLatBounds();
                searchBounds.extend([searchLon, searchLat]);

                locationItems.forEach((location) => {
                const locationLon = parseFloat(
                    location
                    .querySelector('[data-studio="longitude"]')
                    ?.textContent.trim()
                );
                const locationLat = parseFloat(
                    location
                    .querySelector('[data-studio="latitude"]')
                    ?.textContent.trim()
                );
                const postalCode = location
                    .querySelector('[data-studio="postal-code"]')
                    ?.textContent.trim()
                    .toLowerCase();

                const isWithinRadius =
                    distanceInKilometers(
                    searchLat,
                    searchLon,
                    locationLat,
                    locationLon
                    ) <= RADIUS;
                const isPostalCodeMatch =
                    postalCode && postalCode.includes(searchText);

                if (isWithinRadius || isPostalCodeMatch) {
                    location.style.display = "";
                    searchBounds.extend([locationLon, locationLat]);
                } else {
                    location.style.display = "";
                }
                });

                map.fitBounds(searchBounds, {
                padding: 20,
                maxZoom: 15,
                duration: 0,
                });
                updateDistances(searchLat, searchLon);
                sortLocationItemsByDistance();
            });
            suggestionsPanel.appendChild(suggestion);
            });
        })
        .catch((err) => console.error(err));
    }
    });

    // New function to handle geolocation-based search
    function performGeolocationBasedSearch() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const { latitude, longitude } = position.coords;
                performSearch(latitude, longitude, "Your Location");
            }, function (error) {
                console.error("Geolocation error: ", error);
                // handle error or fallback scenario
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
            // handle browsers that don't support geolocation
        }
    }


    function addCustomMarkers() {
    locationItems.forEach(function (location) {
        const longitude = location
        .querySelector('[data-studio="longitude"]')
        ?.textContent.trim();
        const latitude = location
        .querySelector('[data-studio="latitude"]')
        ?.textContent.trim();
        const name = location
        .querySelector('[data-studio="name"]')
        ?.textContent.trim();
        const phone = location
        .querySelector('[data-studio="phone"]')
        ?.textContent.trim();
        const email = location
        .querySelector('[data-studio="email"]')
        ?.textContent.trim();
        const address = location
        .querySelector('[data-studio="address"]')
        ?.textContent.trim();
        const postalCode = location
        .querySelector('[data-studio="postal-code"]')
        ?.textContent.trim();
        const url = location
        .querySelector('[data-studio="url"]')
        ?.getAttribute("href");

        if (longitude && latitude) {
        const el = document.createElement("div");
        el.className = "custom-marker";
        el.style.backgroundImage =
            "url('https://assets-global.website-files.com/64dc56a8a158e1aa57a84496/65033b81dd492b5ee67cadce_Size%3Dxl%2C%20Dark%20mode%3DFalse%2C%20Text%3DFalse%2C%20Levels%3D1%2C%20Brand%3DBoth.svg')";
        el.style.width = "50px";
        el.style.height = "50px";

        const originalPopupContent = location.querySelector(
            '[data-studio="location-popup"]'
        );
        const clonedPopupContent = originalPopupContent.cloneNode(true);
        clonedPopupContent.style.display = "block";

        const popup = new mapboxgl.Popup({
            offset: 25,
            className: "map-popup",
        }).setHTML(clonedPopupContent.outerHTML);

        const marker = new mapboxgl.Marker(el)
            .setLngLat([parseFloat(longitude), parseFloat(latitude)])
            .setPopup(popup)
            .addTo(map);

        bounds.extend([parseFloat(longitude), parseFloat(latitude)]);

        location.addEventListener("click", () => {
            const longitude = parseFloat(
            location.querySelector('[data-studio="longitude"]').textContent
            );
            const latitude = parseFloat(
            location.querySelector('[data-studio="latitude"]').textContent
            );

            map.flyTo({ center: [longitude, latitude], zoom: 15 });
            popup.addTo(map);
        });
        }
    });
    }

    // Call the geolocation-based search function on page load
    map.on("load", function () {
        addCustomMarkers();
        performGeolocationBasedSearch();
        if (!bounds.isEmpty()) {
            map.fitBounds(bounds, { padding: 20, maxZoom: 15, duration: 0 });
        }
    });

    document.addEventListener("click", function (event) {
    if (event.target.closest(".location-popup_close")) {
        const openPopups = document.querySelectorAll(".mapboxgl-popup");
        openPopups.forEach((popup) => popup.remove());
    }
    });

    document.addEventListener("click", function (event) {
    if (
        !searchInput.contains(event.target) &&
        !suggestionsPanel.contains(event.target)
    ) {
        suggestionsPanel.innerHTML = "";
    }
    });

    document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        suggestionsPanel.innerHTML = "";
    }
    });
