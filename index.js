const colorTypes = ( typeOne, typeTwo ) => {
    const type1 = typeOne.innerText.trim();
    typeOne.classList.add( type1 )

    //not all pokemons have 2 types so it's only created if it exists
    if ( typeTwo.innerText ) {
        const type2 = typeTwo.innerText.trim()
        typeTwo.classList.add( type2 )
    }


}

const getAbilities = ( div, img, uniquePkm ) => {
    const { abilities } = uniquePkm;
    const abilitiesTitle = document.createElement( 'h4' );
    const basicAbility = document.createElement( 'p' );
    const hiddenAbility = document.createElement( 'p' );

    abilitiesTitle.textContent = 'Abilities';
    div.appendChild( abilitiesTitle );

    img.addEventListener( 'click', ( e ) => {
        //so duplicate abilities aren't added to the div every time the div is clicked
        if ( basicAbility.textContent === '' ) {
            for ( let i = 0; i < abilities.length; i++ ) {
                if ( abilities[ i ].is_hidden ) {
                    hiddenAbility.textContent = `Hidden: ${ abilities[ i ].ability.name }`;
                }

                if ( !abilities[ i ].is_hidden ) {
                    basicAbility.textContent = ` ${ abilities[ i ].ability.name }`;
                }

            }
        }
        div.appendChild( basicAbility );
        div.appendChild( hiddenAbility );
    } )
}


const getPokedex = async ( name = 'charmander' ) => {
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
    let typeOne = document.createElement( 'p' );
    let typeTwo = document.createElement( 'p' );
    let pokTypes = uniquePkm.types;

    //A pokemon has at most 2 types
    if ( pokTypes.length === 2 ) {
        typeOne.innerText = `${ pokTypes[ 0 ].type.name } `;
        typeTwo.innerText = `${ pokTypes[ 1 ].type.name } `;
    } else {
        typeOne.innerText = `${ pokTypes[ 0 ].type.name } `;
    }

    colorTypes( typeOne, typeTwo );

    img.src = uniquePkm.sprites.other.dream_world.front_default;
    h3.innerText = name;

    container.appendChild( div );
    div.appendChild( img );
    div.appendChild( h3 );
    div.appendChild( typeOne );
    div.appendChild( typeTwo );
    div.classList.add( 'border' );

    getAbilities( div, img, uniquePkm )

}


const getOtherGens = async ( generation ) => {
    try {
        let res = await fetch( `https://pokeapi.co/api/v2/pokedex/${ generation }` );
        let pokemon = await res.json();
        pokemon.pokemon_entries.forEach( p => {
            //Pokemon API does not have data about this pokemon
            if ( p.pokemon_species.name === 'deoxys' ) {
                return;
            }
            getPokedex( p.pokemon_species.name )
        } )
    }
    catch ( e ) {
        console.log( e )
    }

}

getPokedex()

//getOtherGens( 'kanto' );

const events = ( e ) => {
    let container = document.querySelector( '.container' );
    while ( container.firstChild ) {
        container.removeChild( container.lastChild );
    }
    getOtherGens( e.target.value );
}

const kanto = document.querySelector( '.kanto' );
kanto.addEventListener( 'click', ( e ) => events( e ) );

const hoenn = document.querySelector( '.hoenn' );
hoenn.addEventListener( 'click', ( e ) => events( e ) );

const johto = document.querySelector( '.updated-johto' );
johto.addEventListener( 'click', ( e ) => events( e ) );

