import React from 'react';
import ReactDOM from 'react-dom';

import Button from './components/Button';

class App extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.banList.split(','))
        this.state = {
            banList: props.banList.split(',')
        }
    }


    componentDidMount() {
        const rule = new RegExp(this.state.banList.join('|'), 'i')
        setInterval(function () {
            Array.from(document.querySelectorAll('[role="article"]'))
                .filter(d => rule.test(d.innerText))
                .forEach(d => d.remove())
        }, 1000)
    }

    render() {
        return (
            <div>
                Spoiler remover activated !!
        <Button />
            </div>
        )
    }
}

// Message Listener function
chrome.runtime.onMessage.addListener((request, sender, response) => {
    // If message is injectApp
    if (request.injectApp) {
        // Inject our app to DOM and send response
        injectApp(request.banList);
        response({
            startedExtension: true,
        });
    }
});

function injectApp(banList) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "chromeExtensionReactApp");
    document.body.appendChild(newDiv);
    ReactDOM.render(<App banList={banList} />, newDiv);
}