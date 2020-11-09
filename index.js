const genOnePokedex = async ( name ) => {
    let res;
    let uniquePkm;
    try {
        res = await fetch( `https://pokeapi.co/api/v2/pokemon/${ name }/` );
        uniquePkm = await res.json();
        console.log( uniquePkm );
    }
    catch ( e ) {
        throw ( e );
    }

    let div = document.createElement( 'div' );
    let img = document.createElement( 'img' );
    let h3 = document.createElement( 'h3' );
    img.src = uniquePkm.sprites.other.dream_world.front_default;
    h3.innerText = name;

    let container = document.querySelector( '.container' );
    container.appendChild( div );
    div.appendChild( img );
    div.appendChild( h3 );
    div.classList.add( 'border' );
}


const genOne = async () => {
    try {
        let res = await fetch( `https://pokeapi.co/api/v2/pokemon?limit=151` );
        let pokemon = await res.json();
        pokemon.results.forEach( p => {
            genOnePokedex( p.name )
        } )
    }
    catch ( e ) {
        console.log( e )
    }
}

genOne();