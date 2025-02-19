document.addEventListener("DOMContentLoaded", function () {
    const cubeContainer = document.getElementById("cubeContainer");
    const rotateBtn = document.getElementById("rotateBtn");
    let cubes = [];

    // Cube and dot color arrays
    const colors = ["red", "yellow", "blue", "green", "white", "black"];
    const dotColors = ["yellow", "red", "white", "white", "black", "white"];

    // Possible cube face alignments
    const alignments = {
        'front': { x: 0, y: 0, z: 0 },
        'back': { x: 180, y: 0, z: 0 },
        'left': { x: 0, y: 270, z: 0 },
        'right': { x: 0, y: 90, z: 0 },
        'top': { x: 270, y: 0, z: 0 },
        'bottom': { x: 90, y: 0, z: 0 }
    };
    
    // Function to generate cubes dynamically
    function generateCubes(numCubes) {
        // Clear previous cubes
        cubeContainer.innerHTML = '';
        
        for (let i = 0; i < numCubes; i++) {
            let cubeWrapper = document.createElement('div');
            cubeWrapper.classList.add('cube-wrapper');
            let cubeColor = colors[i];
            let cubeDotColor = dotColors[i];  // Dot color for this cube

            cubeWrapper.innerHTML = `
                <div class="cube">
                    <div class="face front" style="background-color: ${cubeColor}"><div class="dice dot-1" style="background-color: ${cubeDotColor};"></div></div>
                    <div class="face back" style="background-color: ${cubeColor}"><div class="dice dot-6-1" style="background-color: ${cubeDotColor};"></div><div class="dice dot-6-2" style="background-color: ${cubeDotColor};"></div><div class="dice dot-6-3" style="background-color: ${cubeDotColor};"></div><div class="dice dot-6-4" style="background-color: ${cubeDotColor};"></div><div class="dice dot-6-5" style="background-color: ${cubeDotColor};"></div><div class="dice dot-6-6" style="background-color: ${cubeDotColor};"></div></div>
                    <div class="face left" style="background-color: ${cubeColor}"><div class="dice dot-2-1" style="background-color: ${cubeDotColor};"></div><div class="dice dot-2-2" style="background-color: ${cubeDotColor};"></div></div>
                    <div class="face right" style="background-color: ${cubeColor}"><div class="dice dot-5-1" style="background-color: ${cubeDotColor};"></div><div class="dice dot-5-2" style="background-color: ${cubeDotColor};"></div><div class="dice dot-5-3" style="background-color: ${cubeDotColor};"></div><div class="dice dot-5-4" style="background-color: ${cubeDotColor};"></div><div class="dice dot-5-5" style="background-color: ${cubeDotColor};"></div></div>
                    <div class="face top" style="background-color: ${cubeColor}"><div class="dice dot-3-1" style="background-color: ${cubeDotColor};"></div><div class="dice dot-3-2" style="background-color: ${cubeDotColor};"></div><div class="dice dot-3-3" style="background-color: ${cubeDotColor};"></div></div>
                    <div class="face bottom" style="background-color: ${cubeColor}"><div class="dice dot-4-1" style="background-color: ${cubeDotColor};"></div><div class="dice dot-4-2" style="background-color: ${cubeDotColor};"></div><div class="dice dot-4-3" style="background-color: ${cubeDotColor};"></div><div class="dice dot-4-4" style="background-color: ${cubeDotColor};"></div></div>
                </div>
            `;
            cubeContainer.appendChild(cubeWrapper);
            cubes.push(cubeWrapper.querySelector('.cube'));  // Store reference to each cube
        }
    }

    // Event listener for the Rotate button
    rotateBtn.addEventListener("click", function () {
        // Get the number of cubes from user input
        const numCubes = parseInt(document.getElementById("numCubes").value);
        
        if (numCubes < 1 || numCubes > 6) {
            alert("Please select a number between 1 and 6.");
            return;
        }

        // Generate the cubes dynamically
        generateCubes(numCubes);

        // Start rotation for each cube
        cubes.forEach(cube => startCubeRotation(cube));
    });

    // Function to start rotating each cube
    function startCubeRotation(cube) {
        let rotationX = Math.floor(Math.random() * 360);
        let rotationY = Math.floor(Math.random() * 360);
        let rotationZ = Math.floor(Math.random() * 360);

        let rotationSpeedX = Math.floor(Math.random() * 100);
        let rotationSpeedY = Math.floor(Math.random() * 100);
        let rotationSpeedZ = Math.floor(Math.random() * 100);

        let interval = setInterval(function () {
            rotationX += rotationSpeedX;
            rotationY += rotationSpeedY;
            rotationZ += rotationSpeedZ;
            cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`;
        }, 10);

        // Stop rotation after 2 seconds
        setTimeout(() => {
            clearInterval(interval);
            let randomFace = getRandomFace();
            let alignedRotation = alignments[randomFace];
            cube.style.transform = `rotateX(${alignedRotation.x}deg) rotateY(${alignedRotation.y}deg) rotateZ(${alignedRotation.z}deg)`;
        }, 1500);  // Stop after 3 seconds
    }

    // Function to get a random face
    function getRandomFace() {
        const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
        return faces[Math.floor(Math.random() * faces.length)];
    }
});
