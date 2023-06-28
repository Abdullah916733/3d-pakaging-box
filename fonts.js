const fontsData = {
    "fonts": [
        {
            "name": "Open Sans",
            "url": "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
        },
        {
            "name": "Roboto",
            "url": "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
        },
        {
            "name": "Montserrat",
            "url": "https://fonts.google.com/specimen/Montserrat"
        },
        {
            "name": "Lato",
            "url": "https://fonts.google.com/specimen/Lato"
        },
        {
            "name": "Raleway",
            "url": "https://fonts.google.com/specimen/Raleway"
        },
        {
            "name": "Ubuntu",
            "url": "https://fonts.google.com/specimen/Ubuntu"
        },
        {
            "name": "Poppins",
            "url": "https://fonts.google.com/specimen/Poppins"
        },
        {
            "name": "Nunito",
            "url": "https://fonts.google.com/specimen/Nunito"
        },
        {
            "name": "Oswald",
            "url": "https://fonts.google.com/specimen/Oswald"
        },
        {
            "name": "Source Sans Pro",
            "url": "https://fonts.google.com/specimen/Source+Sans+Pro"
        }
    ]
}

const selectElement = document.querySelector('#fontselector');

// Generate the options based on the fontsData object
fontsData.fonts.forEach(font => {
    const option = document.createElement('option');
    option.text = font.name;
    option.value = font.url;
    selectElement.appendChild(option);
});