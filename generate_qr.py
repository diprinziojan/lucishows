import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.colormasks import SolidFillColorMask

qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=20, border=2)
qr.add_data("https://lucishows.com/es/proposal")
qr.make(fit=True)

img = qr.make_image(
    image_factory=StyledPilImage,
    color_mask=SolidFillColorMask(back_color=(255, 255, 255), front_color=(26, 26, 26)),
)
img.save("proposal_qr.png")
print("QR generado: proposal_qr.png")
