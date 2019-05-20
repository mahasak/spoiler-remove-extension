window.onload = () => {
    const $startButton = document.querySelector('.start');
    let banList = document.getElementById('banList').value
    window.console.log('test');
  
    $startButton.onclick = () => {
      // Get active tab
      chrome.tabs.query({
        active: true,
        currentWindow: true,
      }, (tabs) => {
        // Send message to script file
        chrome.tabs.sendMessage(
          tabs[0].id,
          { injectApp: true , banList: document.getElementById('banList').value},
          response => window.close()
        );
      });
    };
  }