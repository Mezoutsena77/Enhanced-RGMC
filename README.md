# 🔐 Enhanced Rotating Grid Modular Cipher (E-RGMC)

## 📚 Final Course Project  
**Course:** Information Security  
**Project Title:** Enhanced Rotating Grid Modular Cipher (E-RGMC)  
**Institution:** [SIMAD UNIVERSITY]  
**Instructor:** [Adam Muhiedin]

---

## 👥 Team Members

1. Hussein Ali Salad  
2. Ahmed Muse Ahmed  [Leader]
3. Ahmed Mohamed Ahmed  
4. Mohamed Hassan Abdi  
5. Mohamed Ahmed Mohamud  
6. Abdullahi Mohamed Ahmed  
7. Abdi Fatah Mohamed Abdi  
8. Amino Ahmed Nuur  
9. Sumaya Salad Sahal  
10. Sacdiya Salad Mohamed

---

## 📝 Project Description

The **Enhanced Rotating Grid Modular Cipher (E-RGMC)** is a custom encryption algorithm designed to improve data confidentiality using a 6x6 character grid, ASCII-based modular offsets, and rotational grid transformations.

The tool provides both **encryption** and **decryption** functionality using a dynamic key-based modular cipher approach.

---

## 🚀 Features

- Encrypt plaintext using a rotating 6x6 grid cipher.
- Decrypt ciphertext using reverse transformations.
- Modern, user-friendly web interface.
- Input validation and visual feedback.
- Clear button for fast resets.

---

## 💡 How It Works

- Accepts only **uppercase** letters and digits in both plaintext and key.
- Uses a unique character set mapped to a 6x6 grid.
- The key is broken down into blocks to generate ASCII-based modular offsets.
- Each pair of characters in the message is encrypted based on current grid rotation and offset logic.
- Grids rotate at each step (0°, 90°, 180°, 270°) to increase complexity.

---

## 💻 How to Run the App

### Method 1: Open Locally (No Server Required)
1. Download or clone the project.
2. Open the `index.html` file in your browser.
3. Start encrypting or decrypting!

### Method 2: Run with Live Server (VS Code)
1. Install the **Live Server** extension in VS Code.
2. Open the project folder.
3. Right-click on `index.html` and choose **"Open with Live Server"**.

### Optional: Python Simple Server
```bash
cd path_to_project
python -m http.server 8080
