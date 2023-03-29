KarelView={getCornerX:function(a,b){return a.getWorldLeft()+b*a.getCornerSize()},getCornerY:function(a,b){return a.getWorldTop()+b*a.getCornerSize()},getImage:function(a){switch(a.getDirection()){case Const.KAREL_NORTH:return karelImages.karelNorth;case Const.KAREL_SOUTH:return karelImages.karelSouth;case Const.KAREL_EAST:return karelImages.karelEast;case Const.KAREL_WEST:return karelImages.karelWest}return null},getTinyImage:function(a){switch(a.getDirection()){case Const.KAREL_NORTH:return karelImages.karelNorthTiny;
case Const.KAREL_SOUTH:return karelImages.karelSouthTiny;case Const.KAREL_EAST:return karelImages.karelEastTiny;case Const.KAREL_WEST:return karelImages.karelWestTiny}return null},getSmallImage:function(a){switch(a.getDirection()){case Const.KAREL_NORTH:return karelImages.karelNorthSmall;case Const.KAREL_SOUTH:return karelImages.karelSouthSmall;case Const.KAREL_EAST:return karelImages.karelEastSmall;case Const.KAREL_WEST:return karelImages.karelWestSmall}return null},getKarelImage:function(a,b){return a<=
Const.KAREL_TINY_SIZE?KarelView.getTinyImage(b):a<=Const.KAREL_SMALL_SIZE?KarelView.getSmallImage(b):KarelView.getImage(b)},drawKarel:function(a,b,c){var f=a.getCornerSize(),e=KarelView.getKarelImage(f,b);"undefined"!=typeof e&&null!=e||alert("karel image loading fail!");var d=KarelView.getCornerX(a,b.getKarelCol());a=KarelView.getCornerY(a,b.getKarelRow());c.drawImage(e,d+1,a+1,f-2,f-2)},drawBorder:function(a,b){var c=a.getWorldLeft()-Const.BORDER_SIZE,f=a.getWorldTop()-Const.BORDER_SIZE,e=a.getWorldWidth()+
2*Const.BORDER_SIZE,d=a.getWorldHeight()+2*Const.BORDER_SIZE;b.fillStyle="#000";b.fillRect(c,f,e,d);b.fillStyle="#fff";b.fillRect(a.getWorldLeft(),a.getWorldTop(),a.getWorldWidth(),a.getWorldHeight())},getBeeperSize:function(a){return a.getCornerSize()*Const.BEEPER_SIZE_FRACTION},drawBeepers:function(a,b,c){var f=KarelView.getBeeperSize(a),e=a.getCornerSize();c.fillStyle="#000";c.font="bold 14px courier";c.textAlign="center";c.textBaseline="middle";for(var d=0;d<b.getNumRows();d++)for(var g=0;g<b.getNumCols();g++){var k=
KarelView.getCornerX(a,g)+e/2,l=KarelView.getCornerY(a,d)+e/2,h=b.getNumBeepers(d,g);if(0<h){var m="";1<h&&(m=h);KarelView.drawBeeper(c,k,l,f,m)}}},getFontSize:function(a){a=Math.round(a*Const.BEEPER_SIZE_FRACTION*Const.BEEPER_LABEL_FRACTION);return a=Math.min(a,Const.BEEPER_LABEL_MAX_SIZE)},drawBeeper:function(a,b,c,f,e){let d=f*Const.BEEPER_SIZE_FRACTION;f=KarelView.getFontSize(f);a.save();a.fillStyle=Const.BEEPER_FILL_COLOR;a.beginPath();a.lineWidth=2;a.moveTo(b-d/2,c);a.lineTo(b,c+d/2);a.lineTo(b+
d/2,c);a.lineTo(b,c-d/2);a.lineTo(b-d/2,c);a.fill();a.stroke();a.restore();a.save();f&&e&&(a.fillStyle="black",a.font=f+"pt "+Const.BEEPER_LABEL_FONT,a.fillText(e,b,c+f*Const.BEEPER_LABEL_DY));a.restore()},drawCorners:function(a,b,c){for(var f=a.getCornerSize()*Const.CROSS_FRACTION,e=a.getCornerSize(),d=0;d<b.getNumRows();d++)for(var g=0;g<b.getNumCols();g++){var k=KarelView.getCornerX(a,g),l=KarelView.getCornerY(a,d),h=b.getSquareColor(d,g);null!=h?(c.fillStyle=h,c.fillRect(k,l,e,e)):(h=Const.CROSS_WIDTH_FRAC*
f,h=Math.max(1,h),c.fillStyle=Const.CROSS_COLOR,c.fillRect(k+(e-f)/2,l+(e-h)/2,f,h),c.fillRect(k+(e-h)/2,l+(e-f)/2,h,f))}},drawRowColNums:function(a,b,c){let f=a.getCornerSize(),e=KarelView.getFontSize(f);c.fillStyle="black";c.font=e+"pt "+Const.BEEPER_LABEL_FONT;var d=b.getNumRows();b=b.getNumCols();let g=a.getWorldLeft(),k=a.getWorldTop();for(var l=0;l<d;l++)c.fillText(d-l,e/2,k+f*(l+.5)+.1*e);a=a.getWorldHeight();for(d=0;d<b;d++)c.fillText(d+1,g+f*(d+.5),k+a+e)},drawBackground:function(a,b,c){"undefined"!=
typeof karelImages.cross&&null!=karelImages.cross||alert("image loading fail!");KarelView.drawBorder(a,c);KarelView.drawCorners(a,b,c);KarelView.drawBeepers(a,b,c);KarelView.drawRowColNums(a,b,c)},drawWalls:function(a,b,c){var f=a.getCornerSize();c.fillStyle="#000";for(var e=0;e<b.getNumRows();e++)for(var d=0;d<b.getNumCols();d++){if(b.hasTopWall(e,d)){var g=KarelView.getCornerX(a,d)-2.5,k=KarelView.getCornerY(a,e)-2.5;c.fillRect(g,k,f+5,5)}b.hasRightWall(e,d)&&(g=KarelView.getCornerX(a,d+1)-2.5,
k=KarelView.getCornerY(a,e)-2.5,c.fillRect(g,k,5,f+5))}},draw:function(a,b,c){KarelView.drawBackground(a,b,c);KarelView.drawKarel(a,b,c);KarelView.drawWalls(a,b,c)}};
