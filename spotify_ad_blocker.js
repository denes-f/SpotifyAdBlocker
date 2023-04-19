// ==UserScript==
// @name         Spotify AdBlocker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Mute Spotify ads on the Spotify web player
// @author       denes-f
// @match        https://*.spotify.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    console.log("Spotify AdBlocker loaded");
	const wordsToCheck = ['reklám'];
	
	// Create a new MutationObserver object to monitor changes to the site
    const observer = new MutationObserver(mutationsList => {
        // Check each mutation that has been observed
        for (const mutation of mutationsList) {
            // If the mutation is to the title element
            if (mutation.type === 'childList' && mutation.target.nodeName === 'TITLE') {
                // Call the function to check the title for an ad
                checkTitleForAd(wordsToCheck);
            }
        }
    });
    // Start observing changes to the title element
    observer.observe(document.querySelector('head'), { subtree: true, childList: true });
})();

function checkTitleForAd(wordsToCheck) {
	const pageTitle = document.title.toLowerCase();
	for (const word of wordsToCheck) {
		if (pageTitle.includes(word)) {
			console.log(`The title "${pageTitle}" contains the word "${word}"`);
			// Ad detected, muting Spotify
			muteSpotify();
			return;
		}
	}
	console.log(`The title "${pageTitle}" does not contain any of the words "${wordsToCheck}"`);
	// Music detected, unmuting Spotify
	unMuteSpotify();
}

function muteSpotify() {
    console.log("Ad is detected");
    // Find the mute button element with the specified data-testid attribute
    const muteButton = document.querySelector('[data-testid="volume-bar-toggle-mute-button"]');

	if (muteButton) {
		// Check if the aria-label attribute of the mute button is set to "Néma"
		if (muteButton.getAttribute('aria-label') === 'Néma') {
			// Trigger the click event linked to the mute button
			console.log("Muting Spotify");
			muteButton.click();
		}
		else {
			console.log("Spotify is already muted");
		}
	}
	else {
		console.log("Mute button cannot be found");
	}
}

function unMuteSpotify() {
    console.log("Music is detected");
    // Find the mute button element with the specified data-testid attribute
    const muteButton = document.querySelector('[data-testid="volume-bar-toggle-mute-button"]');

	if (muteButton) {
		// Check if the aria-label attribute of the mute button is not set to "Néma"
		if (muteButton.getAttribute('aria-label') !== 'Néma') {
			// Trigger the click event linked to the unmute button
			muteButton.click();
		}
		else {
			console.log("Spotify is already unmuted");
		}
	}
	else {
		console.log("Unmute button cannot be found");
	}
}