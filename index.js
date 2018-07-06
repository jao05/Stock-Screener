function handleStartPage()
{
	// Listens to submit button
   $( '#searchForm' ).on( 'submit', function( event )
		{
			event.preventDefault(); // prevent default form submission behavior
			
      // store the term that the user enters into input search box
      let searchItem = $( event.currentTarget ).find( '#searchInput' ).val();	

			/*******************************
      *NEED TO VALIDATE INPUT SOMEHOW
      *******************************/
      // Calls makeRequest to interact with server
      makeRequest( searchItem );
		} );

   // Listens to "Purchase" button
   $( '.displayPage' ).on( 'click', '#purchaseBtn', function( event )
   {
      // call brokers function
      displayBrokers();
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
  $.getJSON( `https://api.iextrading.com/1.0/stock/${ searchItem }/book`, displayResultsPage );
}


function displayResultsPage( data )
{
	// Hide startPage
   $( '.startPage' ).remove();

   // Calls renderResults(), passing response as parameter
   renderResults( data );   

   // Makes response visible by displaying the results page
   $( '.displayPage' ).show();
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
           <div><button id="purchaseBtn">Purchase</button></div>
           <div><button id="newSearchBtn">New Search</button></div>`;
}




function displayBrokers()
{
  // Output: "Visit one of these sites to place your order"
  // Provide linked photos of at least 3 brokers
  $( '.displayPage' ).html( '<p><h3>Visit one of these sites to place your order.</h3></p>' +
    '<div class="brokerLogos"><a href="https://us.etrade.com/home"><img src="http://pennystockreview.org/wp-content/uploads/2018/01/1.jpg" alt="etrade logo"></a>' +
    '<a href="https://www.tdameritrade.com/home.page"><img src="https://libn.com/files/2017/09/TD-Ameritrade.jpg" alt="td logo"></a>' +
    '<a href="https://www.fidelity.com/"><img src="https://media.glassdoor.com/sqll/2786/fidelity-investments-squarelogo-1498762947951.png" alt="fidelity logo"></a></div>' );
}



$( handleStartPage )




/*********************************
*POSSIBLE ADDITIONAL FUNCTIONALITY
**********************************/


/***********************************************************************************************
*If adding additional functionality, add the following buttons to the bottom of the string that
is returned in createHtmlStrings():

<div><button id="deleteBtn">Delete</button></div>
<div><button id="addCompBtn">Add Comps</button></div>

************************************************************************************************/

// ********FUNCTION STUBS*********


/*
function deleteCompany()
{
   // Listens for click on "Delete Company Button"
   // Use event delegation to remove selected company from the display page
}


function addComparableComps() //  identifier of parameter????...event delegation?
{
   // Listens for click on "Add Comparable Button"
   $( '#addCompBtn' ).on( click, function ( event )
   {
      let originalComp = ""; // *******HWO DO I GET WHAT I WANT HERE??*********

      // Calls makeComparablesRequest() to get comparables of orginal search company
      makeComparablesRequest( originalComp );
   });

   // Removes "Add Comps" button as its pressed
   $( '#addCompBtn' ).remove();   
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
   // I only want to handle two comparable companies...
   for( let comp = 0; comp < data.length; comp++ )
   {
      createHtmlStringToAppendToDisplayPage( comp );
   }   
}


function createHtmlStringToAppendToDisplayPage( comparable )
{
   makeRequest( comparable );
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