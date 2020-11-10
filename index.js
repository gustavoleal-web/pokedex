const genOnePokedex = async ( name ) => {
    let res;
    let uniquePkm;
    try {
        res = await fetch( `https://pokeapi.co/api/v2/pokemon/${ name }/` );
        uniquePkm = await res.json();
    }
    catch ( e ) {
        throw ( e );
    }


    let div = document.createElement( 'div' );
    let img = document.createElement( 'img' );
    let h3 = document.createElement( 'h3' );
    let container = document.querySelector( '.container' );
    let p = document.createElement( 'p' );

    let pokTypes = uniquePkm.types;


    for ( let i = 0; i < pokTypes.length; i++ ) {
        p.innerText += `${ pokTypes[ i ].type.name } `;
    }

    img.src = uniquePkm.sprites.other.dream_world.front_default;
    h3.innerText = name;

    container.appendChild( div );
    div.appendChild( img );
    div.appendChild( h3 );
    div.appendChild( p );
    div.classList.add( 'border' );



    // const pokemonInfo = () => {

    //     div.addEventListener( 'click', ( e ) => {
    //         console.log(uniquePkm.moves)
    //     } );
    // }

    // pokemonInfo();
}

const genOne = async () => {
    try {
        let res = await fetch( `https://pokeapi.co/api/v2/pokedex/kanto` );
        let pokemon = await res.json();

        pokemon.pokemon_entries.forEach( p => {
            genOnePokedex( p.entry_number )
        } )
    }
    catch ( e ) {
        console.log( e )
    }

}

genOne()

const getOtherGens = async ( generation ) => {
    try {
        let res = await fetch( `https://pokeapi.co/api/v2/pokedex/${ generation }` );
        let pokemon = await res.json();
        pokemon.pokemon_entries.forEach( p => {
            //Pokemon does not have data over this pokemon
            if ( p.pokemon_species.name === 'deoxys' ) {
                return;
            }
            genOnePokedex( p.pokemon_species.name )
        } )
    }
    catch ( e ) {
        console.log( e )
    }

}

const events = ( e ) => {
    let container = document.querySelector( '.container' );
    while ( container.firstChild ) {
        container.removeChild( container.lastChild );
    }
    getOtherGens( e.target.value );
    console.log( e.target.value )
}

let hoenn = document.querySelector( '.hoenn' );
hoenn.addEventListener( 'click', ( e ) => {
    events( e );
} )

let johto = document.querySelector( '.updated-johto' );
johto.addEventListener( 'click', ( e ) => {
    events( e );
} )
