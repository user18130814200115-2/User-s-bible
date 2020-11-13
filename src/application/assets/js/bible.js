var Texts = JSON.parse(TextsRaw);
var Chapter = 0;
var Verse = 0;
var input;
var Book = "Genesis";

function addScript( src ) {
  var s = document.createElement( 'script' );
  s.setAttribute( 'src', './assets/js/'+src+'.json' );
  document.body.appendChild( s );
}

document.addEventListener("DOMContentLoaded", function(){
	load();
	document.getElementById("verse").focus();
	document.getElementById("verse").value = "Genesis:1:1";
});

function load() {
	document.getElementById("content").innerHTML = Texts[Chapter][Verse];
}

function update() {
	var display = Verse+1;
	document.getElementById("verse").value = Book+":"+Chapter+1+":"+display;
}

document.onkeypress = function(e) {
	if (e.keyCode == 13) {
		input = document.getElementById("verse").value;
		Verse = input.split(":")[1]-1;
		Chapter = input.split(":")[2]-1;
		if ( Book != input.split(":")[0] ) {
			Book = input.split(":")[0]
			addScript(input.split(":")[0]);
			document.getElementById("content").innerHTML = "Loading..."
			setTimeout(() => {  Texts = JSON.parse(TextsRaw); load();}, 500);	
		}
		load();
	} else if (e.keyCode == 38) {
		if (confirm("Close Window?")) {
			close();
	  	}
	}else if (e.key == "SoftLeft") {
		if (Verse <= 0) {
			Chapter -= 1;
			Verse = 0;
		} else {
			Verse -= 1;
		}
		if (Chapter <= 0) {Chapter = 0;}
		load();
		update();
	} else if (e.key == "SoftRight") {
		Verse += 1;
		if (Texts[Chapter][Verse] == "END OF CHAPTER") {
			Chapter += 1;
			Verse = 0;
		}
		load();
		update();
	}
}
