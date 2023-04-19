// ==UserScript==
// @name         Spotify AdBlocker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Mute Spotify ads on the Spotify web player
// @author       denes-f
// @match        https://*.spotify.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    console.log("Monkey start");
    //setTimeout(muteSpotify, 5000);
    const wordToCheck = 'reklám';
    function checkTitleForWord() {
        const pageTitle = document.title.toLowerCase();
        if (pageTitle.includes(wordToCheck)) {
            console.log(`The title "${pageTitle}" contains the word "${wordToCheck}"`);
            // Do something else here, such as trigger another function or update the page content
            muteSpotify();
        }
        else {
            console.log(`The title "${pageTitle}" does not contain the word "${wordToCheck}"`);
            unMuteSpotify();
        }
    }
    // Create a new MutationObserver object
    const observer = new MutationObserver(mutationsList => {
        // Check each mutation that has been observed
        for (const mutation of mutationsList) {
            // If the mutation is to the title element
            if (mutation.type === 'childList' && mutation.target.nodeName === 'TITLE') {
                // Call the function to check the title for the word
                checkTitleForWord();
            }
        }
    });

    // Start observing changes to the title element
    observer.observe(document.querySelector('head'), { subtree: true, childList: true });
})();

function muteSpotify() {
    console.log("Monkey is muting Spotify");
    // Find the mute button element with the specified data-testid attribute
    const muteButton = document.querySelector('[data-testid="volume-bar-toggle-mute-button"]');

    // Check if the aria-label attribute of the mute button is set to "Néma"
    if (muteButton && muteButton.getAttribute('aria-label') === 'Néma') {
        // Trigger the click event linked to the mute button
        muteButton.click();
    }
}

function unMuteSpotify() {
    console.log("Monkey is unmuting Spotify");
    // Find the mute button element with the specified data-testid attribute
    const muteButton = document.querySelector('[data-testid="volume-bar-toggle-mute-button"]');

    // Check if the aria-label attribute of the mute button is not set to "Néma"
    if (muteButton && muteButton.getAttribute('aria-label') !== 'Néma') {
        // Trigger the click event linked to the mute button
        muteButton.click();
    }
}