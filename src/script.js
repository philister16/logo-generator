let fontBase64 = null;

// Function to generate SVG
function generateSVG(light = false) {
    const line1 = document.getElementById('line1').value;
    const line2 = document.getElementById('line2').value;
    const line3 = document.getElementById('line3').value;
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    const color3 = document.getElementById('color3').value;
    const textColor = light ? "white" : "black";

    if (!fontBase64) {
        console.error('Font not loaded');
        return '';
    }

    return `
        <svg width="1276" height="417" viewBox="0 0 1276 417" fill="none" xmlns="http://www.w3.org/2000/svg">
            <style>
                @font-face {
                    font-family: 'Source Sans 3';
                    src: url(data:font/ttf;base64,${fontBase64}) format('truetype');
                    font-weight: 600;
                    font-style: normal;
                }
                .logo-text {
                    font-family: 'Source Sans 3', sans-serif;
                    font-weight: 600;
                    font-size: 96px;
                    letter-spacing: -0.013em;
                }
            </style>
            <text class="logo-text" fill="${textColor}">
                <tspan x="425.774" y="187.746">${line1}</tspan>
                <tspan x="425.774" y="278.746">${line2}</tspan>
                <tspan x="425.774" y="369.746">${line3}</tspan>
            </text>
            <path d="M95.1691 186.58H121.696V285.842H95.1691V186.58Z" fill="${textColor}"></path>
            <path d="M201.408 200.088V285.848H174.901V200.088H138.013V186.58H238.3V200.088H201.408Z" fill="${textColor}"></path>
            <path d="M254.617 186.584H281.136L281.133 285.842H254.617V186.584Z" fill="${textColor}"></path>
            <path d="M34.6065 214.685C34.6065 259.807 51.6591 300.163 78.5304 327.254C92.5947 343.952 114.195 357.886 140.591 367.434C70.4912 349.74 16.2004 292.406 3.05403 220.702L2.97328 220.077L36.83 186.75C35.3705 195.796 34.6065 205.135 34.6065 214.685Z" fill="${color1}" stroke="${color1}" stroke-width="0"></path>
            <path d="M159.021 66.4701L109.283 17.4448C44.8194 46.7373 0 111.622 0 186.964C0 197.98 0.958255 208.773 2.79606 219.263C2.88021 219.743 2.96619 220.223 3.05402 220.702L2.97327 220.077L36.83 186.75C36.8637 186.541 36.8978 186.332 36.9323 186.123C48.1081 118.451 98.2353 67.339 158.472 67.0104L159.021 66.4701Z" fill="${color2}" stroke="${color2}" stroke-width="0"></path>
            <path d="M159.083 66.5308L159.139 67.0088C159.282 67.0089 159.426 67.0093 159.569 67.01L159.083 66.5308Z" fill="${color2}" stroke="${color2}" stroke-width="0"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M136.9 69.3425C144.09 67.8093 151.495 67.0089 159.057 67.0089C219.675 67.0122 270.116 118.48 281.179 186.59H372.802C372.594 83.9599 289.236 0.819636 186.4 0.817139C158.896 0.817139 132.784 6.76568 109.283 17.4449L159.021 66.4701L158.472 67.0105C151.113 67.0506 143.905 67.8488 136.9 69.3425ZM159.139 67.0089L159.083 66.5309L159.569 67.0101C159.426 67.0094 159.282 67.009 159.139 67.0089Z" fill="${color3}" stroke="${color3}" stroke-width="0"></path>
        </svg>
    `;
}

// Function to load and encode the font file
function loadFont() {
    fetch('fonts/Source_Sans_3/static/SourceSans3-SemiBold.ttf')
        .then(response => response.arrayBuffer())
        .then(buffer => {
            const uint8Array = new Uint8Array(buffer);
            const chunks = [];
            const chunkSize = 0xffff;
            for (let i = 0; i < uint8Array.length; i += chunkSize) {
                chunks.push(String.fromCharCode.apply(null, uint8Array.subarray(i, i + chunkSize)));
            }
            fontBase64 = btoa(chunks.join(''));
            updatePreview();
        })
        .catch(error => console.error('Error loading font:', error));
}

// Function to update preview
function updatePreview() {
    if (fontBase64) {
        const preview = document.getElementById('preview');
        preview.innerHTML = generateSVG();
    }
}

// Function to download SVG
function downloadSVG(light = false) {
    const svgData = generateSVG(light);
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = light ? 'logo-light.svg' : 'logo-dark.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Function to download PNG
function downloadPNG(light = false) {
    const svgData = generateSVG(light);
    const canvas = document.createElement('canvas');
    canvas.width = 1276;
    canvas.height = 417;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = light ? 'logo-light.png' : 'logo-dark.png';
        downloadLink.href = pngFile;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
}

// Function to validate input and update character count
function validateInput(input) {
    const maxLength = 20;
    if (input.value.length > maxLength) {
        input.value = input.value.substring(0, maxLength);
        alert('Text is limited to 20 characters.');
    }
    const charCountElement = document.getElementById('charCount' + input.id.slice(-1));
    charCountElement.textContent = `${input.value.length} / ${maxLength}`;
    updatePreview();
}

// Add event listeners
// Add event listeners
document.getElementById('line1').addEventListener('input', (e) => validateInput(e.target));
document.getElementById('line2').addEventListener('input', (e) => validateInput(e.target));
document.getElementById('line3').addEventListener('input', (e) => validateInput(e.target));
document.getElementById('color1').addEventListener('change', updatePreview);
document.getElementById('color2').addEventListener('change', updatePreview);
document.getElementById('color3').addEventListener('change', updatePreview);
document.getElementById('downloadSvg').addEventListener('click', () => downloadSVG(false));
document.getElementById('downloadPng').addEventListener('click', () => downloadPNG(false));
document.getElementById('downloadSvgLight').addEventListener('click', () => downloadSVG(true));
document.getElementById('downloadPngLight').addEventListener('click', () => downloadPNG(true));

// Initialize character counts
document.querySelectorAll('input[type="text"]').forEach(input => validateInput(input));

// Load the font and then update the preview
loadFont();

// Set current year in copyright notice
document.getElementById('currentYear').textContent = new Date().getFullYear();