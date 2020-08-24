const renderGreeting = () => {
    const element = document.getElementById('greeting-container');
    if (element) {
        element.innerHTML = `
            <h1>helloworld</h1>
        `;
    }
};

renderGreeting();
