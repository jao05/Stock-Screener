let orignalSearchComp; // global variable used to request comparable companies

function handleStartPage()
{
	// Listens to submit button
   $( '#searchForm' ).on( 'submit', function( event )
		{
			event.preventDefault(); // prevent default form submission behavior
			
      // store the term that the user enters into input search box
      let searchItem = $( event.currentTarget ).find( '#searchInput' ).val();	

			// Store the user's search term for later use in peer request
      orignalSearchComp = searchItem;

      // Calls makeRequest to interact with server
      makeRequest( searchItem );
		} );

   // Listens to "Purchase" button
   $( '.displayPage' ).on( 'click', '#purchaseBtn', function( event )
   {
      // call brokers function
      displayBrokers();
      $( '.peerPage' ).hide();
   } );

   
   // Listens to "New Search" button
   $( '.displayPage' ).on( 'click', '#newSearchBtn', function( event )
   {
      // Show search box again
      location.reload();
   } );
}


function makeRequest( searchItem )
{
   // Makes a request to the endpoint for data about the searched company 
   // Calls displayResultsPage() as callBack function
  $.getJSON( `https://api.iextrading.com/1.0/stock/${ searchItem }/book`, displayResultsPage )
  .fail( function( event )
    {
       $( '#errorMsg' ).show();
    } );
}


function displayResultsPage( data )
{
	// Hide startPage
   $( '.startPage' ).remove();

   // Calls renderResults(), passing response as parameter
   renderResults( data );   

   // Makes response visible by displaying the results page
   $( '.displayPage' ).show();

   addComparableComps();

}




function renderResults( results )
{
   // Calls createHtmlStrings()
   let result = createHtmlStrings( results );
   
   // Add HTML strings to the DOM
   $( '.displayPage' ).html( result );
}



function createHtmlStrings( htmlStringDataSource )
{
   // Creates the HTML strings needed to display results
   return `<p>${ htmlStringDataSource.quote.companyName }</p>
           <p>Ticker: ${ htmlStringDataSource.quote.symbol }</p>
           <p>Sector: ${ htmlStringDataSource.quote.sector }</p>
           <p>Price: $${ htmlStringDataSource.quote.latestPrice }</p>
           <div><button id="addCompBtn">Add Comps</button><button id="purchaseBtn">Purchase</button><button id="newSearchBtn">New Search</button></div>`;
}

function addComparableComps() //  identifier of parameter????...event delegation?
{
   // Listens for click on "Add Comparable Button"
   $( '#addCompBtn' ).on( 'click', function ( event )
   {
      $( '#addCompBtn' ).hide();
      

      // Calls makeComparablesRequest() to get comparables of orginal search company
      makeComparablesRequest( orignalSearchComp );
   });   
}


function makeComparablesRequest( originalCompany )
{
   // Make a request for the original company's comparable peer companies
   // Calls a callBack function that appends the appropriate comparable html to the display page
   $.getJSON( `https://api.iextrading.com/1.0/stock/${ originalCompany }/peers`, appendToDisplayPage );
}


function appendToDisplayPage( data )
{
   //Testing
   console.log( data );   

   // Use for loop to call createHtmlStringToAppendToDisplayPage() multiple times (length of the array), passing in comparable companies as parameters
   // I only want to handle at most three comparable companies...
   
   for( let comp = 0; comp < 3; comp++ )
   {
      createHtmlStringToAppendToDisplayPage( data[ comp ] );
   }     
}


function createHtmlStringToAppendToDisplayPage( comparable )
{
   makePeerRequest( comparable );
}


function makePeerRequest( comparable )
{
  $.getJSON( `https://api.iextrading.com/1.0/stock/${ comparable }/book`, displayPeerPage )
  .fail( function( event )
    {
       $( '#errorMsg' ).show();
    } );
}


function displayPeerPage( data )
{
   // Calls renderResults(), passing response as parameter
   renderPeerResults( data );   

   // Makes response visible by displaying the results page
   $( '.peerPage' ).show();   
}


function renderPeerResults( results )
{
   // Calls createHtmlStrings()
   let result = createPeerHtmlStrings( results );
   
   // Add HTML strings to the DOM
   $( '.peerPage' ).append( result );
}


function createPeerHtmlStrings( peerDataSource ) 
{
  // Creates the HTML strings needed to display results
   return `<p>${ peerDataSource.quote.companyName }</p>
           <p>Ticker: ${ peerDataSource.quote.symbol }</p>
           <p>Sector: ${ peerDataSource.quote.sector }</p>
           <p>Price: $${ peerDataSource.quote.latestPrice }</p>`
}




function displayBrokers()
{
  // Output: "Visit one of these sites to place your order"
  // Provide linked photos of at least 3 brokers
  $( '.displayPage' ).html( '<p><h3>Visit one of these sites to place your order.</h3></p>' +
    '<div class="brokerLogos"><a href="https://us.etrade.com/home" target="_blank"><img src="http://pennystockreview.org/wp-content/uploads/2018/01/1.jpg" alt="etrade logo"></a>' +
    '<a href="https://www.tdameritrade.com/home.page" target="_blank"><img src="https://libn.com/files/2017/09/TD-Ameritrade.jpg" alt="td logo"></a>' +
    '<a href="https://www.fidelity.com/" target="_blank"><img src="https://media.glassdoor.com/sqll/2786/fidelity-investments-squarelogo-1498762947951.png" alt="fidelity logo"></a></div>' +
    '<div><button id="newSearchBtn">New Search</button></div>' );
}



$( handleStartPage )




/*********************************
*POSSIBLE ADDITIONAL FUNCTIONALITY
**********************************/


/***********************************************************************************************
*If adding additional functionality, add the following buttons to the bottom of the string that
is returned in createHtmlStrings():

<div><button id="deleteBtn">Delete</button></div>


************************************************************************************************/

// ********FUNCTION STUBS*********


/*
function deleteCompany()
{
   // Listens for click on "Delete Company Button"
   // Use event delegation to remove selected company from the display page
}



makeReccomendation()
{
   // Creates ranking criteria for displayed companies using "secret algorithm"
   // Selects recommended company
   // Makes user aware of recommended company
   // Prompt user to buy
   // If user selects 'yes', call makePurchase()
   // else (if user selects 'no') prompt user to search again
}



function makePurchase()
{
   // Ask user for available funds
   // Get current price of stock
   // Show user how many shares they can afford to purchase
   // Call displayBrokers()
}
*/