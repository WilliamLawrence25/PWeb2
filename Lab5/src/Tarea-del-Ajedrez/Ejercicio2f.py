from interpreter import draw
from chessPictures import *

type1 = (square.join(square.negative()).horizontalRepeat(4))
type2 = (square.negative().join(square).horizontalRepeat(4))
total = type1.up(type2).verticalRepeat(2)

draw (total)