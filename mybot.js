function new_game() {
}

function make_move() {
    var board = get_board();
    if (has_item(board[get_my_x()][get_my_y()])) {
	return TAKE;
    }
    var directiontogo = PASS;
    var maxdiff = 100;
    fourdirections = [[0, 1, SOUTH], [0, -1, NORTH], [1, 0, EAST], [-1, 0, WEST]];
    fruits = [1,2,3,4];
    var mostneeded = new Array;
    var oneaway = false;
    for (fruit in fruits) {
	if (get_opponent_item_count(fruits[fruit]) - get_my_item_count(fruits[fruit]) == 1) {
	    if (oneaway) {
		mostneeded.push(fruits[fruit]);
	    } else {
		mostneeded = new Array;
		mostneeded[0] = fruits[fruit];
		oneaway = true;
	    }
	} else {
	    if (oneaway) {
		continue;
	    } else {
		if (get_opponent_item_count(fruits[fruit]) - get_my_item_count(fruits[fruit]) < maxdiff) {
		    maxdiff = get_opponent_item_count(fruits[fruit]) - get_my_item_count(fruits[fruit]);
		    mostneeded[0] = fruits[fruit];
		} else if (get_opponent_item_count(fruits[fruit]) - get_my_item_count(fruits[fruit] == maxdiff)) {
		    mostneeded.push(fruits[fruit]);
		}
	    }
	}
    }


    if (directiontogo > 5) {
	var j=0;
	var i=0;
	var closestonx = 16;
	var associatedy = 0;
	var closestony = 16;
	var associatedx = 0;
	var closestfruit = PASS;
	for (i=0;i<WIDTH;i++) {
	    for (j=0;j<HEIGHT;j++) {
		if (has_item(board[i][j])) {
		    if (Math.abs(closestonx) >= Math.abs(get_my_x() - i)) {
			var change = true;
			if (closestonx != 16)
			    for (needed in mostneeded) {
				if (board[closestonx+get_my_x()][associatedy+get_my_y()] == mostneeded[needed]) {
				    change = false;
				    if (board[i][j] == mostneeded[needed]) {
					change = true;
				    }
				}
			    }
			if (change) {
			    closestonx = i - get_my_x();
			    associatedy = j - get_my_y();
			}
		    }
		    if (Math.abs(closestony) >= Math.abs(get_my_y() - j)) {
			var change = true;
			if (closestony != 16)
			    for (needed in mostneeded) {
				if (board[associatedx+get_my_x()][closestony+get_my_y()] == mostneeded[needed]) {
				    change = false;
				    if (board[i][j] == mostneeded[needed]) {
					change = true;
				    }
				}
			    }
			if (change) {
			    closestony = j - get_my_y();
			    associatedx = i - get_my_x();
			}
		    }
		}
	    }
	}
	if ((Math.abs(closestonx)+Math.abs(associatedy)) < (Math.abs(closestony)+Math.abs(associatedx))) {
	    if (closestonx == 0) {
		if (associatedy < 0) {
		    return NORTH;
		} else {
		    return SOUTH;
		}
	    } else if (closestonx < 0) {
		trace("chose x " + closestonx);
		return WEST;
	    } else {
		trace("chose x " + closestonx);
		return EAST;
	    }
	} else {
	    if (closestony == 0) {
		if (associatedx < 0) {
		    return WEST;
		} else {
		    return EAST;
		}
	    } else if (closestony < 0) {
		trace("chose y " + closestony);
		return NORTH;
	    } else {
		trace("chose y " + closestony);
		return SOUTH;
	    }
	}
    } else {
	return directiontogo;
    }

   return PASS;
}
