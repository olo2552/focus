console.log("abc")
const getStorageKeyForTabs = (key) => {
    return `tabs-for-window__${key}`
}

const saveTabsOfWindowToStorage = (chromeWindowId, tabsOfWindow) => {
    const storageKey = getStorageKeyForTabs(chromeWindowId);

    chrome.storage.local.set({
        [storageKey]: tabsOfWindow,
    }, (ev) => {
        console.log(`persisted tab state for window ${chromeWindowId}:`, tabsOfWindow);
    });
}

const getSavedTabsOfWindow = (chromeWindowId, callBack) => {
    const storageKey = getStorageKeyForTabs(chromeWindowId);
    
    chrome.storage.local.get([storageKey], (savedTabs) => {
        console.log(`accessed pesisted tab state for  window ${chromeWindowId}:`, savedTabs);
        callBack(savedTabs);
    });
}

const findActiveTab = (chromeTabs) => {
    return chromeTabs.find((chromeTab) => !!chromeTab.active);
}
console.log(chrome.extension.getViews());

function closeAllNonActiveTabs() {
    chrome.windows.getAll({}, (windows) => {
        windows.forEach((chromeWindow) => {
            chrome.tabs.getAllInWindow(chromeWindow.id, (chromeTabs) => {
                saveTabsOfWindowToStorage(chromeWindow.id, chromeTabs);
                
                const activeTab = findActiveTab(chromeTabs);
                console.log({activeTab});
                
                const tabIdsToRemove = chromeTabs
                    .filter((chromeTab) => {
                        return !chromeTab.active;
                    })
                    .map((chromeTab) => {
                        return chromeTab.id;
                    });
                
                chrome.tabs.remove(tabIdsToRemove, () => {
                    console.log(`Removed non-focused tabs`, tabIdsToRemove);
                });
    
                // getSavedTabgsOfWindow(chromeWindow.id, console.log)
            });
        });
    });
}

// chrome.tabs.onCreated(function(tab) {
//     console.log(tab);
//     alert(tab);
// })