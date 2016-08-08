Game.Map = {
  // p = point
  // g = grass
  // x = occupied space
  // bl = blue tree
  // gr = green tree
  // na = naked tree
  // or = orange tree
  // 0 = empty space
  // 1 = cheese
  easy: [
    ['p','p','p','g','g','g','p','p',0,0,'g','g',0,0,0,0,'p','p','bl','x','p','gr','x','p','p'],
    [0,0,0,0,'p','g',0,0,0,0,0,0,0,0,0,0,'p','p','x','x','p','x','x',0,'p'],
    ['g',0,0,0,0,0,1,1,1,0,'g',0,0,1,0,'bl','x','bl','x',0,0,1,0,0,0],
    [0,'g',0,1,1,1,0,0,0,0,'g','g',0,1,0,'x','x','x','x',1,1,1,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,'g','g',0,1,1,0,0,1,0,0,0,0,'g','or','x'],
    [0,0,1,0,'gr','x',0,0,0,0,'g','g',0,0,0,0,'na','na',0,'g',0,0,'g','x','x'],
    ['p',0,'g','g','x','x','or','x',0,0,0,'g','g',0,0,0,'x','x',0,'gr','x',0,0,0,'g'],
    ['p','g',0,0,0,0,'x','x','or','x',0,0,0,'g',0,0,0,0,0,'x','x','gr','x',0,'g'],
    ['p',0,0,1,0,0,0,0,'x','x',0,0,0,0,0,0,0,0,0,0,'g','x','x',0,'g'],
    ['g',0,0,0,'gr','x',0,0,0,0,0,1,0,0,'na',0,0,1,1,1,0,0,0,0,'g'],
    ['bl','x',0,'g','x','x',1,0,0,0,1,1,1,0,'x',0,0,0,1,0,0,0,0,0,'g'],
    ['x','x',0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,'g',0,0,0,'gr','x'],
    [0,0,0,'g',1,0,0,0,0,0,1,0,0,'bl','x',0,'g',0,0,0,0,1,0,'x','x'],
    [0,0,0,'g',0,0,'bl','x','p','p',0,0,0,'x','x',0,0,'g','g',0,0,0,0,'p','p'],
    ['g','p','p','p',0,0,'x','x','g','g','g',0,0,'p','p','p','p','g','g','g','g','p','p','p','p']
  ],
  expert: {},
  hard: {}

}