from colors import *

class Picture:

  def __init__(self, img):
    self.img = img;

  def __eq__(self, other):
    return self.img == other.img

  def _invColor(self, color):
    if color not in inverter:
      return color
    return inverter[color]

  def verticalMirror(self):
    """ Devuelve el espejo vertical de la imagen """
    vertical = []
    vertical = [line[::-1] for line in self.img]
    return Picture(vertical)

  def horizontalMirror(self):
    """ Devuelve el espejo horizontal de la imagen """
    horizontal = self.img[::-1]
    return Picture(horizontal)

  def negative(self):
    """ Devuelve un negativo de la imagen """
    negative = [''.join(self._invColor(char) for char in line) for line in self.img]
    return Picture(negative)

  def join(self, p):
    """ Devuelve una nueva figura poniendo la figura del argumento 
        al lado derecho de la figura actual """
    join_img = [self_line + p_line for self_line, p_line in zip(self.img, p.img)]
    return Picture(join_img)

  def up(self, p):
    return Picture(self.img + p.img)

  def under(self, p):
    """ Devuelve una nueva figura poniendo la figura p sobre la
        figura actual """
    max_height = max(len(self.img), len(p.img))
    max_width = max(max(len(line) for line in self.img), max(len(line) for line in p.img))

    new_img_self = [line.ljust(max_width) for line in self.img] + [' ' * max_width] * (max_height - len(self.img))
    new_img_p = [line.ljust(max_width) for line in p.img] + [' ' * max_width] * (max_height - len(p.img))

    combined_img = []
    for line_self, line_p in zip(new_img_self, new_img_p):
        combined_line = ''.join(char_p if char_p != ' ' else char_self for char_self, char_p in zip(line_self, line_p))
        combined_img.append(combined_line)

    return Picture(combined_img)
  
  def horizontalRepeat(self, n):
    """ Devuelve una nueva figura repitiendo la figura actual al costado
        la cantidad de veces que indique el valor de n """
    repeat_img = [line * n for line in self.img]
    return Picture(repeat_img)

  def verticalRepeat(self, n):
    repeat_img = self.img * n
    return Picture(repeat_img)

  def rotate(self):
    """Devuelve una figura rotada en 90 grados, puede ser en sentido horario
    o antihorario"""
    rotated = [''.join(row) for row in zip(*self.img)]
    rotated = rotated[::-1]
    return Picture(rotated)

