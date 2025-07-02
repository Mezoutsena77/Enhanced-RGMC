const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

function generateGrid(key) {
  const seen = new Set();
  const upperKey = key.toUpperCase();
  let chars = [];

  for (let ch of upperKey) {
    if (!seen.has(ch) && pool.includes(ch)) {
      seen.add(ch);
      chars.push(ch);
    }
  }

  for (let ch of pool) {
    if (!seen.has(ch)) {
      chars.push(ch);
    }
  }

  const grid = [];
  for (let i = 0; i < 6; i++) {
    grid.push(chars.slice(i * 6, (i + 1) * 6));
  }
  return grid;
}

function rotateGrid(grid, times) {
  let result = grid;
  for (let t = 0; t < times; t++) {
    result = result[0].map((_, i) => result.map(row => row[i]).reverse());
  }
  return result;
}

function findPosition(grid, char) {
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      if (grid[r][c] === char) {
        return [r, c];
      }
    }
  }
  return [-1, -1];
}

function asciiOffsets(key) {
  return key.toUpperCase().split("").map(c => c.charCodeAt(0) % 6);
}

function encrypt() {
  const text = document.getElementById("plaintext").value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const key = document.getElementById("key").value.toUpperCase().replace(/[^A-Z]/g, "");
  const resultDiv = document.getElementById("result");

  if (!text || !key) {
    resultDiv.innerText = "Please enter valid plaintext and key.";
    return;
  }

  let output = "";
  const offsets = asciiOffsets(key);
  const baseGrid = generateGrid(key);

  let cleanText = text;
  if (cleanText.length % 2 !== 0) cleanText += "X"; // padding

  for (let i = 0; i < cleanText.length; i += 2) {
    const pair = [cleanText[i], cleanText[i + 1]];
    const rotation = (i / 2) % 4;
    const rotated = rotateGrid(baseGrid, rotation);
    const offset = offsets[(i / 2) % offsets.length];

    for (let j = 0; j < 2; j++) {
      const [r, c] = findPosition(rotated, pair[j]);
      const rOffset = (r + offset) % 6;
      const cOffset = (c + offset) % 6;
      const encryptedChar = rotated[cOffset][rOffset]; // swap
      output += encryptedChar;
    }
  }

  resultDiv.innerText = "Encrypted: " + output;
}

function clearFields() {
  document.getElementById("plaintext").value = "";
  document.getElementById("key").value = "";
  document.getElementById("result").innerText = "";
}


function decrypt() {
  const text = document.getElementById("plaintext").value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const key = document.getElementById("key").value.toUpperCase().replace(/[^A-Z]/g, "");
  const resultDiv = document.getElementById("result");

  if (!text || !key || text.length % 2 !== 0) {
    resultDiv.innerText = "Please enter a valid even-length ciphertext and key.";
    return;
  }

  let output = "";
  const offsets = asciiOffsets(key);
  const baseGrid = generateGrid(key);

  for (let i = 0; i < text.length; i += 2) {
    const pair = [text[i], text[i + 1]];
    const rotation = (i / 2) % 4;
    const rotated = rotateGrid(baseGrid, rotation);
    const offset = offsets[(i / 2) % offsets.length];

    for (let j = 0; j < 2; j++) {
      const [r, c] = findPosition(rotated, pair[j]);
      const rSwap = c;
      const cSwap = r;

      const rOrig = (rSwap - offset + 6) % 6;
      const cOrig = (cSwap - offset + 6) % 6;

      output += rotated[rOrig][cOrig];
    }
  }

  resultDiv.innerText = "Decrypted: " + output;
}
