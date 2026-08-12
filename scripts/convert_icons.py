from pathlib import Path
import sys
try:
    import cairosvg
except Exception as e:
    print('cairosvg not installed')
    raise

svg_path = Path('icons/dartboard.svg')
if not svg_path.exists():
    print('SVG not found:', svg_path)
    sys.exit(1)

out192 = Path('icons/dartboard-192.png')
out512 = Path('icons/dartboard-512.png')

print('Converting', svg_path, '->', out192, out512)

cairosvg.svg2png(url=str(svg_path), write_to=str(out192), output_width=192, output_height=192)
cairosvg.svg2png(url=str(svg_path), write_to=str(out512), output_width=512, output_height=512)

print('Done')
