import streamlit as st

# ---------------- Cipher Logic ---------------- #

pool = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

def generate_grid(key):
    seen = set()
    chars = []

    key = key.upper()
    for ch in key:
        if ch in pool and ch not in seen:
            seen.add(ch)
            chars.append(ch)

    for ch in pool:
        if ch not in seen:
            chars.append(ch)

    grid = [chars[i*6:(i+1)*6] for i in range(6)]
    return grid

def rotate_grid(grid, times):
    result = grid
    for _ in range(times):
        result = [list(reversed(col)) for col in zip(*result)]
    return result

def find_position(grid, char):
    for r in range(6):
        for c in range(6):
            if grid[r][c] == char:
                return r, c
    return -1, -1

def ascii_offsets(key):
    return [ord(c) % 6 for c in key.upper() if c in pool]

def encrypt_text(text, key):
    text = ''.join(filter(lambda c: c in pool, text.upper()))
    key = ''.join(filter(lambda c: c.isalpha(), key.upper()))

    if not text or not key:
        return "❌ Please enter valid plaintext and key."

    if len(text) % 2 != 0:
        text += "X"

    grid = generate_grid(key)
    offsets = ascii_offsets(key)

    result = ""

    for i in range(0, len(text), 2):
        pair = [text[i], text[i+1]]
        rotation = (i // 2) % 4
        offset = offsets[(i // 2) % len(offsets)]
        rotated = rotate_grid(grid, rotation)

        for ch in pair:
            r, c = find_position(rotated, ch)
            rOffset = (r + offset) % 6
            cOffset = (c + offset) % 6
            result += rotated[cOffset][rOffset]  # swapped

    return f"🔐 Encrypted: {result}"

def decrypt_text(text, key):
    text = ''.join(filter(lambda c: c in pool, text.upper()))
    key = ''.join(filter(lambda c: c.isalpha(), key.upper()))

    if not text or not key or len(text) % 2 != 0:
        return "❌ Please enter a valid even-length ciphertext and key."

    grid = generate_grid(key)
    offsets = ascii_offsets(key)

    result = ""

    for i in range(0, len(text), 2):
        pair = [text[i], text[i+1]]
        rotation = (i // 2) % 4
        offset = offsets[(i // 2) % len(offsets)]
        rotated = rotate_grid(grid, rotation)

        for ch in pair:
            r, c = find_position(rotated, ch)
            rOrig = (c - offset + 6) % 6  # reversed swap
            cOrig = (r - offset + 6) % 6
            result += rotated[rOrig][cOrig]

    return f"🔓 Decrypted: {result}"

# ---------------- Streamlit UI ---------------- #

st.set_page_config(page_title="Enhanced RGMC Cipher", layout="centered")

st.title("✠ Enhanced Rotating Grid Modular Cipher (E-RGMC)")

option = st.selectbox("Select Action", ["Encrypt", "Decrypt"])
text_input = st.text_area("🔤 Enter your text (Plaintext or Ciphertext):")
key_input = st.text_input("🔑 Enter your key (Uppercase letters only):")

if st.button("🔍 Run Cipher"):
    if option == "Encrypt":
        result = encrypt_text(text_input, key_input)
    else:
        result = decrypt_text(text_input, key_input)

    st.markdown("---")
    st.success(result)

if st.button("🧹 Clear"):
    st.experimental_rerun()
