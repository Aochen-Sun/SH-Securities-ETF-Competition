// ==UserScript==
// @name         name
// @namespace    https://aochen-sun.github.io/
// @version      1.0
// @description  Automatically refresh and download the body of the page
// @author       Arsen Sun
// @match        https://1234567.com/1234567
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Set refresh interval in milliseconds
    var refreshInterval = 5000; 

    // Generate unique file names
    function generateFileName() {
        var timestamp = new Date().getTime(); // Use timestamp as part of file name
        return 'page_content_' + timestamp + '.txt';
    }

    // Define refresh function
    function refreshPage() {
        location.reload();
    }

    // Define download function
    function downloadContent(content) {
        var blob = new Blob([content], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var fileName = generateFileName();
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Regularly refresh the page
    setInterval(refreshPage, refreshInterval);

    // Execute when the page load is complete
    window.addEventListener('load', function() {
        // Add a selector for the page content you need to download
        var contentElement = document.querySelector('body'); // Example Select the content of the entire page

        if (contentElement) {
            var content = contentElement.textContent; // Get page content

            // Download page content
            downloadContent(content);
        }
    });
})();
