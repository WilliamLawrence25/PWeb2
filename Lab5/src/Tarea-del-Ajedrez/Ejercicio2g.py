from interpreter import draw
from chessPictures import *

type1 = (square.join(square.negative()).horizontalRepeat(4))
type2 = (square.negative().join(square).horizontalRepeat(4))

chess1s = type2.under(rock.join(knight).join(bishop).join(queen).join(king).join(bishop).join(knight).join(rock)).negative()
chess2s = type1.under(pawn.horizontalRepeat(8)).negative()

table = chess1s.up(chess2s.up(type1.up(type2).verticalRepeat(2))).up(chess2s.negative()).up(chess1s.negative())

draw (table)