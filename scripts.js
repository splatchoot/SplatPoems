 async function loadPoems() {
    const host = window.location.protocol + "//" + window.location.host;

    let poems = await fetch(host + "/poems.txt");
    poems = (await poems.text()).trim().split(/\r?\n/);


    const poem_storage = document.getElementById("poems");
    for (let poem of poems) {
        let poem_contents = await (await fetch(host + "/poems/" + poem + ".txt")).text();

        const poem_element = document.createElement("div");
        poem_element.setAttribute("class", "poem");

        // add title
        const poem_title = document.createElement("h2");
        const poem_title_text = document.createTextNode(poem);

        poem_title.appendChild(poem_title_text);
        poem_element.appendChild(poem_title);

        // add text
        const poem_text = document.createElement("pre");
        const poem_textnode = document.createTextNode(poem_contents);

        poem_text.appendChild(poem_textnode);
        poem_element.appendChild(poem_text);

        // add download button
        const poem_download = document.createElement("a");
        poem_download.setAttribute("href", "poems/" + poem + ".txt");
        poem_download.setAttribute("download", "")

        const poem_download_button = document.createElement("button");
        poem_download_button.setAttribute("class", "download-button");
        const poem_download_button_text = document.createTextNode("Download");

        poem_download_button.appendChild(poem_download_button_text);
        poem_download.appendChild(poem_download_button);
        poem_element.appendChild(poem_download);

        poem_storage.appendChild(poem_element);
    }
}

loadPoems()
