const focusButton = document.getElementById(`focus`);
// alert(focusButton);
// alert(JSON.stringify(extension))
focusButton.addEventListener('click', (clickEvent) => {
    alert(`focus button clicked!`, clickEvent);
    closeAllNonActiveTabs();
});