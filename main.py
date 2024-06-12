import qrcode

# Dados que você deseja no QR Code
data = "https://seuwebsite.com/validar-diploma?id=123456"

# Geração do QR Code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(data)
qr.make(fit=True)

# Cria uma imagem do QR Code
img = qr.make_image(fill='black', back_color='white')
img.save("diploma_qrcode.png")
