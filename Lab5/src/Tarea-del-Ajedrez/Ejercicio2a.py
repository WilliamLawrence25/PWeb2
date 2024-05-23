from interpreter import draw
from chessPictures import *

fila1 = knight.join(knight.negative())
fila2 = fila1.negative()
todo = fila1.under(fila2)
draw (todo)