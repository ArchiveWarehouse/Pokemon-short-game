$(function(){

    $("button").on("click",function(){

        let getno = $(".no").val();

        console.log(getno);

        let pokeurl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + getno + ".png";

        $(".op_pokefront").attr("src",pokeurl);
        

        let pokeurl_back = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" + getno + ".png"; 
        $(".op_pokeback").attr("src",pokeurl_back);
    });

    // Math.random(); 0.00000001-0.99999999999

    // Math.random()*10; 0.00000001-9.9999999999
    // Math.random()*1000; 0.00001-999.99999999

    // Math.floor();

    let random_num01 = Math.floor(Math.random()*(12+1-7)+7);

    //let random_num01 = Math.floor(Math.random()*899);
    let all_pokeurl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + random_num01 + ".png";
    $(".area-a img").attr("src", all_pokeurl);
    console.log(random_num01);

    let random_num02 = Math.floor(Math.random()*899);
    let all_pokeurl02 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + random_num02 + ".png";
    $(".area-b img").attr("src", all_pokeurl02);


    // let denki = ["25","26","100","125","135"];
    let electrical = [
        "81",//magnemite
        "82",//Magneton
        "145",//Zapdos
        "462",//Magnezone
        "479",//Rotom
        "587",//Emolga
        "642",//Thundurus
        "694",//Helioptile
        "695",//Heliolisk
        "702",//Dedenne
        "741",//Oricorio
        "777",//Togedemaru
        "785",//Tapu koko
        "845",//toxel
        "849",//Amped form Toxtricity
        "877",//Morpeko
        "880",//Dracozolt
        "881"//Arctozolt
    ];

    let electrical_poke = electrical[Math.floor(Math.random() * (electrical.length))]
    let electrical_pokeurl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + electrical_poke + ".png";
    $(".area-c img").attr("src", electrical_pokeurl);

    $(".area-a").click(function(){
        location.href="buttle.html?pokeno="+random_num01;
    });
    $(".area-b").click(function(){
        location.href="buttle.html?pokeno="+random_num02;
    });
    $(".area-c").click(function(){
        location.href="buttle.html?pokeno="+electrical_poke;
    });

    let url = new URL(window.location.href);
    let params = url.searchParams;
    let pokeno = params.get('pokeno');
    console.log(pokeno); 

    let buttlepoke_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokeno + ".png";
    $(".enemypoke").attr("src", buttlepoke_url);

    let life = 100;//Life gauge

    let afterLife = (damageamount) =>{
        life = life + damageamount;
        $(".life-frame").css("width",life +"%");
        if(life<=0){
            location.href="end.html?pokeno="+pokeno;
        };
    };

    $(".left-panel").click(function(){
        afterLife(-12);
        $(".enemyshape").addClass("damage");
        setTimeout(function(){
            $(".enemyshape").removeClass("damage");
        },200);
    });
    
    $(".right-panel").click(function(){
        afterLife(-5);
        $(".enemyshape").addClass("damage");
        setTimeout(function(){
            $(".enemyshape").removeClass("damage");
        },200);
    });
    
    //end.html
    $(".end-poke").attr("src", buttlepoke_url);

    let pokeAPI = $.ajax({
        url : "https://pokeapi.co/api/v2/pokemon/"+pokeno,
        type : "GET",
        dataType : "json",
        data: {
            language: 'en', // Specify English language
        }
    });
    
    console.log(pokeAPI);
    let nameget = () =>{
        let pokespeciesAPI = $.ajax({
        url : pokeAPI.responseJSON.species.url,
        type : "GET"
        });
        let namein = () =>{
            $(".enemyname").html(pokespeciesAPI.responseJSON.names[0].name);
        };

        pokespeciesAPI.done(namein);
    };
    pokeAPI.done(nameget);

});
