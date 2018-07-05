function handleStartPage()
{
	// Listens to submit button
   $( '#searchForm' ).on( 'submit', function( event )
		{
			event.preventDefault();
			let searchItem = $( event.currentTarget ).find( '#searchInput' ).val();			

			// Makes a request to the endpoint for data about the search company 
         // Calls displayResults() as callBack function
         $.getJSON( `https://api.iextrading.com/1.0/stock/${ searchItem }/book`, displayResultsPage );
		} );
}

function displayResultsPage( data )
{
	// Hide startPage
   $( '.startPage' ).remove();

   // Calls renderResults(), passing response as parameter
   renderResults( data );

   console.log(data);
   console.log(data.quote.companyName);
   console.log(data.quote.delayedPrice);

   // Makes response visible by displaying the results page
   $( '.displayPage' ).show();
}




// FUNCTION STUBS

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
           <p>${ htmlStringDataSource.quote.delayedPrice }</p>
           <div><button>Delete</button></div>
           <div><button>Add Comps</button></div>`;
   

   // ***IS THIS THE PLACE FOR THE "DELETE" and "ADD COMPARABLE" BUTTONS*****
}


/*
deleteCompany()
{
   // Listens for click on "Delete Company Button"
   // Removes selected company from the display page
}


addComparableComps()
{
   // Listens for click on "Add Comparable Button"
   // Calls getComparables
   // Calls makeRequest(), passing in comparable companies as parameters
}


getComparables()
{
   // Returns a list of two (2) or three (3) comparable companies
   // Makes a request for comparable companies
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

makePurchase()
{
   // Ask user for available funds
   // Get current price of stock
   // Show user how many shares they can afford to purchase
   // Call displayBrokers
}

displayBrokers()
{
  // Output: "Visit one of these sites to place your order"
  // Provide linked photos of at least 3 brokers
}
*/

$( handleStartPage )