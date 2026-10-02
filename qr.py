import qrcode


def generate_qr(url: str, file_name: str = "qr_code.png") -> None:
    """Generate a QR code image for a given URL."""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(file_name)
    print(f"QR code saved as {file_name}")


if __name__ == "__main__":
    link = "https://kiranjitkaur0707.github.io/Bdyy/"
    generate_qr(link, "qr_code.png")
