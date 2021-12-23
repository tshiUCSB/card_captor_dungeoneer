import { chakra } from "@chakra-ui/react";

export default function Barcode(props) {
    // var BARCODE_DIV = document.getElementById( "barcode-div" );

    function generate_code(idx, ranges) {
        let i = 0;
        while(i < ranges.length && idx >= ranges[i]) {
            i++;
        }
        let encode_idx = idx;
        if (idx < 11) {
            encode_idx = idx - 1;
        }
        else if (idx < 37) {
            encode_idx = String.fromCharCode(idx - 10 + 96);
        }
        else if (idx < 61) {
            encode_idx = String.fromCharCode(idx - 36 + 64);
        }
        else {
            encode_idx = "";
            console.log("INVALID card idx for barcode");
        }

        console.log(`a${i - 1}0${encode_idx}0000`);
        return `a${i - 1}0${encode_idx}0000`;
    }

    var spacing = [2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1,1,2,1,2,2,3,1,2,1,3,2,2,1,3,1,2,2,2,1,2,2,2,1,3,1,2,2,3,1,2,1,3,2,2,1,2,2,2,1,2,1,3,2,2,1,3,1,2,2,3,1,2,1,2,1,1,2,2,3,2,1,2,2,1,3,2,1,2,2,2,3,1,1,1,3,2,2,2,1,2,3,1,2,2,1,2,3,2,2,1,2,2,3,2,1,1,2,2,1,1,3,2,2,2,1,2,3,1,2,1,3,2,1,2,2,2,3,1,1,2,3,1,2,1,3,1,3,1,1,2,2,2,3,2,1,1,2,2,3,2,1,2,2,1,3,1,2,2,1,2,3,2,2,1,1,2,3,2,2,2,1,1,2,1,2,1,2,3,2,1,2,3,2,1,2,3,2,1,2,1,1,1,1,3,2,3,1,3,1,1,2,3,1,3,1,3,2,1,1,1,2,3,1,3,1,3,2,1,1,3,1,3,2,3,1,1,2,1,1,3,1,3,2,3,1,1,1,3,2,3,1,3,1,1,1,1,2,1,3,3,1,1,2,3,3,1,1,3,2,1,3,1,1,1,3,1,2,3,1,1,3,3,2,1,1,3,3,1,2,1,3,1,3,1,2,1,2,1,1,3,3,1,2,3,1,1,3,1,2,1,3,1,1,3,2,1,3,3,1,1,2,1,3,1,3,1,3,1,1,1,2,3,3,1,1,3,2,1,3,3,1,1,2,1,3,1,2,1,1,3,3,1,2,3,1,1,3,3,2,1,1,1,3,1,4,1,1,1,2,2,1,4,1,1,4,3,1,1,1,1,1,1,1,2,2,4,1,1,1,4,2,2,1,2,1,1,2,4,1,2,1,4,2,1,1,4,1,1,2,2,1,4,1,2,2,1,1,1,2,2,1,4,1,1,2,4,1,2,1,2,2,1,1,4,1,2,2,4,1,1,1,4,2,1,1,2,1,4,2,2,1,1,2,4,1,2,1,1,2,2,1,1,1,4,4,1,3,1,1,1,2,4,1,1,1,2,1,3,4,1,1,1,1,1,1,2,4,2,1,2,1,1,4,2,1,2,1,2,4,1,1,1,4,2,1,2,1,2,4,1,1,2,1,2,4,2,1,1,4,1,1,2,1,2,4,2,1,1,1,2,4,2,1,2,1,1,2,1,2,1,4,1,2,1,4,1,2,1,4,1,2,1,2,1,1,1,1,1,4,3,1,1,1,3,4,1,1,3,1,1,4,1,1,1,4,1,1,3,1,1,4,3,1,1,4,1,1,1,1,3,4,1,1,3,1,1,1,1,3,1,4,1,1,1,4,1,3,1,3,1,1,1,4,1,4,1,1,1,3,1];
    // var SABREWING = "a20D0000";
    var SABREWING = generate_code(props.card_idx, props.ranges);

    // var savage = document.createElementNS( "http://www.w3.org/2000/svg", "svg" );

    var cc;
    var width = 11;
    var total = 104;

    // var g = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
    // g.setAttribute( "style", "fill:#000000;" );

    function create_bar( x, w ) {
        // var wrekt = document.createElementNS( "http://www.w3.org/2000/svg", "rect" );
        // wrekt.setAttribute( "x", x.toString() );
        // wrekt.setAttribute( "y", "0" );
        // wrekt.setAttribute( "width", w.toString() );
        // wrekt.setAttribute( "height", "12" );
        // return wrekt;
        return (
            <rect x={x} y ={0} width={w} height={12} key={`module-${x}`} />
        )
    }

    function append_symbol( gc, w, i ) {
        gc.push( create_bar( w, spacing[i] ) );
        gc.push( create_bar( ( w += spacing[i] + spacing[i + 1] ), spacing[i + 2] ) );
        gc.push( create_bar( ( w += spacing[i + 2] + spacing[i + 3] ), spacing[i + 4] ) );
        return w + spacing[i + 4] + spacing[i + 5];
    }

    // g.appendChild( create_bar( 0, 2 ) );
    // g.appendChild( create_bar( 3, 1 ) );
    // g.appendChild( create_bar( 6, 1 ) );

    // for( var i = 0; i < SABREWING.length; ++i ) {
    //     cc = SABREWING.charCodeAt( i ) - 32;
    //     total += ( i + 1 ) * cc;
    //     width = append_symbol( g, width, cc * 6 );
    // }

    // width = append_symbol( g, width, ( total % 103 ) * 6 );

    // console.log("v1.9")

    // g.appendChild( create_bar( width, 2 ) );
    // g.appendChild( create_bar( ( width += 5 ), 3 ) );
    // g.appendChild( create_bar( ( width += 4 ), 1 ) );
    // g.appendChild( create_bar( ( width += 2 ), 2 ) );
    // width += 2;

    // g.setAttribute( "transform", "translate(13, 0)" )

    let bars = []

    // start symbol
    bars.push( create_bar( 0, 2 ) );
    bars.push( create_bar( 3, 1 ) );
    bars.push( create_bar( 6, 1 ) );

    // encoded data
    for(let i = 0; i < SABREWING.length; ++i) {
        cc = SABREWING.charCodeAt( i ) - 32;
        total += ( i + 1 ) * cc;
        width = append_symbol( bars, width, cc * 6 );
    }

    // checksum
    width = append_symbol( bars, width, ( total % 103 ) * 6 );

    // close symbol
    bars.push( create_bar( width, 2 ) );
    bars.push( create_bar( ( width += 5 ), 3 ) );
    bars.push( create_bar( ( width += 4 ), 1 ) );
    bars.push( create_bar( ( width += 2 ), 2 ) );
    width += 2;

    // savage.setAttribute( "height", "96px" );
    // savage.setAttribute( "x", "0px" );
    // savage.setAttribute( "y", "0px" );
    // savage.setAttribute( "viewBox", "0 0 150 12" );
    // savage.setAttribute( "xmlns", "http://www.w3.org/2000/svg" );
    // savage.setAttribute( "version", "1.1" );
    // savage.setAttribute( "style", "background:white" );

    // savage.appendChild( g );

    // BARCODE_DIV.appendChild( savage );

    return (
        <chakra.svg 
            xmlns="http://www.w3.org/2000/svg" 
            version="1.1" viewBox="0 0 150 12" 
            width="100%" 
            height="96px" 
            x="0px" 
            y="0px" 
            bg="#ffffff"
            transform="translateX(7%)"
        >
            <g fill="#000000">
                {bars}
            </g>
        </chakra.svg>
    );
}